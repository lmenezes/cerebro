package server

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/es"
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

// 集群级 TLS 只覆盖写了的项。
func TestMergeTLS(t *testing.T) {
	base := es.TLSConfig{CAFile: "ca.pem", ServerName: "a", CertFile: "c", KeyFile: "k"}
	got := mergeTLS(base, es.TLSConfig{ServerName: "b"})
	if got.CAFile != "ca.pem" || got.ServerName != "b" || got.CertFile != "c" || got.InsecureSkipVerify {
		t.Fatalf("%+v", got)
	}
	got = mergeTLS(base, es.TLSConfig{CAFile: "x.pem", InsecureSkipVerify: true})
	if got.CAFile != "x.pem" || !got.InsecureSkipVerify {
		t.Fatalf("%+v", got)
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
