package server

import (
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 这里是把 test/controllers/*Spec.scala 改写成 Go 时共用的辅助函数。

// fixture 读取 internal/server/testdata 下的文件。
func fixture(t *testing.T, name string) string {
	t.Helper()
	b, err := os.ReadFile(filepath.Join("testdata", name))
	if err != nil {
		t.Fatal(err)
	}
	return string(b)
}

// ensure 对应 Scala MockedServices.ensure：调用接口并比较 Cerebro 的 status 和 body。
func ensure(t *testing.T, h http.Handler, path, body string, wantStatus int, wantBody string) {
	t.Helper()
	status, got := call(t, h, path, body)
	if status != wantStatus {
		t.Fatalf("%s: status = %d, want %d; body: %s", path, status, wantStatus, jsonx.String(got))
	}
	assertJSON(t, got, wantBody)
}

// callWithHeaders 同 call，但可以附带额外的请求头（用于 headersWhitelist）。
func callWithHeaders(t *testing.T, h http.Handler, path, body string, hdr http.Header) (int, any) {
	t.Helper()
	req := httptest.NewRequest(http.MethodPost, path, strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	for k, vs := range hdr {
		for _, v := range vs {
			req.Header.Add(k, v)
		}
	}
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("%s: HTTP %d: %s", path, rec.Code, rec.Body.String())
	}
	v, err := jsonx.Parse(rec.Body.Bytes())
	if err != nil {
		t.Fatalf("response is not JSON: %s", rec.Body.String())
	}
	status, ok := jsonx.Int64(jsonx.At(v, "status"))
	if !ok {
		t.Fatalf("%s: missing status in %s", path, jsonx.String(v))
	}
	return int(status), jsonx.At(v, "body")
}

// assertESCall 断言假 ES 恰好收到一次 method+uri 请求：
// wantBody 为空表示不应带 body，否则按 JSON 语义比较；同时比较 Content-Type，
// 并且和 Scala 里 ElasticServer(Host("somehost", None)) 一样不带认证头。
func assertESCall(t *testing.T, f *fakeES, method, uri, wantBody, wantCT string) recordedRequest {
	t.Helper()
	var found []recordedRequest
	for _, r := range f.requests() {
		if r.Method == method && r.URI == uri {
			found = append(found, r)
		}
	}
	if len(found) != 1 {
		t.Fatalf("want exactly one %s %s, got %d; all requests: %s", method, uri, len(found), describeRequests(f))
	}
	r := found[0]
	if wantBody == "" {
		if r.Body != "" {
			t.Fatalf("%s %s: want no body, got %q", method, uri, r.Body)
		}
	} else {
		got, err := jsonx.Parse([]byte(r.Body))
		if err != nil {
			t.Fatalf("%s %s: body is not JSON: %q", method, uri, r.Body)
		}
		if want := jsonx.MustParse(wantBody); !jsonx.Equal(got, want) {
			t.Fatalf("%s %s: body mismatch\n got: %s\nwant: %s", method, uri, jsonx.String(got), jsonx.String(want))
		}
	}
	if r.ContentType != wantCT {
		t.Fatalf("%s %s: Content-Type = %q, want %q", method, uri, r.ContentType, wantCT)
	}
	if r.Authorization != "" {
		t.Fatalf("%s %s: unexpected Authorization %q", method, uri, r.Authorization)
	}
	return r
}

// assertNoESCalls 断言假 ES 没有收到任何请求（参数校验失败时不应访问 ES）。
func assertNoESCalls(t *testing.T, f *fakeES) {
	t.Helper()
	if n := len(f.requests()); n != 0 {
		t.Fatalf("want no ES requests, got %d: %s", n, describeRequests(f))
	}
}

// assertESCallCount 断言假 ES 收到的请求总数。
func assertESCallCount(t *testing.T, f *fakeES, want int) {
	t.Helper()
	if n := len(f.requests()); n != want {
		t.Fatalf("want %d ES requests, got %d: %s", want, n, describeRequests(f))
	}
}

func describeRequests(f *fakeES) string {
	var parts []string
	for _, r := range f.requests() {
		parts = append(parts, r.Method+" "+r.URI)
	}
	return "[" + strings.Join(parts, ", ") + "]"
}

// 常用的 Content-Type 期望值。
const (
	noContentType   = ""
	jsonContentType = es.ContentTypeJSON
)
