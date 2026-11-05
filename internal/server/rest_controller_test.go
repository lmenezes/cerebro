package server

import "testing"

// 对应 test/controllers/RestControllerSpec.scala。

func TestRestController(t *testing.T) {
	// Scala 用例名写的是 invoke refreshIndex，实际测的是 executeRequest
	t.Run("invoke refreshIndex", func(t *testing.T) {
		reply := `{"_shards": {"total": 10, "successful": 5, "failed": 0}}`
		// 有意差异：path 开头的斜杠会被去掉，Scala 会请求 "//someesapi"
		f := newFakeES(t).on("GET /someesapi", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/rest/request", hostBody(f.url(), `"method":"GET","path":"/someesapi"`), 200, reply)
		// 对应 Scala 桩 executeRequest("GET", "/someesapi", None, ...)：没有 data 就不带 body 和 Content-Type
		assertESCall(t, f, "GET", "/someesapi", "", noContentType)
	})

	t.Run("should throw exception if method param is missing", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/rest/request", hostBody(f.url(), `"path":"GET"`), 400, `{"error":"Missing required parameter method"}`)
		assertNoESCalls(t, f)
	})

	t.Run("should throw exception if path param is missing", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/rest/request", hostBody(f.url(), `"method":"GET"`), 400, `{"error":"Missing required parameter path"}`)
		assertNoESCalls(t, f)
	})
}
