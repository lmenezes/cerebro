package server

import (
	"errors"
	"net/http"
	"strings"

	"golang.org/x/oauth2"

	"github.com/RitterHou/cerebro/internal/auth"
)

func (s *Server) proxyAuth() *auth.Proxy {
	p, _ := s.authn.(*auth.Proxy)
	return p
}

func (s *Server) oidcAuth() *auth.OIDC {
	o, _ := s.authn.(*auth.OIDC)
	return o
}

func proxyUnauthorized(w http.ResponseWriter) {
	http.Error(w, "authentication required: this cerebro instance expects the user from a trusted reverse proxy", http.StatusUnauthorized)
}

// callbackURL 按请求推导 OIDC 回调地址；IdP 只接受登记过的地址，所以请求头被伪造也没有用。
func (s *Server) callbackURL(r *http.Request) string {
	scheme := "http"
	if r.TLS != nil || strings.EqualFold(r.Header.Get("X-Forwarded-Proto"), "https") {
		scheme = "https"
	}
	return scheme + "://" + r.Host + s.cfg.BasePath + "auth/oidc/callback"
}

// oidcStart 生成 state 和 nonce 存进会话，跳转到 IdP。
func (s *Server) oidcStart(w http.ResponseWriter, r *http.Request) {
	o := s.oidcAuth()
	if o == nil {
		http.NotFound(w, r)
		return
	}
	sess := s.sessions.Get(r)
	sess.User, sess.Flash = "", ""
	sess.State, sess.Nonce, sess.Verifier = auth.RandomToken(), auth.RandomToken(), oauth2.GenerateVerifier()
	target, err := o.AuthCodeURL(r.Context(), s.callbackURL(r), sess.State, sess.Nonce, sess.Verifier)
	if err != nil {
		s.log.Error("oidc", "err", err)
		http.Error(w, "single sign-on is not available right now", http.StatusBadGateway)
		return
	}
	s.sessions.Save(w, r, sess)
	http.Redirect(w, r, target, http.StatusSeeOther) //nolint:gosec // 跳转到配置的 IdP 授权地址
}

// oidcCallback 校验 state，用授权码换取用户，写入会话。
func (s *Server) oidcCallback(w http.ResponseWriter, r *http.Request) {
	o := s.oidcAuth()
	if o == nil {
		http.NotFound(w, r)
		return
	}
	sess := s.sessions.Get(r)
	q := r.URL.Query()
	fail := func(msg string) {
		sess.State, sess.Nonce, sess.Verifier, sess.User = "", "", "", ""
		sess.Flash = msg
		s.sessions.Save(w, r, sess)
		http.Redirect(w, r, s.cfg.BasePath+"login", http.StatusSeeOther)
	}
	if e := q.Get("error"); e != "" {
		s.log.Info("oidc login rejected by provider", "error", e)
		fail("Single sign-on failed")
		return
	}
	if sess.State == "" || q.Get("state") != sess.State {
		fail("Single sign-on failed: invalid state, please try again")
		return
	}
	user, err := o.Exchange(r.Context(), s.callbackURL(r), q.Get("code"), sess.Nonce, sess.Verifier)
	if err != nil {
		s.log.Info("oidc login failed", "err", err)
		if errors.Is(err, auth.ErrNotAllowed) {
			fail("You are not allowed to use cerebro")
		} else {
			fail("Single sign-on failed")
		}
		return
	}
	target := s.redirectTarget(sess)
	s.sessions.Save(w, r, auth.Session{User: user})
	http.Redirect(w, r, target, http.StatusSeeOther) //nolint:gosec // redirectTarget 只放行站内路径
}
