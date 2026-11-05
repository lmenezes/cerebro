package server

import (
	"log/slog"
	"net/http"
	"net/http/httptest"
	"net/url"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/RitterHou/cerebro/internal/auth"
	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/jsonx"
	"github.com/RitterHou/cerebro/internal/store"
)

// 本文件的辅助函数都以 x 开头，避免和其他测试文件重名。

const xTestKey = "0123456789abcdef0123456789abcdef" // 与 testServer 的 SessionKey 相同

// xReq 发任意请求。
func xReq(t *testing.T, h http.Handler, method, target, body string, hdr http.Header, cookies ...*http.Cookie) *httptest.ResponseRecorder {
	t.Helper()
	req := httptest.NewRequest(method, target, strings.NewReader(body))
	for k, v := range hdr {
		req.Header[k] = v
	}
	for _, c := range cookies {
		if c != nil {
			req.AddCookie(c)
		}
	}
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)
	return rec
}

// xSessionCookie 取响应里的会话 cookie，没有返回 nil。
func xSessionCookie(rec *httptest.ResponseRecorder) *http.Cookie {
	for _, c := range rec.Result().Cookies() {
		if c.Name == auth.CookieName {
			return c
		}
	}
	return nil
}

// xNext 返回下一次请求应带的 cookie（被清除时为 nil）。
func xNext(prev *http.Cookie, rec *httptest.ResponseRecorder) *http.Cookie {
	c := xSessionCookie(rec)
	switch {
	case c == nil:
		return prev
	case c.MaxAge < 0:
		return nil
	default:
		return c
	}
}

var xFormHdr = http.Header{"Content-Type": {"application/x-www-form-urlencoded"}}

func xLoginForm(user, pw string) string {
	return url.Values{"user": {user}, "password": {pw}}.Encode()
}

var (
	xHashOnce sync.Once
	xHash     string
)

const xPassword = "secret-pw"

// xBasic 返回有 admin、alice、bob 三个用户（密码都是 xPassword）的认证器。
func xBasic(t *testing.T) auth.Authenticator {
	t.Helper()
	xHashOnce.Do(func() { xHash, _ = auth.HashPassword(xPassword) })
	b, err := auth.NewBasic([]config.BasicUser{
		{Username: "admin", Password: xHash},
		{Username: "alice", Password: xHash},
		{Username: "bob", Password: xHash},
	})
	if err != nil {
		t.Fatal(err)
	}
	return b
}

// xQuiet 丢弃服务端日志。
func xQuiet(o *Options) { o.Logger = slog.New(slog.DiscardHandler) }

// xAuthServer 创建开启 basic 登录的 Server。
func xAuthServer(t *testing.T, mutate func(*config.Config), opts ...func(*Options)) *Server {
	t.Helper()
	opts = append([]func(*Options){xQuiet, func(o *Options) { o.Authn = xBasic(t) }}, opts...)
	return testServer(t, mutate, opts...)
}

// xLogin 登录并返回会话 cookie。
func xLogin(t *testing.T, h http.Handler, base, user string) *http.Cookie {
	t.Helper()
	rec := xReq(t, h, http.MethodPost, base+"auth/login", xLoginForm(user, xPassword), xFormHdr)
	c := xSessionCookie(rec)
	if rec.Code != http.StatusSeeOther || c == nil || c.MaxAge < 0 {
		t.Fatalf("login %s: HTTP %d, cookie %v", user, rec.Code, c)
	}
	return c
}

// xForge 用指定密钥和有效期签一个会话 cookie。
func xForge(t *testing.T, key string, maxAge time.Duration, sess auth.Session) *http.Cookie {
	t.Helper()
	rec := httptest.NewRecorder()
	auth.NewSessions([]byte(key), maxAge, "/", nil).Save(rec, httptest.NewRequest(http.MethodGet, "/", nil), sess)
	return xSessionCookie(rec)
}

func TestLogin_DisabledRedirectsToBase(t *testing.T) {
	h := testServer(t, nil).Handler()
	rec := xReq(t, h, http.MethodGet, "/login", "", nil)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/" {
		t.Fatalf("GET /login: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	rec = xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("a", "b"), xFormHdr)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/" {
		t.Fatalf("POST /auth/login: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	if rec := xReq(t, h, http.MethodGet, "/", "", nil); rec.Code != http.StatusOK {
		t.Fatalf("index without auth: %d", rec.Code)
	}
}

func TestLogin_APIRequiresSession(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := xAuthServer(t, nil).Handler()
	for _, rt := range xProcessRoutes(t) {
		code, v := post(t, h, rt.path, xFullBody(f.url()))
		if code != http.StatusOK {
			t.Fatalf("%s: HTTP %d", rt.path, code)
		}
		assertJSON(t, v, `{"status":303,"body":null}`)
	}
	code, v := post(t, h, "/connect", hostBody(f.url(), ""))
	if code != http.StatusOK {
		t.Fatalf("/connect: HTTP %d", code)
	}
	assertJSON(t, v, `{"status":303,"body":null}`)
	rec := xReq(t, h, http.MethodGet, "/connect/hosts", "", nil)
	assertJSON(t, jsonx.MustParse(rec.Body.String()), `{"status":303,"body":null}`)
	if n := len(f.requests()); n != 0 {
		t.Fatalf("ES called %d times without a session", n)
	}
}

func TestLogin_FullFlowRemembersQuery(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"cluster_name":"es"}`)
	h := xAuthServer(t, nil).Handler()

	rec := xReq(t, h, http.MethodGet, "/?host=prod&x=1", "", nil)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/login" {
		t.Fatalf("GET /: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	jar := xNext(nil, rec)
	if jar == nil {
		t.Fatal("redirect should be remembered in a cookie")
	}

	rec = xReq(t, h, http.MethodGet, "/login", "", nil, jar)
	if rec.Code != http.StatusOK || !strings.Contains(rec.Body.String(), `action="auth/login"`) {
		t.Fatalf("login page: %d", rec.Code)
	}
	jar = xNext(jar, rec)

	rec = xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("admin", xPassword), xFormHdr, jar)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/?host=prod&x=1" {
		t.Fatalf("login: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	jar = xNext(jar, rec)

	if rec := xReq(t, h, http.MethodGet, "/", "", nil, jar); rec.Code != http.StatusOK {
		t.Fatalf("index after login: %d", rec.Code)
	}
	// 已登录访问登录页直接跳回首页
	if rec := xReq(t, h, http.MethodGet, "/login", "", nil, jar); rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/" {
		t.Fatalf("login page when logged in: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	status, body := call(t, h, "/navbar", hostBody(f.url(), ""), jar)
	if status != 200 {
		t.Fatalf("navbar: %d", status)
	}
	assertJSON(t, body, `{"cluster_name":"es","username":"admin"}`)
}

func TestLogin_FailureFlashShownOnce(t *testing.T) {
	h := xAuthServer(t, nil).Handler()
	rec := xReq(t, h, http.MethodGet, "/?a=b", "", nil)
	jar := xNext(nil, rec)

	for _, creds := range [][2]string{{"admin", "wrong"}, {"nobody", xPassword}} {
		rec = xReq(t, h, http.MethodPost, "/auth/login", xLoginForm(creds[0], creds[1]), xFormHdr, jar)
		if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/login" {
			t.Fatalf("%v: %d %q", creds, rec.Code, rec.Header().Get("Location"))
		}
		jar = xNext(jar, rec)
		rec = xReq(t, h, http.MethodGet, "/login", "", nil, jar)
		if !strings.Contains(rec.Body.String(), loginFailedMessage) {
			t.Fatalf("%v: flash not shown", creds)
		}
		jar = xNext(jar, rec)
		if rec := xReq(t, h, http.MethodGet, "/login", "", nil, jar); strings.Contains(rec.Body.String(), loginFailedMessage) {
			t.Fatalf("%v: flash shown twice", creds)
		}
	}
	// 失败后再成功，仍跳回最初记住的地址
	rec = xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("admin", xPassword), xFormHdr, jar)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/?a=b" {
		t.Fatalf("login after failure: %d %q", rec.Code, rec.Header().Get("Location"))
	}
}

func TestLogin_EmptyFieldsBadRequest(t *testing.T) {
	h := xAuthServer(t, nil).Handler()
	for _, form := range []string{xLoginForm("", xPassword), xLoginForm("admin", ""), "", "user=admin"} {
		rec := xReq(t, h, http.MethodPost, "/auth/login", form, xFormHdr)
		if rec.Code != http.StatusBadRequest || !strings.Contains(rec.Body.String(), "invalid login form data") {
			t.Errorf("form %q: %d %q", form, rec.Code, rec.Body.String())
		}
		if c := xSessionCookie(rec); c != nil && c.MaxAge >= 0 {
			t.Errorf("form %q: session cookie set", form)
		}
	}
}

func TestLogin_Logout(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := xAuthServer(t, nil).Handler()
	jar := xLogin(t, h, "/", "admin")
	rec := xReq(t, h, http.MethodPost, "/auth/logout", "", nil, jar)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/login" {
		t.Fatalf("logout: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	c := xSessionCookie(rec)
	if c == nil || c.MaxAge >= 0 || c.Path != "/" {
		t.Fatalf("logout should clear the cookie: %+v", c)
	}
	if next := xNext(jar, rec); next != nil {
		t.Fatalf("cookie still kept after logout: %+v", next)
	}
	status, _ := call(t, h, "/navbar", hostBody(f.url(), ""))
	if status != http.StatusSeeOther {
		t.Fatalf("after logout: %d", status)
	}
}

func TestLogin_InvalidCookiesRejected(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := xAuthServer(t, nil).Handler()
	valid := xLogin(t, h, "/", "admin")
	payload, sig, _ := strings.Cut(valid.Value, ".")
	cases := map[string]*http.Cookie{
		"改签名":   {Name: auth.CookieName, Value: payload + "." + strings.Repeat("A", len(sig))},
		"去掉签名":  {Name: auth.CookieName, Value: payload},
		"其他密钥签": xForge(t, "another-key-another-key-another!!", time.Hour, auth.Session{User: "admin"}),
		"已过期":   xForge(t, xTestKey, -time.Minute, auth.Session{User: "admin"}),
		"只有跳转":  xForge(t, xTestKey, time.Hour, auth.Session{Redirect: "/"}),
	}
	for name, c := range cases {
		if status, _ := call(t, h, "/navbar", hostBody(f.url(), ""), c); status != http.StatusSeeOther {
			t.Errorf("%s: status %d, want 303", name, status)
		}
	}
	// 对照：同一密钥签的有效会话可用
	ok := xForge(t, xTestKey, time.Hour, auth.Session{User: "admin"})
	if status, _ := call(t, h, "/navbar", hostBody(f.url(), ""), ok); status != 200 {
		t.Fatalf("valid forged-with-same-key cookie: %d", status)
	}
}

func TestLogin_HistoryPerUser(t *testing.T) {
	f := newFakeES(t).on("GET /_cat/health", 200, `[]`).on("GET /_cat/nodes", 200, `[]`)
	db, err := store.Open(filepath.Join(t.TempDir(), "h.db"), 50)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = db.Close() })
	h := xAuthServer(t, nil, func(o *Options) { o.History = db }).Handler()
	alice, bob := xLogin(t, h, "/", "alice"), xLogin(t, h, "/", "bob")

	if s, _ := call(t, h, "/rest/request", hostBody(f.url(), `"method":"GET","path":"_cat/health"`), alice); s != 200 {
		t.Fatalf("alice request: %d", s)
	}
	if s, _ := call(t, h, "/rest/request", hostBody(f.url(), `"method":"GET","path":"_cat/nodes"`), bob); s != 200 {
		t.Fatalf("bob request: %d", s)
	}
	for user, want := range map[*http.Cookie]string{alice: "_cat/health", bob: "_cat/nodes"} {
		status, body := call(t, h, "/rest/history", hostBody(f.url(), ""), user)
		arr, _ := body.([]any)
		if status != 200 || len(arr) != 1 {
			t.Fatalf("history: %d %s", status, jsonx.String(body))
		}
		if p, _ := jsonx.StringAt(arr[0], "path"); p != want {
			t.Errorf("history path = %q, want %q", p, want)
		}
	}
}

func TestLogin_HealthzWithoutSession(t *testing.T) {
	h := xAuthServer(t, nil).Handler()
	rec := xReq(t, h, http.MethodGet, "/healthz", "", nil)
	if rec.Code != http.StatusOK {
		t.Fatalf("healthz: %d", rec.Code)
	}
	assertJSON(t, jsonx.MustParse(rec.Body.String()), `{"status":"ok","version":"0.10.0-test"}`)
}
