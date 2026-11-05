package server

import (
	"encoding/base64"
	"encoding/pem"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"

	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/jsonx"
)

func xB64(s string) string { return base64.StdEncoding.EncodeToString([]byte(s)) }

func xLastAuth(t *testing.T, f *fakeES) string {
	t.Helper()
	reqs := f.requests()
	if len(reqs) == 0 {
		t.Fatal("ES received no request")
	}
	return reqs[len(reqs)-1].Authorization
}

func TestTarget_RequestCredentials(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := testServer(t, nil, xQuiet).Handler()
	cases := []struct{ extra, want string }{
		{`"username":"elastic","password":"changeme"`, "Basic " + xB64("elastic:changeme")},
		{`"password":"c29tZWtleQ=="`, "ApiKey c29tZWtleQ=="},
		{`"username":"","password":"c29tZWtleQ=="`, "ApiKey c29tZWtleQ=="},
		{`"username":"","password":"myid:mykey"`, "ApiKey " + xB64("myid:mykey")},
		{`"password":"Bearer tok-123"`, "Bearer tok-123"},
		{`"password":"ApiKey abc"`, "ApiKey abc"},
		{``, ""},
		{`"username":"","password":""`, ""},
	}
	for _, c := range cases {
		if s, _ := call(t, h, "/navbar", hostBody(f.url(), c.extra)); s != 200 {
			t.Fatalf("%s: status %d", c.extra, s)
		}
		if got := xLastAuth(t, f); got != c.want {
			t.Errorf("%s: Authorization %q, want %q", c.extra, got, c.want)
		}
	}
}

func TestTarget_PresetCredentialsWin(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := testServer(t, func(c *config.Config) {
		c.Hosts = []config.HostConfig{
			{Name: "basic", Host: f.url(), Auth: &config.HostAuth{Username: "elastic", Password: "preset"}},
			{Name: "apikey", Host: f.url(), Auth: &config.HostAuth{APIKey: "id:key"}},
			{Name: "bearer", Host: f.url(), Auth: &config.HostAuth{Bearer: "preset-token"}},
			{Name: "open", Host: f.url()},
		}
	}, xQuiet).Handler()
	reqCreds := `"username":"user","password":"from-request"`
	cases := map[string]string{
		"basic":  "Basic " + xB64("elastic:preset"),
		"apikey": "ApiKey " + xB64("id:key"),
		"bearer": "Bearer preset-token",
		"open":   "Basic " + xB64("user:from-request"), // 没有预设凭据时用请求里的
	}
	for host, want := range cases {
		if s, _ := call(t, h, "/navbar", hostBody(host, reqCreds)); s != 200 {
			t.Fatalf("%s: status %d", host, s)
		}
		if got := xLastAuth(t, f); got != want {
			t.Errorf("%s: Authorization %q, want %q", host, got, want)
		}
	}
	// 直接输入同一地址不会拿到预设凭据
	call(t, h, "/navbar", hostBody(f.url(), ""))
	if got := xLastAuth(t, f); got != "" {
		t.Errorf("URL typed directly got preset credentials %q", got)
	}
}

func TestTarget_NamedHostUsesConfiguredURL(t *testing.T) {
	prod := newFakeES(t).on("GET /_cluster/health", 200, `{"cluster_name":"prod"}`)
	dev := newFakeES(t).on("GET /_cluster/health", 200, `{"cluster_name":"dev"}`)
	h := testServer(t, func(c *config.Config) {
		c.Hosts = []config.HostConfig{{Name: "prod", Host: prod.url()}, {Name: "dev", Host: dev.url()}}
	}, xQuiet).Handler()

	_, body := call(t, h, "/navbar", `{"host":"prod"}`)
	assertJSON(t, body, `{"cluster_name":"prod"}`)
	code, v := post(t, h, "/connect", `{"host":"dev"}`)
	if code != 200 {
		t.Fatalf("/connect: %d", code)
	}
	assertJSON(t, v, `{"status":200,"body":{"cluster_name":"dev"}}`)
	rec := xReq(t, h, http.MethodGet, "/connect/hosts", "", nil)
	assertJSON(t, jsonx.MustParse(rec.Body.String()), `{"status":200,"body":["prod","dev"]}`)
}

func TestTarget_UnknownHostUsedAsURL(t *testing.T) {
	h := testServer(t, nil, xQuiet).Handler()
	for _, host := range []string{"prod", "localhost:9200", "ftp://es:9200"} {
		status, body := call(t, h, "/navbar", `{"host":"`+host+`"}`)
		msg, _ := jsonx.StringAt(body, "error")
		if status < 400 || !strings.Contains(msg, "http://") {
			t.Errorf("%s: status %d body %s, want invalid address error", host, status, jsonx.String(body))
		}
	}
	code, _ := post(t, h, "/connect", `{"host":"not-a-url"}`)
	if code != http.StatusInternalServerError {
		t.Errorf("/connect with bad address: HTTP %d", code)
	}
	if s, body := call(t, h, "/navbar", `{}`); s != http.StatusBadRequest {
		t.Errorf("missing host: %d %s", s, jsonx.String(body))
	}
}

func TestTarget_HeaderWhitelist(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := testServer(t, func(c *config.Config) {
		c.Hosts = []config.HostConfig{{Name: "proxy", Host: f.url(), HeadersWhitelist: []string{"x-proxy-user", "X-Tenant"}}}
	}, xQuiet).Handler()
	send := func(host string) http.Header {
		req := httptest.NewRequest(http.MethodPost, "/navbar", strings.NewReader(`{"host":"`+host+`"}`))
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("X-Proxy-User", "alice")
		req.Header.Add("X-Tenant", "t1")
		req.Header.Add("X-Tenant", "t2")
		req.Header.Set("X-Other", "nope")
		req.Header.Set("Cookie", "a=b")
		h.ServeHTTP(httptest.NewRecorder(), req)
		reqs := f.requests()
		return reqs[len(reqs)-1].Header
	}
	got := send("proxy")
	if got.Get("X-Proxy-User") != "alice" || strings.Join(got.Values("X-Tenant"), ",") != "t1,t2" {
		t.Errorf("whitelisted headers not forwarded: %v", got)
	}
	if got.Get("X-Other") != "" || got.Get("Cookie") != "" {
		t.Errorf("non-whitelisted headers forwarded: %v", got)
	}
	got = send(f.url())
	if got.Get("X-Proxy-User") != "" {
		t.Errorf("unknown host should not forward headers: %v", got)
	}
}

// xPrefixES 把假 ES 挂在 /es 下，并记录原始路径。
func xPrefixES(t *testing.T, f *fakeES) (string, func() []string) {
	t.Helper()
	var mu sync.Mutex
	var paths []string
	inner := http.StripPrefix("/es", http.HandlerFunc(f.serve))
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mu.Lock()
		paths = append(paths, r.URL.RequestURI())
		mu.Unlock()
		inner.ServeHTTP(w, r)
	}))
	t.Cleanup(srv.Close)
	return srv.URL + "/es", func() []string {
		mu.Lock()
		defer mu.Unlock()
		return append([]string(nil), paths...)
	}
}

func TestTarget_PathPrefix(t *testing.T) {
	f := newFakeES(t).
		on("GET /_cluster/health", 200, `{"cluster_name":"es"}`).
		on("GET /_cat/indices", 200, `[]`)
	base, paths := xPrefixES(t, f)
	h := testServer(t, func(c *config.Config) {
		c.Hosts = []config.HostConfig{{Name: "prefixed", Host: base + "/"}}
	}, xQuiet).Handler()

	for _, host := range []string{base, base + "/", base + "//", "prefixed"} {
		status, body := call(t, h, "/navbar", `{"host":"`+host+`"}`)
		if status != 200 {
			t.Fatalf("%s: %d %s", host, status, jsonx.String(body))
		}
	}
	for _, p := range []string{"_cat/indices", "/_cat/indices"} {
		if s, _ := call(t, h, "/rest/request", hostBody(base+"/", `"method":"GET","path":"`+p+`"`)); s != 200 {
			t.Fatalf("rest %s: %d", p, s)
		}
	}
	call(t, h, "/overview", `{"host":"prefixed"}`) // 7 个并发请求
	got := paths()
	if len(got) < 13 {
		t.Fatalf("too few requests: %v", got)
	}
	for _, p := range got {
		if !strings.HasPrefix(p, "/es/_") {
			t.Errorf("request %q is not under the /es/ prefix", p)
		}
	}
}

// xTLSES 启动 HTTPS 假 ES，返回地址和 CA 文件（httptest 的证书是自签 CA，覆盖 127.0.0.1）。
func xTLSES(t *testing.T, f *fakeES) (string, string) {
	t.Helper()
	srv := httptest.NewUnstartedServer(http.HandlerFunc(f.serve))
	srv.Config.ErrorLog = log.New(io.Discard, "", 0)
	srv.StartTLS()
	t.Cleanup(srv.Close)
	ca := filepath.Join(t.TempDir(), "ca.pem")
	if err := os.WriteFile(ca, pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: srv.Certificate().Raw}), 0o600); err != nil {
		t.Fatal(err)
	}
	return srv.URL, ca
}

func TestTarget_TLSConfig(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"tls":true}`)
	url, ca := xTLSES(t, f)

	// 没有 CA：证书校验失败
	h := testServer(t, nil, xQuiet).Handler()
	if s, body := call(t, h, "/navbar", hostBody(url, "")); s == 200 {
		t.Fatalf("without CA should fail, got %s", jsonx.String(body))
	}

	// 全局 es.tls.ca 用于手动输入的地址，也是预设集群的默认值
	h = testServer(t, func(c *config.Config) {
		c.ES.TLS.CA = ca
		c.Hosts = []config.HostConfig{{Name: "inherit", Host: url}}
	}, xQuiet).Handler()
	for _, host := range []string{url, "inherit"} {
		if s, body := call(t, h, "/navbar", hostBody(host, "")); s != 200 {
			t.Errorf("global CA, host %s: %d %s", host, s, jsonx.String(body))
		}
	}

	// 集群自己的 tls 设置
	h = testServer(t, func(c *config.Config) {
		c.Hosts = []config.HostConfig{
			{Name: "own-ca", Host: url, TLS: &config.TLSConfig{CA: ca}},
			{Name: "insecure", Host: url, TLS: &config.TLSConfig{InsecureSkipVerify: new(true)}},
			{Name: "none", Host: url},
		}
	}, xQuiet).Handler()
	for host, ok := range map[string]bool{"own-ca": true, "insecure": true, "none": false, url: false} {
		s, body := call(t, h, "/navbar", hostBody(host, ""))
		if (s == 200) != ok {
			t.Errorf("host %s: status %d (%s), want success=%v", host, s, jsonx.String(body), ok)
		}
	}
}
