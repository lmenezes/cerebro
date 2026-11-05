package server

import "testing"

// 对应 test/controllers/AliasesControllerSpec.scala：Scala 里是空类，
// 这里按 app/controllers/AliasesController.scala 的行为补两个基本用例。

func TestAliasesController(t *testing.T) {
	t.Run("return aliases", func(t *testing.T) {
		f := newFakeES(t).on("GET /_aliases", 200, `{
  "foo": {"aliases": {"bar": {"filter": {"term": {"user": "x"}}, "index_routing": "1"}}},
  "baz": {"aliases": {}}
}`)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/aliases/get_aliases", hostBody(f.url(), ""), 200, `[
  {"alias": "bar", "index": "foo", "filter": {"term": {"user": "x"}}, "search_routing": null, "index_routing": "1"}
]`)
		assertESCall(t, f, "GET", "/_aliases", "", noContentType)
	})

	t.Run("update aliases", func(t *testing.T) {
		changes := `[{"add": {"index": "foo", "alias": "bar"}}, {"remove": {"index": "foo", "alias": "qux"}}]`
		reply := `{"acknowledged": true}`
		f := newFakeES(t).on("POST /_aliases", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/aliases/update_aliases", hostBody(f.url(), `"changes":`+changes), 200, reply)
		assertESCall(t, f, "POST", "/_aliases", `{"actions":`+changes+`}`, jsonContentType)
	})
}
