package server

import (
	"bytes"
	"compress/gzip"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"testing/fstest"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

func TestPages_Index(t *testing.T) {
	h := testServer(t, nil, xQuiet).Handler()
	rec := xReq(t, h, http.MethodGet, "/", "", nil)
	if rec.Code != 200 {
		t.Fatalf("index: %d", rec.Code)
	}
	body := rec.Body.String()
	for _, want := range []string{`appVersion = 'v0.10.0-test'`, `<title>{{title}}</title>`, `src="js/app.js"`} {
		if !strings.Contains(body, want) {
			t.Errorf("index page missing %q", want)
		}
	}
	if ct := rec.Header().Get("Content-Type"); ct != "text/html; charset=utf-8" {
		t.Errorf("Content-Type %q", ct)
	}
	if cc := rec.Header().Get("Cache-Control"); cc != "no-store" {
		t.Errorf("Cache-Control %q", cc)
	}
}

func TestPages_LoginPage(t *testing.T) {
	h := xAuthServer(t, nil).Handler()
	rec := xReq(t, h, http.MethodGet, "/login", "", nil)
	body := rec.Body.String()
	if rec.Code != 200 || !strings.Contains(body, "v0.10.0-test") || !strings.Contains(body, `name="password"`) {
		t.Fatalf("login page: %d %s", rec.Code, body)
	}
	if strings.Contains(body, loginFailedMessage) {
		t.Fatal("flash shown without a failed login")
	}
}

func TestPages_Healthz(t *testing.T) {
	h := testServer(t, nil, xQuiet).Handler()
	rec := xReq(t, h, http.MethodGet, "/healthz", "", nil)
	if rec.Code != 200 {
		t.Fatalf("healthz: %d", rec.Code)
	}
	assertJSON(t, jsonx.MustParse(rec.Body.String()), `{"status":"ok","version":"0.10.0-test"}`)
}

func TestPages_AssetETag(t *testing.T) {
	h := testServer(t, nil, xQuiet).Handler()
	rec := xReq(t, h, http.MethodGet, "/js/app.js", "", nil)
	etag := rec.Header().Get("ETag")
	if rec.Code != 200 || rec.Body.String() != "console.log('app')" {
		t.Fatalf("asset: %d %q", rec.Code, rec.Body.String())
	}
	if len(etag) < 3 || etag[0] != '"' || etag[len(etag)-1] != '"' {
		t.Fatalf("ETag %q", etag)
	}
	if cc := rec.Header().Get("Cache-Control"); cc != "no-cache" {
		t.Errorf("Cache-Control %q", cc)
	}
	if ct := rec.Header().Get("Content-Type"); !strings.Contains(ct, "javascript") {
		t.Errorf("Content-Type %q", ct)
	}

	rec = xReq(t, h, http.MethodGet, "/js/app.js", "", http.Header{"If-None-Match": {etag}})
	if rec.Code != http.StatusNotModified || rec.Body.Len() != 0 {
		t.Fatalf("If-None-Match: %d %q", rec.Code, rec.Body.String())
	}
	if rec := xReq(t, h, http.MethodGet, "/js/app.js", "", http.Header{"If-None-Match": {`"stale"`}}); rec.Code != 200 {
		t.Fatalf("stale ETag: %d", rec.Code)
	}
	rec = xReq(t, h, http.MethodGet, "/public/js/app.js", "", nil)
	if rec.Code != 200 || rec.Header().Get("ETag") != etag {
		t.Fatalf("/public/ alias: %d %q", rec.Code, rec.Header().Get("ETag"))
	}
	for _, p := range []string{"/js/missing.js", "/public/missing.js", "/js/"} {
		if rec := xReq(t, h, http.MethodGet, p, "", nil); rec.Code != http.StatusNotFound {
			t.Errorf("%s: %d", p, rec.Code)
		}
	}
	// 版本变化 ETag 也变化，升级后浏览器会重新下载
	h2 := testServer(t, nil, xQuiet, func(o *Options) { o.Version = "9.9.9" }).Handler()
	if other := xReq(t, h2, http.MethodGet, "/js/app.js", "", nil).Header().Get("ETag"); other == etag {
		t.Error("ETag should depend on the version")
	}
}

func xGunzip(t *testing.T, b []byte) string {
	t.Helper()
	zr, err := gzip.NewReader(bytes.NewReader(b))
	if err != nil {
		t.Fatal(err)
	}
	out, err := io.ReadAll(zr)
	if err != nil {
		t.Fatal(err)
	}
	return string(out)
}

func TestPages_Gzip(t *testing.T) {
	big := strings.Repeat("console.log('cerebro');\n", 400)
	f := newFakeES(t).on("GET /_cat/indices?format=json", 200, `[`+strings.Repeat(`{"index":"some-index-name"},`, 200)+`{}]`)
	h := testServer(t, nil, xQuiet, func(o *Options) {
		o.Public = fstest.MapFS{"js/big.js": {Data: []byte(big)}}
	}).Handler()
	gz := http.Header{"Accept-Encoding": {"gzip"}}

	rec := xReq(t, h, http.MethodGet, "/js/big.js", "", gz)
	if rec.Header().Get("Content-Encoding") != "gzip" {
		t.Fatalf("asset not gzipped: %v", rec.Header())
	}
	if xGunzip(t, rec.Body.Bytes()) != big {
		t.Fatal("gzip body mismatch")
	}
	if rec := xReq(t, h, http.MethodGet, "/js/big.js", "", nil); rec.Header().Get("Content-Encoding") != "" || rec.Body.String() != big {
		t.Fatal("no Accept-Encoding should get plain body")
	}

	hdr := http.Header{"Accept-Encoding": {"gzip"}, "Content-Type": {"application/json"}}
	rec = xReq(t, h, http.MethodPost, "/cat", hostBody(f.url(), `"api":"indices"`), hdr)
	if rec.Header().Get("Content-Encoding") != "gzip" {
		t.Fatalf("API response not gzipped: %v", rec.Header())
	}
	if v := jsonx.MustParse(xGunzip(t, rec.Body.Bytes())); jsonx.At(v, "status") == nil {
		t.Fatal("bad API body after gunzip")
	}
}

func TestPages_SecurityHeaders(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := testServer(t, nil, xQuiet).Handler()
	jsonHdr := http.Header{"Content-Type": {"application/json"}}
	cases := []struct{ method, path, body string }{
		{http.MethodGet, "/", ""},
		{http.MethodGet, "/js/app.js", ""},
		{http.MethodGet, "/missing.js", ""},
		{http.MethodGet, "/healthz", ""},
		{http.MethodGet, "/login", ""},
		{http.MethodPost, "/navbar", hostBody(f.url(), "")},
	}
	want := map[string]string{"X-Content-Type-Options": "nosniff", "X-Frame-Options": "SAMEORIGIN", "Referrer-Policy": "same-origin"}
	for _, c := range cases {
		rec := xReq(t, h, c.method, c.path, c.body, jsonHdr)
		for k, v := range want {
			if got := rec.Header().Get(k); got != v {
				t.Errorf("%s %s: %s = %q, want %q", c.method, c.path, k, got, v)
			}
		}
	}
}

// 没构建前端（嵌入的目录里只有占位文件）时，首页给出明确提示而不是空白页。
func TestIndexWithoutFrontend(t *testing.T) {
	h := testServer(t, nil, func(o *Options) { o.Public = fstest.MapFS{".gitkeep": {Data: nil}} }).Handler()
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/", nil))
	if rec.Code != http.StatusServiceUnavailable || !strings.Contains(rec.Body.String(), "npm --prefix web") {
		t.Fatalf("got %d %s", rec.Code, rec.Body.String())
	}
}

// Vue 前端自带 index.html 时原样返回，并写入版本号。
func TestIndexSPA(t *testing.T) {
	ui := fstest.MapFS{"index.html": {Data: []byte(`<meta name="cerebro-version" content="__CEREBRO_VERSION__">`)}}
	h := testServer(t, nil, func(o *Options) { o.Public = ui }).Handler()
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/", nil))
	if !strings.Contains(rec.Body.String(), `content="0.10.0-test"`) {
		t.Fatalf("got %s", rec.Body.String())
	}
}
