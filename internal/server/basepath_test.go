package server

import (
	"net/http"
	"strings"
	"testing"

	"github.com/RitterHou/cerebro/internal/config"
)

func xWithBase(base string) func(*config.Config) {
	return func(c *config.Config) { c.BasePath = base }
}

func TestBasePath_Routing(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"cluster_name":"es"}`)
	h := testServer(t, xWithBase("/cerebro/"), xQuiet).Handler()

	rec := xReq(t, h, http.MethodGet, "/cerebro", "", nil)
	if rec.Code != http.StatusMovedPermanently || rec.Header().Get("Location") != "/cerebro/" {
		t.Fatalf("/cerebro: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	ok := map[string]string{
		"/cerebro/":                 "appVersion",
		"/cerebro/js/app.js":        "console.log",
		"/cerebro/public/js/app.js": "console.log",
		"/cerebro/healthz":          `"status":"ok"`,
		"/cerebro/img/favicon.png":  "png",
	}
	for p, want := range ok {
		rec := xReq(t, h, http.MethodGet, p, "", nil)
		if rec.Code != 200 || !strings.Contains(rec.Body.String(), want) {
			t.Errorf("%s: %d %q", p, rec.Code, rec.Body.String())
		}
	}
	for _, p := range []string{"/", "/js/app.js", "/healthz", "/other", "/cerebrox", "/cerebrox/", "/login"} {
		if rec := xReq(t, h, http.MethodGet, p, "", nil); rec.Code != http.StatusNotFound {
			t.Errorf("%s: %d, want 404", p, rec.Code)
		}
	}

	status, body := call(t, h, "/cerebro/navbar", hostBody(f.url(), ""))
	if status != 200 {
		t.Fatalf("API under base path: %d", status)
	}
	assertJSON(t, body, `{"cluster_name":"es"}`)
	if rec := xReq(t, h, http.MethodPost, "/navbar", hostBody(f.url(), ""), http.Header{"Content-Type": {"application/json"}}); rec.Code != http.StatusNotFound {
		t.Fatalf("API outside base path: HTTP %d", rec.Code)
	}
}

func TestBasePath_Nested(t *testing.T) {
	h := testServer(t, xWithBase("/a/b/"), xQuiet).Handler()
	if rec := xReq(t, h, http.MethodGet, "/a/b/js/app.js", "", nil); rec.Code != 200 {
		t.Fatalf("nested asset: %d", rec.Code)
	}
	if rec := xReq(t, h, http.MethodGet, "/a/b", "", nil); rec.Code != http.StatusMovedPermanently || rec.Header().Get("Location") != "/a/b/" {
		t.Fatalf("/a/b: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	if rec := xReq(t, h, http.MethodGet, "/a/", "", nil); rec.Code != http.StatusNotFound {
		t.Fatalf("/a/: %d", rec.Code)
	}
}

func TestBasePath_LoginFlow(t *testing.T) {
	const base = "/cerebro/"
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := xAuthServer(t, xWithBase(base)).Handler()

	rec := xReq(t, h, http.MethodGet, base+"?host=x", "", nil)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != base+"login" {
		t.Fatalf("index: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	jar := xSessionCookie(rec)
	if jar == nil || jar.Path != base {
		t.Fatalf("redirect cookie path: %+v", jar)
	}

	rec = xReq(t, h, http.MethodPost, base+"auth/login", xLoginForm("admin", "bad"), xFormHdr, jar)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != base+"login" {
		t.Fatalf("failed login: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	jar = xNext(jar, rec)

	rec = xReq(t, h, http.MethodPost, base+"auth/login", xLoginForm("admin", xPassword), xFormHdr, jar)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != base+"?host=x" {
		t.Fatalf("login: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	sess := xSessionCookie(rec)
	if sess == nil || sess.Path != base {
		t.Fatalf("session cookie path: %+v", sess)
	}
	if s, _ := call(t, h, base+"navbar", hostBody(f.url(), ""), sess); s != 200 {
		t.Fatalf("API with session: %d", s)
	}
	if s, _ := call(t, h, base+"navbar", hostBody(f.url(), "")); s != http.StatusSeeOther {
		t.Fatalf("API without session: %d", s)
	}

	rec = xReq(t, h, http.MethodPost, base+"auth/logout", "", nil, sess)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != base+"login" {
		t.Fatalf("logout: %d %q", rec.Code, rec.Header().Get("Location"))
	}
	if c := xSessionCookie(rec); c == nil || c.MaxAge >= 0 || c.Path != base {
		t.Fatalf("logout cookie: %+v", c)
	}
	if rec := xReq(t, h, http.MethodGet, base+"healthz", "", nil); rec.Code != 200 {
		t.Fatalf("healthz needs no session: %d", rec.Code)
	}
}

func TestBasePath_LoginDisabledRedirect(t *testing.T) {
	h := testServer(t, xWithBase("/cerebro/"), xQuiet).Handler()
	rec := xReq(t, h, http.MethodGet, "/cerebro/login", "", nil)
	if rec.Code != http.StatusSeeOther || rec.Header().Get("Location") != "/cerebro/" {
		t.Fatalf("login disabled: %d %q", rec.Code, rec.Header().Get("Location"))
	}
}
