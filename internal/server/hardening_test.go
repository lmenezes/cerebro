package server

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
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
