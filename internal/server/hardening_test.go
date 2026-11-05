package server

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/RitterHou/cerebro/internal/auth"
	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/store"
)

// 同一 IP 连续失败 10 次后暂时拒绝登录，且不再调用认证器。
func TestLoginRateLimit(t *testing.T) {
	s := xAuthServer(t, nil)
	h := s.Handler()
	for i := 0; i < 10; i++ {
		xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("admin", "wrong"), xFormHdr)
	}
	// 正确密码也被拒绝
	rec := xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("admin", xPassword), xFormHdr)
	if c := xSessionCookie(rec); rec.Code != http.StatusSeeOther || !strings.HasSuffix(rec.Header().Get("Location"), "login") || (c != nil && strings.Contains(c.Value, "admin")) {
		t.Fatalf("expected block, got %d %s", rec.Code, rec.Header().Get("Location"))
	}
	page := xReq(t, h, http.MethodGet, "/login", "", nil, xSessionCookie(rec))
	if !strings.Contains(page.Body.String(), tooManyAttemptsMessage) {
		t.Fatalf("login page should show the limit message: %s", page.Body.String())
	}
	// 窗口过后恢复
	s.limiter.now = func() time.Time { return time.Now().Add(6 * time.Minute) }
	xLogin(t, h, "/", "admin")
}

// 从配置里删掉的用户，旧会话立即失效。
func TestRemovedUserSessionInvalid(t *testing.T) {
	h := xAuthServer(t, nil).Handler()
	cookie := xLogin(t, h, "/", "bob")
	hash, _ := auth.HashPassword("x")
	onlyAdmin, _ := auth.NewBasic([]config.BasicUser{{Username: "admin", Password: hash}})
	h2 := testServer(t, nil, xQuiet, func(o *Options) { o.Authn = onlyAdmin }).Handler()
	if status, _ := call(t, h2, "/navbar", `{"host":"http://127.0.0.1:1"}`, cookie); status != http.StatusSeeOther {
		t.Fatalf("removed user still logged in: %d", status)
	}
}

// TLS 证书路径写错时启动失败。
func TestBadTLSConfigFailsAtStartup(t *testing.T) {
	cfg := config.Default()
	cfg.DataDir = t.TempDir()
	cfg.Hosts = []config.HostConfig{{Name: "x", Host: "https://es", TLS: &config.TLSConfig{CA: "/nonexistent/ca.pem"}}}
	_, err := New(Options{Config: cfg, Client: es.NewClient(time.Second, "t"), SessionKey: make([]byte, 32)})
	if err == nil || !strings.Contains(err.Error(), "hosts[x].tls") {
		t.Fatalf("err = %v", err)
	}
}

// _security 接口的请求不写进历史（请求体里可能有密码）。
func TestSecurityRequestsNotInHistory(t *testing.T) {
	f := newFakeES(t).
		on("PUT /_security/user/u", 200, `{"created":true}`).
		on("GET /_cluster/health", 200, `{}`)
	db, err := store.Open(filepath.Join(t.TempDir(), "h.db"), 50)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	h := testServer(t, nil, func(o *Options) { o.History = db }).Handler()
	call(t, h, "/rest/request", hostBody(f.url(), `"method":"PUT","path":"_security/user/u","data":{"password":"p"}`))
	call(t, h, "/rest/request", hostBody(f.url(), `"method":"GET","path":"_cluster/health"`))
	_, body := call(t, h, "/rest/history", hostBody(f.url(), ""))
	if got, _ := body.([]any); len(got) != 1 {
		t.Fatalf("history = %v", body)
	}
}

// 新建的历史库只有当前用户可读写。
func TestHistoryFilePermissions(t *testing.T) {
	path := filepath.Join(t.TempDir(), "h.db")
	db, err := store.Open(path, 50)
	if err != nil {
		t.Fatal(err)
	}
	db.Close()
	st, err := os.Stat(path)
	if err != nil {
		t.Fatal(err)
	}
	if st.Mode().Perm() != 0o600 {
		t.Fatalf("perm = %v", st.Mode().Perm())
	}
}

// countingAuth 统计密码校验次数，密码 "ok" 正确。
type countingAuth struct {
	mu sync.Mutex
	n  int
}

func (c *countingAuth) Authenticate(_ context.Context, user, password string) (string, bool) {
	c.mu.Lock()
	c.n++
	c.mu.Unlock()
	time.Sleep(2 * time.Millisecond)
	return user, password == "ok"
}

// 并发突发也只会执行上限次数的校验（检查和登记在同一把锁里）。
func TestLoginRateLimitConcurrentBurst(t *testing.T) {
	a := &countingAuth{}
	h := testServer(t, nil, xQuiet, func(o *Options) { o.Authn = a }).Handler()
	var wg sync.WaitGroup
	for i := 0; i < 200; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("admin", "wrong"), xFormHdr)
		}()
	}
	wg.Wait()
	if a.n > 10 {
		t.Fatalf("%d password checks for a burst of 200, want <= 10", a.n)
	}
}

// 同一来源 IP 下别人输错密码，不会把其他用户锁在外面（部署在反向代理后面时所有人同一个 IP）。
func TestLoginRateLimitDoesNotLockOutOthers(t *testing.T) {
	a := &countingAuth{}
	h := testServer(t, nil, xQuiet, func(o *Options) { o.Authn = a }).Handler()
	for i := 0; i < 30; i++ {
		xReq(t, h, http.MethodPost, "/auth/login", xLoginForm(fmt.Sprintf("user%d", i), "wrong"), xFormHdr)
	}
	for i := 0; i < 10; i++ {
		xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("mallory", "wrong"), xFormHdr)
	}
	rec := xReq(t, h, http.MethodPost, "/auth/login", xLoginForm("bob", "ok"), xFormHdr)
	if rec.Header().Get("Location") != "/" {
		t.Fatalf("bob locked out: %d %s", rec.Code, rec.Header().Get("Location"))
	}
}

// key 太多时淘汰的是没被封禁的 key，已封禁的不会因此解封。
func TestLoginLimiterEvictionKeepsBlocked(t *testing.T) {
	l := newLoginLimiter(nil)
	l.maxKeys = 100
	req := httptest.NewRequest(http.MethodPost, "/auth/login", nil)
	for i := 0; i < 10; i++ {
		if _, ok := l.reserve(req, "admin"); !ok {
			t.Fatal("blocked too early")
		}
	}
	for i := 0; i < 500; i++ {
		r := httptest.NewRequest(http.MethodPost, "/auth/login", nil)
		r.RemoteAddr = fmt.Sprintf("10.1.%d.%d:1234", i/250, i%250)
		l.reserve(r, fmt.Sprintf("u%d", i))
	}
	if _, ok := l.reserve(req, "admin"); ok {
		t.Fatal("eviction unblocked admin")
	}
	if len(l.entries) > 100 {
		t.Fatalf("entries = %d", len(l.entries))
	}
}

// 只有来自可信代理的请求才看 X-Forwarded-For；IPv6 按 /64 归并。
func TestLoginLimiterClientIP(t *testing.T) {
	l := newLoginLimiter([]string{"10.0.0.0/8"})
	cases := []struct{ remote, xff, want string }{
		{"10.0.0.5:1", "203.0.113.7", "203.0.113.7"},
		{"10.0.0.5:1", "198.51.100.1, 203.0.113.7, 10.0.0.9", "203.0.113.7"},
		{"192.0.2.1:1", "203.0.113.7", "192.0.2.1"},
		{"[2001:db8:1:2:3:4:5:6]:1", "", "2001:db8:1:2::/64"},
	}
	for _, c := range cases {
		r := httptest.NewRequest(http.MethodPost, "/", nil)
		r.RemoteAddr = c.remote
		if c.xff != "" {
			r.Header.Set("X-Forwarded-For", c.xff)
		}
		if got := l.clientIP(r); got != c.want {
			t.Errorf("%s %q: got %s want %s", c.remote, c.xff, got, c.want)
		}
	}
}
