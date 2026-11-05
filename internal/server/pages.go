package server

import (
	"bytes"
	"crypto/sha256"
	"embed"
	"encoding/hex"
	"html/template"
	"io/fs"
	"net/http"
	"path"
	"strings"
	"time"

	"github.com/RitterHou/cerebro/internal/auth"
)

//go:embed templates/*.html
var templateFS embed.FS

var pageTemplates = template.Must(template.ParseFS(templateFS, "templates/*.html"))

const (
	loginFailedMessage     = "Incorrect username or password"
	tooManyAttemptsMessage = "Too many failed login attempts, try again later"
)

// index 对应 Application.index：开启登录且未登录时跳到登录页，并记住原地址。
func (s *Server) index(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.currentUser(r); !ok {
		redirect := s.cfg.BasePath
		if r.URL.RawQuery != "" {
			redirect += "?" + r.URL.RawQuery
		}
		s.sessions.Save(w, r, auth.Session{Redirect: redirect})
		http.Redirect(w, r, s.cfg.BasePath+"login", http.StatusSeeOther)
		return
	}
	if s.spaIndex != nil { // Vue 前端：自带 index.html，只替换版本号
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.Header().Set("Cache-Control", "no-store")
		_, _ = w.Write(s.spaIndex)
		return
	}
	s.renderPage(w, "index.html", map[string]string{"Version": s.version})
}

// loginPage 对应 AuthController.index。
func (s *Server) loginPage(w http.ResponseWriter, r *http.Request) {
	if !s.authEnabled() {
		http.Redirect(w, r, s.cfg.BasePath, http.StatusSeeOther)
		return
	}
	sess := s.sessions.Get(r)
	if sess.User != "" {
		http.Redirect(w, r, s.redirectTarget(sess), http.StatusSeeOther) //nolint:gosec // redirectTarget 只放行站内路径
		return
	}
	if sess.Flash != "" { // flash 只显示一次
		flash := sess.Flash
		sess.Flash = ""
		s.sessions.Save(w, r, sess)
		sess.Flash = flash
	}
	s.renderPage(w, "login.html", map[string]any{"Version": s.version, "Flash": sess.Flash, "LegacyScripts": s.spaIndex == nil})
}

// redirectTarget 只接受站内路径，防止开放重定向。
func (s *Server) redirectTarget(sess auth.Session) string {
	if sess.Redirect != "" && strings.HasPrefix(sess.Redirect, s.cfg.BasePath) && !strings.HasPrefix(sess.Redirect, "//") {
		return sess.Redirect
	}
	return s.cfg.BasePath
}

// login 对应 AuthController.login：表单字段 user、password。
func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	if !s.authEnabled() {
		http.Redirect(w, r, s.cfg.BasePath, http.StatusSeeOther)
		return
	}
	r.Body = http.MaxBytesReader(w, r.Body, 1<<16)
	if err := r.ParseForm(); err != nil {
		http.Error(w, "invalid login form data", http.StatusBadRequest)
		return
	}
	user, password := r.PostForm.Get("user"), r.PostForm.Get("password")
	if user == "" || password == "" {
		s.log.Error("invalid login form data")
		http.Error(w, "invalid login form data", http.StatusBadRequest)
		return
	}
	sess := s.sessions.Get(r)
	if s.limiter.blocked(r, user) {
		s.log.Warn("too many failed logins", "user", user, "remote", r.RemoteAddr)
		sess.Flash = tooManyAttemptsMessage
		s.sessions.Save(w, r, sess)
		http.Redirect(w, r, s.cfg.BasePath+"login", http.StatusSeeOther)
		return
	}
	s.limiter.sem <- struct{}{}
	username, ok := s.authn.Authenticate(r.Context(), user, password)
	<-s.limiter.sem
	if !ok {
		s.limiter.fail(r, user)
		s.log.Info("login failed", "user", user, "remote", r.RemoteAddr)
		sess.Flash = loginFailedMessage
		s.sessions.Save(w, r, sess)
		http.Redirect(w, r, s.cfg.BasePath+"login", http.StatusSeeOther)
		return
	}
	s.limiter.succeed(user)
	target := s.redirectTarget(sess)
	s.sessions.Save(w, r, auth.Session{User: username})
	http.Redirect(w, r, target, http.StatusSeeOther) //nolint:gosec // redirectTarget 只放行站内路径
}

// logout 对应 AuthController.logout。
func (s *Server) logout(w http.ResponseWriter, r *http.Request) {
	s.sessions.Save(w, r, auth.Session{})
	http.Redirect(w, r, s.cfg.BasePath+"login", http.StatusSeeOther)
}

func (s *Server) healthz(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok", "version": s.version})
}

func (s *Server) renderPage(w http.ResponseWriter, name string, data any) {
	var buf bytes.Buffer
	if err := pageTemplates.ExecuteTemplate(&buf, name, data); err != nil {
		s.log.Error("render page", "page", name, "err", err)
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	_, _ = w.Write(buf.Bytes())
}

// assets 提供嵌入的静态文件，带内容哈希 ETag，浏览器每次都会校验。
type assets struct {
	fsys  fs.FS
	etags map[string]string
}

func newAssets(fsys fs.FS, version string) (*assets, error) {
	a := &assets{fsys: fsys, etags: map[string]string{}}
	if fsys == nil {
		return a, nil
	}
	err := fs.WalkDir(fsys, ".", func(p string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		data, err := fs.ReadFile(fsys, p)
		if err != nil {
			return err
		}
		sum := sha256.Sum256(append(data, version...))
		a.etags[p] = `"` + hex.EncodeToString(sum[:8]) + `"`
		return nil
	})
	return a, err
}

func (a *assets) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	name := strings.TrimPrefix(path.Clean("/"+r.URL.Path), "/")
	etag, ok := a.etags[name]
	if !ok {
		http.NotFound(w, r)
		return
	}
	f, err := a.fsys.Open(name)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	defer f.Close()
	rs, ok := f.(interface {
		Read([]byte) (int, error)
		Seek(int64, int) (int64, error)
	})
	if !ok {
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("ETag", etag)
	w.Header().Set("Cache-Control", "no-cache")
	http.ServeContent(w, r, name, time.Time{}, rs)
}
