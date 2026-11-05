// Package server 实现 Cerebro 的 HTTP 接口，路径、请求和返回与 Scala 版 conf/routes 保持一致。
package server

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"html/template"
	"io"
	"io/fs"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/klauspost/compress/gzhttp"

	"github.com/RitterHou/cerebro/internal/auth"
	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/models"
	"github.com/RitterHou/cerebro/internal/store"
)

type host struct {
	url              string
	auth             *es.Auth
	tls              es.TLSConfig
	headersWhitelist []string
	readOnly         bool
}

// Server 持有所有依赖。
type Server struct {
	cfg        *config.Config
	api        es.API
	hosts      map[string]host
	hostsByURL map[string]host
	hostNames  []string
	defaultTLS es.TLSConfig
	history    store.History
	sessions   *auth.Sessions
	authn      auth.Authenticator
	assets     *assets
	spaIndex   []byte // 前端自带 index.html 时（Vue 版）的内容，nil 表示旧版
	limiter    *loginLimiter
	version    string
	log        *slog.Logger
}

// Options 是创建 Server 需要的外部依赖。
type Options struct {
	Config     *config.Config
	Client     *es.Client
	History    store.History
	SessionKey []byte
	Authn      auth.Authenticator // nil 表示不需要登录
	Public     fs.FS              // 前端静态资源根目录
	Version    string
	Logger     *slog.Logger
	ReloadUI   bool // 前端来自目录（开发、截图比对），文件变化时不需要重启
}

// New 创建 Server。
func New(o Options) (*Server, error) {
	s := &Server{
		cfg:        o.Config,
		api:        es.API{Client: o.Client},
		hosts:      map[string]host{},
		hostsByURL: map[string]host{},
		defaultTLS: toTLS(o.Config.ES.TLS),
		history:    o.History,
		sessions:   auth.NewSessions(o.SessionKey, o.Config.Session.MaxAge.Duration, o.Config.BasePath, o.Config.Session.Secure),
		authn:      o.Authn,
		version:    o.Version,
		log:        o.Logger,
		limiter:    newLoginLimiter(o.Config.TrustedProxies),
	}
	if s.history == nil {
		s.history = store.Noop{}
	}
	if s.log == nil {
		s.log = slog.Default()
	}
	for _, h := range o.Config.Hosts {
		hc := host{url: h.Host, headersWhitelist: h.HeadersWhitelist, readOnly: h.ReadOnly, tls: s.defaultTLS}
		if h.TLS != nil {
			hc.tls = mergeTLS(s.defaultTLS, *h.TLS)
		}
		if a := h.Auth; a != nil {
			hc.auth = &es.Auth{Username: a.Username, Password: a.Password, APIKey: a.APIKey, Bearer: a.Bearer}
		}
		s.hosts[h.Name] = hc
		// 同一地址配了多个名字时，只要有一个只读就按只读
		key := normalizeURL(h.Host)
		if prev, dup := s.hostsByURL[key]; !dup || !prev.readOnly {
			s.hostsByURL[key] = hc
		}
		s.hostNames = append(s.hostNames, h.Name)
	}
	// TLS 证书路径写错要在启动时发现，而不是等到第一次请求
	if o.Client != nil {
		if err := o.Client.CheckTLS(s.defaultTLS); err != nil {
			return nil, fmt.Errorf("es.tls: %w", err)
		}
		for _, name := range s.hostNames {
			if err := o.Client.CheckTLS(s.hosts[name].tls); err != nil {
				return nil, fmt.Errorf("hosts[%s].tls: %w", name, err)
			}
		}
	}
	a, err := newAssets(o.Public, o.Version)
	if err != nil {
		return nil, err
	}
	s.assets = a
	a.reload = o.ReloadUI
	s.spaIndex = s.readSPAIndex()
	return s, nil
}

// readSPAIndex 读取前端自带的 index.html（Vue 版），没有则返回 nil（旧版用内置模板）。
func (s *Server) readSPAIndex() []byte {
	if s.assets.fsys == nil {
		return nil
	}
	data, err := fs.ReadFile(s.assets.fsys, "index.html")
	if err != nil {
		return nil
	}
	return bytes.ReplaceAll(data, []byte("__CEREBRO_VERSION__"), []byte(template.HTMLEscapeString(s.version)))
}

// currentSPAIndex 在前端来自目录时每次重新读取，方便重新构建后直接刷新页面。
func (s *Server) currentSPAIndex() []byte {
	if s.assets.reload {
		return s.readSPAIndex()
	}
	return s.spaIndex
}

func toTLS(c config.TLSConfig) es.TLSConfig {
	return es.TLSConfig{CAFile: c.CA, CertFile: c.Cert, KeyFile: c.Key, InsecureSkipVerify: c.Insecure(), ServerName: c.ServerName}
}

// mergeTLS 让集群级 TLS 设置只覆盖它写了的项，其余沿用 es.tls。
func mergeTLS(base es.TLSConfig, over config.TLSConfig) es.TLSConfig {
	out := base
	if over.CA != "" {
		out.CAFile = over.CA
	}
	if over.Cert != "" || over.Key != "" {
		out.CertFile, out.KeyFile = over.Cert, over.Key
	}
	if over.ServerName != "" {
		out.ServerName = over.ServerName
	}
	if over.InsecureSkipVerify != nil {
		out.InsecureSkipVerify = *over.InsecureSkipVerify
	}
	return out
}

func (s *Server) authEnabled() bool { return s.authn != nil }

// handlerFunc 是业务处理函数，返回 Cerebro 状态码和 body。
type handlerFunc func(ctx context.Context, r *cerebroRequest) (int, any, error)

type routeKind int

const (
	readRoute routeKind = iota
	writeRoute
)

// process 对应 BaseController.process：登录检查、解析 body、只读拦截、错误包装。
func (s *Server) process(kind routeKind, fn handlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user, ok := s.currentUser(r)
		if !ok {
			cerebroResponse(w, http.StatusSeeOther, nil)
			return
		}
		body, err := parseBody(w, r)
		if err != nil {
			writeJSON(w, http.StatusBadRequest, errorBody(err.Error()))
			return
		}
		target, hostName, readOnly, err := s.resolveTarget(body, r)
		if err != nil {
			status, out := s.errorResponse(r, err)
			cerebroResponse(w, status, out)
			return
		}
		req := &cerebroRequest{body: body, target: target, user: user, readOnly: readOnly, hostName: hostName}
		if kind == writeRoute && readOnly {
			cerebroResponse(w, http.StatusForbidden, errorBody(readOnlyMessage))
			return
		}
		status, out, err := fn(r.Context(), req)
		if err != nil {
			status, out = s.errorResponse(r, err)
		}
		cerebroResponse(w, status, out)
	}
}

const readOnlyMessage = "Cerebro is running in read-only mode, modifications are not allowed"

func (s *Server) errorResponse(r *http.Request, err error) (int, any) {
	var mp missingParamError
	var rf requestFailedError
	var fe *models.FormatError
	switch {
	case errors.As(err, &mp):
		return http.StatusBadRequest, errorBody(err.Error())
	case errors.Is(err, errUnknownHost):
		return http.StatusForbidden, errorBody(err.Error())
	case errors.Is(err, es.ErrInvalidPath), errors.Is(err, es.ErrInvalidURL):
		return http.StatusBadRequest, errorBody(err.Error())
	case errors.As(err, &rf):
		return rf.status, errorBody(err.Error())
	case errors.As(err, &fe):
		s.log.Error("unexpected response format from elasticsearch", "path", r.URL.Path, "err", err)
		return http.StatusInternalServerError, errorBody(err.Error())
	default:
		s.log.Error("error processing request", "path", r.URL.Path, "err", err)
		return http.StatusInternalServerError, errorBody(err.Error())
	}
}

// currentUser 返回登录用户；未开启登录时返回 ("", true)。
func (s *Server) currentUser(r *http.Request) (string, bool) {
	if !s.authEnabled() {
		return "", true
	}
	if p, ok := s.authn.(*auth.Proxy); ok { // 代理模式：每个请求都从可信代理的请求头取用户
		return p.UserFromRequest(r)
	}
	sess := s.sessions.Get(r)
	if sess.User == "" {
		return "", false
	}
	// 配置里删掉的用户，已有会话立即失效
	if c, ok := s.authn.(interface{ UserExists(string) bool }); ok && !c.UserExists(sess.User) {
		return "", false
	}
	return sess.User, true
}

// Handler 返回完整的 HTTP 处理器（含 basePath、gzip、安全头）。
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()
	s.routes(mux)
	var h http.Handler = mux
	h = gzhttp.GzipHandler(h)
	h = s.withBasePath(h)
	h = securityHeaders(h)
	h = s.logRequests(h)
	return h
}

func (s *Server) withBasePath(next http.Handler) http.Handler {
	base := s.cfg.BasePath
	if base == "/" {
		return next
	}
	prefix := strings.TrimSuffix(base, "/")
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch {
		case r.URL.Path == prefix:
			http.Redirect(w, r, base, http.StatusMovedPermanently)
		case strings.HasPrefix(r.URL.Path, base):
			http.StripPrefix(prefix, next).ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h := w.Header()
		h.Set("X-Content-Type-Options", "nosniff")
		h.Set("X-Frame-Options", "SAMEORIGIN")
		h.Set("Referrer-Policy", "same-origin")
		next.ServeHTTP(w, r)
	})
}

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.status = code
	r.ResponseWriter.WriteHeader(code)
}

func (r *statusRecorder) Unwrap() http.ResponseWriter { return r.ResponseWriter }

// logRequests 只在 debug 级别记录请求，不记录 body（里面可能有凭据）。
func (s *Server) logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !s.log.Enabled(r.Context(), slog.LevelDebug) {
			next.ServeHTTP(w, r)
			return
		}
		start := time.Now()
		rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
		next.ServeHTTP(rec, r)
		s.log.Debug("http request", "method", r.Method, "path", r.URL.Path, "status", rec.status, "duration", time.Since(start))
	})
}

func readAll(r io.Reader) ([]byte, error) { return io.ReadAll(r) }

// esResult 把单个 ES 响应转成 (状态, body)：成功时用 transform 加工，失败时原样返回错误体。
func esResult(resp *es.Response, err error, transform func(any) (any, error)) (int, any, error) {
	if err != nil {
		return 0, nil, err
	}
	if !resp.OK() || transform == nil {
		return resp.Status, resp.Body(), nil
	}
	v, err := resp.JSON()
	if err != nil {
		return 0, nil, err
	}
	out, err := transform(v)
	if err != nil {
		return 0, nil, err
	}
	return resp.Status, out, nil
}

// passthrough 原样返回 ES 的状态和 body。
func passthrough(resp *es.Response, err error) (int, any, error) {
	return esResult(resp, err, nil)
}

type esCall func(ctx context.Context) (*es.Response, error)

// parallel 并发执行多个 ES 请求，返回全部响应；有网络错误时返回第一个错误。
func parallel(ctx context.Context, calls ...esCall) ([]*es.Response, error) {
	resps := make([]*es.Response, len(calls))
	errs := make([]error, len(calls))
	done := make(chan struct{}, len(calls))
	for i, c := range calls {
		go func() {
			resps[i], errs[i] = c(ctx)
			done <- struct{}{}
		}()
	}
	for range calls {
		<-done
	}
	return resps, errors.Join(errs...)
}

// parsedAll 解析全部响应；第一个失败的响应按 RequestFailedException 处理。
func parsedAll(resps []*es.Response, names []string) ([]any, error) {
	out := make([]any, len(resps))
	for i, r := range resps {
		if !r.OK() {
			return nil, requestFailedError{url: names[i], status: r.Status}
		}
		v, err := r.JSON()
		if err != nil {
			return nil, err
		}
		out[i] = v
	}
	return out, nil
}
