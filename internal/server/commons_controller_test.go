package server

import "testing"

// 对应 test/controllers/CommonsControllerSpec.scala。

func TestCommonsController(t *testing.T) {
	t.Run("return indices", func(t *testing.T) {
		f := newFakeES(t).on("GET /_cat/indices?format=json", 200, `[
  {"health":"green","status":"open","index":"index1","pri":"10","rep":"0","docs.count":"4330","docs.deleted":"10","store.size":"4.1mb","pri.store.size":"4.1mb"},
  {"health":"green","status":"closed","index":"index2","pri":"10","rep":"0","docs.count":"1497203","docs.deleted":"5048","store.size":"860.9mb","pri.store.size":"860.9mb"}
]`)
		h := testServer(t, nil).Handler()
		// 和 analysis 不同，这里关闭的索引也要返回
		ensure(t, h, "/commons/indices", hostBody(f.url(), ""), 200, `["index1", "index2"]`)
		assertESCall(t, f, "GET", "/_cat/indices?format=json", "", noContentType)
	})

	t.Run("return index mapping", func(t *testing.T) {
		reply := `{"someIndex": {"mappings": {}}}`
		f := newFakeES(t).on("GET /someIndex/_mapping", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/commons/get_index_mapping", hostBody(f.url(), `"index":"someIndex"`), 200, reply)
		assertESCall(t, f, "GET", "/someIndex/_mapping", "", noContentType)
	})

	t.Run("validate index parameter for get mapping", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/commons/get_index_mapping", hostBody(f.url(), ""), 400, `{"error":"Missing required parameter index"}`)
		assertNoESCalls(t, f)
	})

	t.Run("return index settings", func(t *testing.T) {
		reply := `{
  "someIndex": {
    "settings": {
      "index": {
        "creation_date": "1459675569309",
        "number_of_shards": "5",
        "number_of_replicas": "1",
        "uuid": "6sN-tL30Sfyz_tW0iVqVPQ",
        "version": {"created": "2030099"}
      }
    }
  }
}`
		f := newFakeES(t).on("GET /someIndex/_settings", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/commons/get_index_settings", hostBody(f.url(), `"index":"someIndex"`), 200, reply)
		assertESCall(t, f, "GET", "/someIndex/_settings", "", noContentType)
	})

	t.Run("validate index parameter for index settings", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/commons/get_index_settings", hostBody(f.url(), ""), 400, `{"error":"Missing required parameter index"}`)
		assertNoESCalls(t, f)
	})

	t.Run("return node stats", func(t *testing.T) {
		reply := fixture(t, "commons/node_stats.json")
		f := newFakeES(t).on("GET /_nodes/someNode/stats?human", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/commons/get_node_stats", hostBody(f.url(), `"node":"someNode"`), 200, reply)
		assertESCall(t, f, "GET", "/_nodes/someNode/stats?human", "", noContentType)
	})

	t.Run("validate node parameter", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/commons/get_node_stats", hostBody(f.url(), ""), 400, `{"error":"Missing required parameter node"}`)
		assertNoESCalls(t, f)
	})
}
