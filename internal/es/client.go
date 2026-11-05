// Package es 是访问 Elasticsearch 的最小 HTTP 客户端，只用标准库。
package es

import (
	"bytes"
	"context"
	"crypto/tls"
	"crypto/x509"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

const (
	ContentTypeJSON   = "application/json"
	ContentTypeNDJSON = "application/x-ndjson"
	maxResponseBytes  = 512 << 20
)

// Auth 是连接 ES 用的凭据，同一时间只用其中一种。
type Auth struct {
	Username string
	Password string
	APIKey   string // base64(id:key)，或 id:key
	Bearer   string
}

// Empty 判断是否没有任何凭据。
func (a *Auth) Empty() bool {
	return a == nil || (a.Username == "" && a.Password == "" && a.APIKey == "" && a.Bearer == "")
}

// Header 返回 Authorization 头的值。
func (a *Auth) Header() string {
	switch {
	case a.Empty():
		return ""
	case a.Bearer != "":
		return "Bearer " + a.Bearer
	case a.APIKey != "":
		return "ApiKey " + encodeAPIKey(a.APIKey)
	default:
		return "Basic " + base64.StdEncoding.EncodeToString([]byte(a.Username+":"+a.Password))
	}
}

func encodeAPIKey(k string) string {
	if strings.Contains(k, ":") { // 未编码的 id:api_key
		return base64.StdEncoding.EncodeToString([]byte(k))
	}
	return k
}

// FromRequest 由页面传来的用户名密码构造凭据：用户名留空、密码非空按 API Key 处理，
// 密码以 "Bearer " 或 "ApiKey " 开头时按对应方式处理。
func FromRequest(username, password *string) *Auth {
	user := ""
	if username != nil {
		user = *username
	}
	switch {
	case password == nil:
		return nil
	case user != "":
		return &Auth{Username: user, Password: *password}
	case strings.TrimSpace(*password) == "":
		return nil
	}
	p := strings.TrimSpace(*password)
	if after, ok := cutPrefixFold(p, "Bearer "); ok {
		return &Auth{Bearer: strings.TrimSpace(after)}
	}
	if after, ok := cutPrefixFold(p, "ApiKey "); ok {
		return &Auth{APIKey: strings.TrimSpace(after)}
	}
	return &Auth{APIKey: p}
}

func cutPrefixFold(s, prefix string) (string, bool) {
	if len(s) >= len(prefix) && strings.EqualFold(s[:len(prefix)], prefix) {
		return s[len(prefix):], true
	}
	return s, false
}

// TLSConfig 描述连接 ES 的 TLS 设置。
type TLSConfig struct {
	CAFile             string
	CertFile           string
	KeyFile            string
	InsecureSkipVerify bool
	ServerName         string
}

func (c TLSConfig) key() string {
	return fmt.Sprintf("%s|%s|%s|%t|%s", c.CAFile, c.CertFile, c.KeyFile, c.InsecureSkipVerify, c.ServerName)
}

func (c TLSConfig) build() (*tls.Config, error) {
	cfg := &tls.Config{MinVersion: tls.VersionTLS12, InsecureSkipVerify: c.InsecureSkipVerify, ServerName: c.ServerName} //nolint:gosec // 只有显式配置才跳过校验
	if c.CAFile != "" {
		pem, err := os.ReadFile(c.CAFile)
		if err != nil {
			return nil, fmt.Errorf("read CA file: %w", err)
		}
		pool, err := x509.SystemCertPool()
		if err != nil || pool == nil {
			pool = x509.NewCertPool()
		}
		if !pool.AppendCertsFromPEM(pem) {
			return nil, fmt.Errorf("no certificates found in %s", c.CAFile)
		}
		cfg.RootCAs = pool
	}
	if c.CertFile != "" || c.KeyFile != "" {
		cert, err := tls.LoadX509KeyPair(c.CertFile, c.KeyFile)
		if err != nil {
			return nil, fmt.Errorf("load client certificate: %w", err)
		}
		cfg.Certificates = []tls.Certificate{cert}
	}
	return cfg, nil
}

// Target 是一次请求的目标集群。
type Target struct {
	URL     string // 可以带路径前缀，如 https://host/es
	Auth    *Auth
	Headers http.Header // 白名单里透传的请求头
	TLS     TLSConfig
}

// Response 是 ES 的响应。
type Response struct {
	Status   int
	Raw      []byte
	parsed   any
	parseErr error
	once     sync.Once
}

// OK 判断是否 2xx。
func (r *Response) OK() bool { return r.Status >= 200 && r.Status < 300 }

// JSON 返回保序解析结果；解析失败返回错误。
func (r *Response) JSON() (any, error) {
	r.once.Do(func() { r.parsed, r.parseErr = jsonx.Parse(r.Raw) })
	return r.parsed, r.parseErr
}

// Body 返回给前端的 body：合法 JSON 原样透传；失败响应不是 JSON 时包成 {"error": 原文}。
func (r *Response) Body() any {
	trimmed := bytes.TrimSpace(r.Raw)
	if len(trimmed) == 0 {
		if r.OK() {
			return nil
		}
		return jsonx.Obj("error", "")
	}
	if json.Valid(trimmed) {
		return json.RawMessage(trimmed)
	}
	if r.OK() {
		return string(r.Raw)
	}
	return jsonx.Obj("error", string(r.Raw))
}

// ErrorBody 用于数据加工失败时返回原始错误体，语义同 Body。
func (r *Response) ErrorBody() any {
	if v, err := r.JSON(); err == nil {
		return v
	}
	return r.Body()
}

// Client 负责发请求，按 TLS 配置复用连接。
type Client struct {
	Timeout   time.Duration
	UserAgent string

	mu         sync.Mutex
	transports map[string]*http.Transport
}

// NewClient 创建客户端。
func NewClient(timeout time.Duration, userAgent string) *Client {
	return &Client{Timeout: timeout, UserAgent: userAgent, transports: map[string]*http.Transport{}}
}

func (c *Client) transport(cfg TLSConfig) (*http.Transport, error) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if t, ok := c.transports[cfg.key()]; ok {
		return t, nil
	}
	tlsCfg, err := cfg.build()
	if err != nil {
		return nil, err
	}
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.TLSClientConfig = tlsCfg
	t.MaxIdleConnsPerHost = 16
	c.transports[cfg.key()] = t
	return t, nil
}

// CheckTLS 预先加载 TLS 配置（CA、客户端证书），配置有误时返回错误。
func (c *Client) CheckTLS(cfg TLSConfig) error {
	_, err := c.transport(cfg)
	return err
}

// ErrInvalidURL 表示集群地址不合法；报错里不带地址本身，免得泄漏地址里的凭据。
var ErrInvalidURL = errors.New("invalid cluster address, it must start with http:// or https://")

// ErrInvalidPath 表示请求路径不合法，例如含有 . 或 .. 段（会被反向代理规范化，逃出集群的路径前缀）。
var ErrInvalidPath = errors.New("invalid request path")

// checkPath 拒绝 . 和 .. 段以及反斜杠，保证请求不会逃出集群地址的路径前缀。
func checkPath(uri string) error {
	p := uri
	if i := strings.IndexAny(p, "?#"); i >= 0 {
		p = p[:i]
	}
	decoded, err := url.PathUnescape(p)
	if err != nil {
		return fmt.Errorf("%w: %w", ErrInvalidPath, err)
	}
	if strings.Contains(decoded, "\\") {
		return fmt.Errorf("%w: backslash is not allowed", ErrInvalidPath)
	}
	for _, seg := range strings.Split(decoded, "/") {
		if seg == "." || seg == ".." {
			return fmt.Errorf("%w: '.' and '..' segments are not allowed", ErrInvalidPath)
		}
	}
	return nil
}

// Do 发请求。uri 以 / 开头（或为空），直接拼在去掉末尾斜杠的集群地址后面。
func (c *Client) Do(ctx context.Context, t *Target, method, uri string, body []byte, contentType string) (*Response, error) {
	base := strings.TrimRight(t.URL, "/")
	if u, err := url.Parse(base); err != nil || (u.Scheme != "http" && u.Scheme != "https") || u.Host == "" {
		return nil, ErrInvalidURL
	}
	if err := checkPath(uri); err != nil {
		return nil, err
	}
	var reader io.Reader
	if body != nil {
		reader = bytes.NewReader(body)
	}
	if c.Timeout > 0 {
		var cancel context.CancelFunc
		ctx, cancel = context.WithTimeout(ctx, c.Timeout)
		defer cancel()
	}
	req, err := http.NewRequestWithContext(ctx, method, base+uri, reader)
	if err != nil {
		var ue *url.Error
		if errors.As(err, &ue) { // url.Error 里带完整地址，只保留原因
			return nil, fmt.Errorf("%w: %w", ErrInvalidPath, ue.Err)
		}
		return nil, err
	}
	for k, vs := range t.Headers {
		for _, v := range vs {
			req.Header.Add(k, v)
		}
	}
	if body != nil && contentType != "" {
		req.Header.Set("Content-Type", contentType)
	}
	req.Header.Set("Accept", "application/json")
	if c.UserAgent != "" {
		req.Header.Set("User-Agent", c.UserAgent)
	}
	if h := t.Auth.Header(); h != "" {
		req.Header.Set("Authorization", h)
	}
	tr, err := c.transport(t.TLS)
	if err != nil {
		return nil, err
	}
	// ES 不会重定向；不跟随，免得把凭据和透传的请求头带到别的地址
	client := &http.Client{Transport: tr, CheckRedirect: func(*http.Request, []*http.Request) error { return http.ErrUseLastResponse }}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	raw, err := io.ReadAll(io.LimitReader(resp.Body, maxResponseBytes))
	if err != nil {
		return nil, err
	}
	return &Response{Status: resp.StatusCode, Raw: raw}, nil
}

// Close 释放空闲连接。
func (c *Client) Close() {
	c.mu.Lock()
	defer c.mu.Unlock()
	for _, t := range c.transports {
		t.CloseIdleConnections()
	}
}
