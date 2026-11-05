package server

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"testing/fstest"
	"time"

	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/jsonx"
	"github.com/RitterHou/cerebro/internal/store"
)

// esReply 是假 ES 对某个请求的响应。
type esReply struct {
	status int
	body   string
}

// recordedRequest 是假 ES 收到的请求。
type recordedRequest struct {
	Method, URI, Body, ContentType, Authorization string
	Header                                        http.Header
}

// fakeES 按 "METHOD /uri?query" 匹配响应，没配置的返回 404。
type fakeES struct {
	t       *testing.T
	mu      sync.Mutex
	replies map[string]esReply
	got     []recordedRequest
	srv     *httptest.Server
}

func newFakeES(t *testing.T) *fakeES {
	f := &fakeES{t: t, replies: map[string]esReply{}}
	f.srv = httptest.NewServer(http.HandlerFunc(f.serve))
	t.Cleanup(f.srv.Close)
	return f
}

// on 注册响应，key 形如 "GET /_cluster/health"（含查询串，需与请求完全一致）。
func (f *fakeES) on(key string, status int, body string) *fakeES {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.replies[key] = esReply{status, body}
	return f
}

func (f *fakeES) serve(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	key := r.Method + " " + r.URL.RequestURI()
	f.mu.Lock()
	f.got = append(f.got, recordedRequest{
		Method: r.Method, URI: r.URL.RequestURI(), Body: string(body),
		ContentType: r.Header.Get("Content-Type"), Authorization: r.Header.Get("Authorization"), Header: r.Header.Clone(),
	})
	reply, ok := f.replies[key]
	f.mu.Unlock()
	if !ok {
		w.WriteHeader(http.StatusNotFound)
		_, _ = io.WriteString(w, `{"error":"no fake reply for `+key+`"}`)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(reply.status)
	_, _ = io.WriteString(w, reply.body)
}

// requests 返回收到的请求副本。
func (f *fakeES) requests() []recordedRequest {
	f.mu.Lock()
	defer f.mu.Unlock()
	return append([]recordedRequest(nil), f.got...)
}

func (f *fakeES) url() string { return f.srv.URL }

// testServer 创建一个使用默认配置的 Server，mutate 可以改配置。
func testServer(t *testing.T, mutate func(*config.Config), opts ...func(*Options)) *Server {
	t.Helper()
	cfg := config.Default()
	cfg.DataDir = t.TempDir()
	if mutate != nil {
		mutate(cfg)
	}
	o := Options{
		Config:     cfg,
		Client:     es.NewClient(10*time.Second, "cerebro-test"),
		History:    store.Noop{},
		SessionKey: []byte("0123456789abcdef0123456789abcdef"),
		Public: fstest.MapFS{
			"js/app.js":       {Data: []byte("console.log('app')")},
			"img/favicon.png": {Data: []byte("png")},
		},
		Version: "0.10.0-test",
	}
	for _, fn := range opts {
		fn(&o)
	}
	s, err := New(o)
	if err != nil {
		t.Fatal(err)
	}
	return s
}

// post 以 JSON 调用接口，返回 HTTP 状态和解析后的响应。
func post(t *testing.T, h http.Handler, path, body string, cookies ...*http.Cookie) (int, any) {
	t.Helper()
	req := httptest.NewRequest(http.MethodPost, path, strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	for _, c := range cookies {
		req.AddCookie(c)
	}
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)
	if rec.Body.Len() == 0 {
		return rec.Code, nil
	}
	v, err := jsonx.Parse(rec.Body.Bytes())
	if err != nil {
		t.Fatalf("response is not JSON: %s", rec.Body.String())
	}
	return rec.Code, v
}

// call 调用 Cerebro 接口，断言 HTTP 200，返回 {status, body} 拆开后的值。
func call(t *testing.T, h http.Handler, path, body string, cookies ...*http.Cookie) (int, any) {
	t.Helper()
	code, v := post(t, h, path, body, cookies...)
	if code != http.StatusOK {
		t.Fatalf("%s: HTTP %d: %s", path, code, jsonx.String(v))
	}
	status, ok := jsonx.Int64(jsonx.At(v, "status"))
	if !ok {
		t.Fatalf("%s: missing status in %s", path, jsonx.String(v))
	}
	return int(status), jsonx.At(v, "body")
}

// assertJSON 用 Play 的相等语义比较。
func assertJSON(t *testing.T, got any, want string) {
	t.Helper()
	w := jsonx.MustParse(want)
	if !jsonx.Equal(got, w) {
		t.Fatalf("JSON mismatch\n got: %s\nwant: %s", jsonx.String(got), jsonx.String(w))
	}
}

// hostBody 生成带 host 的请求 body。
func hostBody(esURL string, extra string) string {
	if extra == "" {
		return `{"host":"` + esURL + `"}`
	}
	return `{"host":"` + esURL + `",` + extra + `}`
}
