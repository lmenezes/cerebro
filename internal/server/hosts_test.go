package server

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/jsonx"
)

// allowUnknownHosts: false 时只能连预设集群，手动输入的地址返回 403 且不访问 ES。
func TestAllowUnknownHostsFalse(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"status":"green"}`)
	no := false
	h := testServer(t, func(c *config.Config) {
		c.AllowUnknownHosts = &no
		c.Hosts = []config.HostConfig{{Name: "known", Host: f.url()}}
	}, xQuiet).Handler()
	if status, _ := call(t, h, "/navbar", `{"host":"known"}`); status != 200 {
		t.Fatalf("known host: %d", status)
	}
	if status, _ := call(t, h, "/navbar", hostBody(f.url(), "")); status != http.StatusForbidden {
		t.Fatalf("typed url: %d", status)
	}
	if status, _ := call(t, h, "/connect", hostBody(f.url(), "")); status != http.StatusForbidden {
		t.Fatalf("connect typed url: %d", status)
	}
	if n := len(f.requests()); n != 1 {
		t.Fatalf("ES got %d requests, want 1", n)
	}
}

func TestNormalizeURL(t *testing.T) {
	for _, c := range [][2]string{
		{"HTTPS://Example.com:443/es/", "https://example.com/es"},
		{"http://example.com:80", "http://example.com"},
		{"http://example.com:9200//", "http://example.com:9200"},
		{" https://h/es ", "https://h/es"},
	} {
		if got := normalizeURL(c[0]); got != c[1] {
			t.Errorf("normalizeURL(%q) = %q, want %q", c[0], got, c[1])
		}
	}
}

// 集群级 TLS 只覆盖写了的项；显式的 insecureSkipVerify: false 能覆盖全局的 true。
func TestMergeTLS(t *testing.T) {
	base := es.TLSConfig{CAFile: "ca.pem", ServerName: "a", CertFile: "c", KeyFile: "k"}
	got := mergeTLS(base, config.TLSConfig{ServerName: "b"})
	if got.CAFile != "ca.pem" || got.ServerName != "b" || got.CertFile != "c" || got.InsecureSkipVerify {
		t.Fatalf("%+v", got)
	}
	got = mergeTLS(base, config.TLSConfig{CA: "x.pem", InsecureSkipVerify: new(true)})
	if got.CAFile != "x.pem" || !got.InsecureSkipVerify {
		t.Fatalf("%+v", got)
	}
	base.InsecureSkipVerify = true
	if mergeTLS(base, config.TLSConfig{}).InsecureSkipVerify != true {
		t.Fatal("unset should inherit global")
	}
	if mergeTLS(base, config.TLSConfig{InsecureSkipVerify: new(false)}).InsecureSkipVerify {
		t.Fatal("explicit false should override global true")
	}
}

// REST 页的 method 统一转成大写再发给 ES。
func TestRestRequestUppercasesMethod(t *testing.T) {
	f := newFakeES(t).on("GET /_cat/health", 200, `[]`)
	h := testServer(t, nil).Handler()
	if status, _ := call(t, h, "/rest/request", hostBody(f.url(), `"method":"get","path":"_cat/health"`)); status != 200 {
		t.Fatalf("status %d", status)
	}
	if got := f.requests()[0].Method; got != "GET" {
		t.Fatalf("method %q", got)
	}
}

// basePath 之外的 404 和 301 也带安全头。
func TestSecurityHeadersOutsideBasePath(t *testing.T) {
	h := testServer(t, func(c *config.Config) { c.BasePath = "/cerebro/" }).Handler()
	for _, p := range []string{"/other", "/cerebro"} {
		rec := httptest.NewRecorder()
		h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, p, nil))
		if rec.Header().Get("X-Content-Type-Options") != "nosniff" || rec.Header().Get("X-Frame-Options") == "" {
			t.Errorf("%s: missing security headers %v", p, rec.Header())
		}
	}
}

// /cerebro_info 返回当前连接是否只读，供前端隐藏修改类按钮。
func TestCerebroInfo(t *testing.T) {
	f := newFakeES(t)
	h := testServer(t, func(c *config.Config) {
		c.Hosts = []config.HostConfig{{Name: "prod", Host: f.url(), ReadOnly: true}}
	}).Handler()
	_, body := call(t, h, "/cerebro_info", `{"host":"prod"}`)
	assertJSON(t, body, `{"read_only":true,"username":null,"version":"0.10.0-test"}`)
	_, body = call(t, h, "/cerebro_info", hostBody(f.url()+"/other", ""))
	assertJSON(t, body, `{"read_only":false,"username":null,"version":"0.10.0-test"}`)
}

// 只读模式下，会改动集群的 GET 接口同样拦截。
func TestReadOnlyBlocksSideEffectGETs(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := testServer(t, func(c *config.Config) { c.ReadOnly = true }, xQuiet).Handler()
	for _, p := range []string{"_refresh", "idx/_refresh", "/idx/_flush?force=true", "_security/enroll/kibana", "_SECURITY/Enroll/node"} {
		if status, _ := call(t, h, "/rest/request", hostBody(f.url(), `"method":"GET","path":"`+p+`"`)); status != http.StatusForbidden {
			t.Errorf("%s: status %d", p, status)
		}
	}
	if status, _ := call(t, h, "/rest/request", hostBody(f.url(), `"method":"GET","path":"_cluster/health"`)); status != 200 {
		t.Errorf("plain GET blocked: %d", status)
	}
	if n := len(f.requests()); n != 1 {
		t.Fatalf("ES got %d requests", n)
	}
}

// 路径里的 . 和 .. 段会被拒绝，避免经反向代理逃出集群的路径前缀。
func TestRejectsDotSegments(t *testing.T) {
	f := newFakeES(t)
	h := testServer(t, nil, xQuiet).Handler()
	for _, p := range []string{"../other/_search", "a/./b", "%2e%2e/x", "a/%2E%2E/b", "x\\y"} {
		if status, _ := call(t, h, "/rest/request", hostBody(f.url(), `"method":"GET","path":"`+strings.ReplaceAll(p, `\`, `\\`)+`"`)); status != http.StatusBadRequest {
			t.Errorf("%s: status %d", p, status)
		}
	}
	if status, _ := call(t, h, "/cat", hostBody(f.url(), `"api":"../../_security/user"`)); status != http.StatusBadRequest {
		t.Errorf("cat traversal: %d", status)
	}
	if n := len(f.requests()); n != 0 {
		t.Fatalf("ES got %d requests", n)
	}
}

// 地址里内嵌的凭据挪到 auth，页面和报错里看不到密码。
func TestURLCredentialsAreNotExposed(t *testing.T) {
	f := newFakeES(t).on("GET /_aliases", 200, `{}`)
	h := testServer(t, nil, xQuiet).Handler()
	withCreds := strings.Replace(f.url(), "http://", "http://elastic:s3cret@", 1)
	_, body := call(t, h, "/rest", hostBody(withCreds, ""))
	if strings.Contains(jsonx.String(body), "s3cret") {
		t.Fatalf("password leaked: %s", jsonx.String(body))
	}
	_, body = call(t, h, "/rest/request", hostBody(withCreds, `"method":"GET","path":"100%"`))
	if strings.Contains(jsonx.String(body), "s3cret") {
		t.Fatalf("password leaked in error: %s", jsonx.String(body))
	}
}
