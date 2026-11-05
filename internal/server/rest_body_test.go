package server

import "testing"

// 编辑器默认的 {} 不作为 body 发送，非空 body 和 NDJSON 照常发送。
func TestRestRequestEmptyObjectBody(t *testing.T) {
	f := newFakeES(t).
		on("GET /_cluster/health", 200, `{"status":"green"}`).
		on("POST /_search", 200, `{"hits":{}}`).
		on("POST /_bulk", 200, `{"errors":false}`)
	h := testServer(t, nil).Handler()
	cases := []struct{ body, method, path, wantBody, wantCT string }{
		{`"method":"GET","path":"_cluster/health","data":{}`, "GET", "/_cluster/health", "", ""},
		{`"method":"POST","path":"_search","data":{"size":1}`, "POST", "/_search", `{"size":1}`, "application/json"},
		{`"method":"POST","path":"_bulk","data":"{\"index\":{}}\n{}\n"`, "POST", "/_bulk", "{\"index\":{}}\n{}\n", "application/x-ndjson"},
	}
	for i, c := range cases {
		if status, _ := call(t, h, "/rest/request", hostBody(f.url(), c.body)); status != 200 {
			t.Fatalf("case %d: status %d", i, status)
		}
		got := f.requests()[i]
		if got.Method != c.method || got.URI != c.path || got.Body != c.wantBody || got.ContentType != c.wantCT {
			t.Errorf("case %d: got %+v", i, got)
		}
	}
}
