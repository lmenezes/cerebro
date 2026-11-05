package server

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/go-jose/go-jose/v4"
	"github.com/go-jose/go-jose/v4/jwt"

	"github.com/RitterHou/cerebro/internal/auth"
	"github.com/RitterHou/cerebro/internal/config"
)

// xIdP 是测试用的最小 OpenID Provider：发现文档、JWKS、token 接口。
type xIdP struct {
	srv       *httptest.Server
	key       *rsa.PrivateKey
	mu        sync.Mutex
	claims    map[string]map[string]any // code -> id_token claims
	challenge string                    // 最近一次授权请求的 PKCE code_challenge
}

func newIdP(t *testing.T) *xIdP {
	key, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		t.Fatal(err)
	}
	p := &xIdP{key: key, claims: map[string]map[string]any{}}
	mux := http.NewServeMux()
	mux.HandleFunc("/.well-known/openid-configuration", func(w http.ResponseWriter, _ *http.Request) {
		_ = json.NewEncoder(w).Encode(map[string]any{
			"issuer": p.srv.URL, "authorization_endpoint": p.srv.URL + "/authorize", "token_endpoint": p.srv.URL + "/token",
			"jwks_uri": p.srv.URL + "/keys", "id_token_signing_alg_values_supported": []string{"RS256"},
		})
	})
	mux.HandleFunc("/keys", func(w http.ResponseWriter, _ *http.Request) {
		_ = json.NewEncoder(w).Encode(jose.JSONWebKeySet{Keys: []jose.JSONWebKey{{Key: &key.PublicKey, KeyID: "k1", Algorithm: "RS256", Use: "sig"}}})
	})
	mux.HandleFunc("/token", func(w http.ResponseWriter, r *http.Request) {
		_ = r.ParseForm()
		p.mu.Lock()
		claims, ok := p.claims[r.PostForm.Get("code")]
		challenge := p.challenge
		p.mu.Unlock()
		// PKCE：code_verifier 的 S256 必须等于授权请求里的 code_challenge
		sum := sha256.Sum256([]byte(r.PostForm.Get("code_verifier")))
		if challenge == "" || base64.RawURLEncoding.EncodeToString(sum[:]) != challenge {
			http.Error(w, `{"error":"invalid_grant","error_description":"pkce"}`, http.StatusBadRequest)
			return
		}
		if !ok {
			http.Error(w, `{"error":"invalid_grant"}`, http.StatusBadRequest)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{"access_token": "at", "token_type": "Bearer", "expires_in": 3600, "id_token": p.sign(t, claims)})
	})
	p.srv = httptest.NewServer(mux)
	t.Cleanup(p.srv.Close)
	return p
}

func (p *xIdP) sign(t *testing.T, claims map[string]any) string {
	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.RS256, Key: p.key}, (&jose.SignerOptions{}).WithHeader("kid", "k1"))
	if err != nil {
		t.Fatal(err)
	}
	base := map[string]any{"iss": p.srv.URL, "aud": "cerebro", "sub": "u1", "iat": time.Now().Unix(), "exp": time.Now().Add(time.Hour).Unix()}
	for k, v := range claims {
		base[k] = v
	}
	raw, err := jwt.Signed(signer).Claims(base).Serialize()
	if err != nil {
		t.Fatal(err)
	}
	return raw
}

func (p *xIdP) issue(code string, claims map[string]any) {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.claims[code] = claims
}

func xOIDCServer(t *testing.T, idp *xIdP, mutate func(*config.OIDCConfig)) http.Handler {
	cfg := config.OIDCConfig{Issuer: idp.srv.URL, ClientID: "cerebro", ClientSecret: "s", Scopes: []string{"openid", "email"}, UsernameClaim: "email"}
	if mutate != nil {
		mutate(&cfg)
	}
	return testServer(t, nil, xQuiet, func(o *Options) { o.Authn = auth.NewOIDC(cfg) }).Handler()
}

// xOIDCLogin 走完整个授权码流程，返回最后的响应。
func xOIDCLogin(t *testing.T, h http.Handler, idp *xIdP, claims map[string]any, tamperState bool) *httptest.ResponseRecorder {
	t.Helper()
	start := xReq(t, h, http.MethodGet, "/auth/oidc/start", "", nil)
	loc, _ := url.Parse(start.Header().Get("Location"))
	if start.Code != http.StatusSeeOther || !strings.HasPrefix(loc.String(), idp.srv.URL+"/authorize") {
		t.Fatalf("start: %d %s", start.Code, loc)
	}
	q := loc.Query()
	if q.Get("code_challenge_method") != "S256" || q.Get("code_challenge") == "" {
		t.Fatalf("PKCE missing: %v", q)
	}
	idp.mu.Lock()
	idp.challenge = q.Get("code_challenge")
	idp.mu.Unlock()
	if q.Get("redirect_uri") != "http://example.com/auth/oidc/callback" || q.Get("client_id") != "cerebro" {
		t.Fatalf("authorize params: %v", q)
	}
	if claims["nonce"] == nil {
		claims["nonce"] = q.Get("nonce")
	}
	idp.issue("code1", claims)
	state := q.Get("state")
	if tamperState {
		state = "forged"
	}
	return xReq(t, h, http.MethodGet, "/auth/oidc/callback?code=code1&state="+url.QueryEscape(state), "", nil, xSessionCookie(start))
}

func TestOIDCLogin(t *testing.T) {
	idp := newIdP(t)
	h := xOIDCServer(t, idp, nil)
	rec := xOIDCLogin(t, h, idp, map[string]any{"email": "ann@example.com", "email_verified": true}, false)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/" {
		t.Fatalf("callback: %d %s", rec.Code, rec.Header().Get("Location"))
	}
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"status":"green"}`)
	_, body := call(t, h, "/navbar", hostBody(f.url(), ""), xSessionCookie(rec))
	assertJSON(t, body, `{"status":"green","username":"ann@example.com"}`)

	// 登录页显示 SSO 按钮而不是用户名密码表单
	page := xReq(t, h, http.MethodGet, "/login", "", nil)
	if !strings.Contains(page.Body.String(), "auth/oidc/start") || strings.Contains(page.Body.String(), `name="password"`) {
		t.Fatalf("login page: %s", page.Body.String())
	}
}

func TestOIDCRejects(t *testing.T) {
	idp := newIdP(t)
	cases := []struct {
		name   string
		mutate func(*config.OIDCConfig)
		claims map[string]any
		tamper bool
		flash  string
	}{
		{"伪造 state", nil, map[string]any{"email": "a@example.com"}, true, "invalid state"},
		{"nonce 不匹配", nil, map[string]any{"email": "a@example.com", "nonce": "other"}, false, "Single sign-on failed"},
		{"邮箱未验证", nil, map[string]any{"email": "a@example.com", "email_verified": false}, false, "Single sign-on failed"},
		{"不在允许名单", func(c *config.OIDCConfig) { c.AllowedDomains = []string{"corp.com"} }, map[string]any{"email": "a@example.com", "email_verified": true}, false, "not allowed"},
		{"按域名限制时缺少 email_verified", func(c *config.OIDCConfig) { c.AllowedDomains = []string{"example.com"} }, map[string]any{"email": "a@example.com"}, false, "Single sign-on failed"},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			h := xOIDCServer(t, idp, c.mutate)
			rec := xOIDCLogin(t, h, idp, c.claims, c.tamper)
			if rec.Header().Get("Location") != "/login" {
				t.Fatalf("expected redirect to login, got %d %s", rec.Code, rec.Header().Get("Location"))
			}
			page := xReq(t, h, http.MethodGet, "/login", "", nil, xSessionCookie(rec))
			if !strings.Contains(page.Body.String(), c.flash) {
				t.Fatalf("flash %q not shown", c.flash)
			}
			if status, _ := call(t, h, "/navbar", `{"host":"http://127.0.0.1:1"}`, xSessionCookie(rec)); status != http.StatusSeeOther {
				t.Fatalf("should not be logged in: %d", status)
			}
		})
	}
}

// 允许名单：用户、域名、组任一匹配即可。
func TestOIDCAllowedGroups(t *testing.T) {
	idp := newIdP(t)
	h := xOIDCServer(t, idp, func(c *config.OIDCConfig) { c.AllowedGroups = []string{"es-admins"}; c.GroupsClaim = "groups" })
	rec := xOIDCLogin(t, h, idp, map[string]any{"email": "b@x.com", "email_verified": true, "groups": []string{"dev", "es-admins"}}, false)
	if rec.Header().Get("Location") != "/" {
		t.Fatalf("group member rejected: %s", rec.Header().Get("Location"))
	}
	// 只有一个组时有的 IdP 给的是字符串
	rec = xOIDCLogin(t, h, idp, map[string]any{"email": "c@x.com", "email_verified": true, "groups": "es-admins"}, false)
	if rec.Header().Get("Location") != "/" {
		t.Fatalf("string group rejected: %s", rec.Header().Get("Location"))
	}
}

func xProxyServer(t *testing.T, cfg config.ProxyConfig) http.Handler {
	p, err := auth.NewProxy(cfg)
	if err != nil {
		t.Fatal(err)
	}
	return testServer(t, nil, xQuiet, func(o *Options) { o.Authn = p }).Handler()
}

func xFrom(remote string, hdr map[string]string) func(*http.Request) {
	return func(r *http.Request) {
		r.RemoteAddr = remote
		for k, v := range hdr {
			r.Header.Set(k, v)
		}
	}
}

func xDo(h http.Handler, method, path, body string, fn func(*http.Request)) *httptest.ResponseRecorder {
	req := httptest.NewRequest(method, path, strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	fn(req)
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)
	return rec
}

// 只信任来自可信代理的用户头。
func TestProxyAuth(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"status":"green"}`)
	h := xProxyServer(t, config.ProxyConfig{Header: "X-Forwarded-User", TrustedProxies: []string{"192.0.2.0/24"}})
	body := hostBody(f.url(), "")

	rec := xDo(h, http.MethodPost, "/navbar", body, xFrom("192.0.2.10:5555", map[string]string{"X-Forwarded-User": "carol"}))
	if !strings.Contains(rec.Body.String(), `"username":"carol"`) {
		t.Fatalf("trusted proxy: %s", rec.Body.String())
	}
	// 不是可信代理发来的请求头一律不认
	rec = xDo(h, http.MethodPost, "/navbar", body, xFrom("203.0.113.9:5555", map[string]string{"X-Forwarded-User": "mallory"}))
	if !strings.Contains(rec.Body.String(), `"status":303`) {
		t.Fatalf("untrusted source accepted: %s", rec.Body.String())
	}
	// 缺少请求头
	rec = xDo(h, http.MethodGet, "/", "", xFrom("192.0.2.10:5555", nil))
	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("missing header: %d", rec.Code)
	}
	rec = xDo(h, http.MethodGet, "/login", "", xFrom("192.0.2.10:5555", map[string]string{"X-Forwarded-User": "carol"}))
	if rec.Code != http.StatusSeeOther {
		t.Fatalf("login page with user: %d", rec.Code)
	}
}

// 配置了 JWT 时以签名校验通过的 JWT 为准（如 Cloudflare Access）。
func TestProxyAuthJWT(t *testing.T) {
	idp := newIdP(t)
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"status":"green"}`)
	h := xProxyServer(t, config.ProxyConfig{TrustedProxies: []string{"0.0.0.0/0"}, JWT: &config.ProxyJWTConfig{
		Header: "Cf-Access-Jwt-Assertion", Issuer: idp.srv.URL, JWKSURL: idp.srv.URL + "/keys", Audience: "cerebro", Claim: "email",
	}})
	good := idp.sign(t, map[string]any{"email": "dave@example.com"})
	rec := xDo(h, http.MethodPost, "/navbar", hostBody(f.url(), ""), xFrom("198.51.100.1:1", map[string]string{"Cf-Access-Jwt-Assertion": good}))
	if !strings.Contains(rec.Body.String(), `"username":"dave@example.com"`) {
		t.Fatalf("valid jwt: %s", rec.Body.String())
	}
	bad := good[:len(good)-4] + "AAAA"
	rec = xDo(h, http.MethodPost, "/navbar", hostBody(f.url(), ""), xFrom("198.51.100.1:1", map[string]string{"Cf-Access-Jwt-Assertion": bad}))
	if !strings.Contains(rec.Body.String(), `"status":303`) {
		t.Fatalf("tampered jwt accepted: %s", rec.Body.String())
	}
}
