package server

import "testing"

// 对应 test/controllers/TemplatesControllerSpec.scala。

func TestTemplatesController(t *testing.T) {
	t.Run("return all templates", func(t *testing.T) {
		f := newFakeES(t).on("GET /_template", 200, `{
  "template_1": {"order": 0, "template": "somePattern_1*", "settings": {}, "mappings": {}, "aliases": {}},
  "template_2": {"order": 0, "template": "somePattern_2*", "settings": {}, "mappings": {}, "aliases": {}}
}`)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/templates", hostBody(f.url(), ""), 200, `[
  {"name": "template_1", "template": {"order": 0, "template": "somePattern_1*", "settings": {}, "mappings": {}, "aliases": {}}},
  {"name": "template_2", "template": {"order": 0, "template": "somePattern_2*", "settings": {}, "mappings": {}, "aliases": {}}}
]`)
		assertESCall(t, f, "GET", "/_template", "", noContentType)
	})

	t.Run("delete template", func(t *testing.T) {
		reply := `{"acknowledged": true}`
		f := newFakeES(t).on("DELETE /_template/someTemplate", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/templates/delete", hostBody(f.url(), `"name":"someTemplate"`), 200, reply)
		assertESCall(t, f, "DELETE", "/_template/someTemplate", "", noContentType)
	})

	t.Run("require template name to delete", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/templates/delete", hostBody(f.url(), ""), 400, `{"error":"Missing required parameter name"}`)
		assertNoESCalls(t, f)
	})

	t.Run("create template", func(t *testing.T) {
		template := `{"whatever": {}}`
		reply := `{"acknowledged": true}`
		f := newFakeES(t).on("PUT /_template/someTemplate", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/templates/create", hostBody(f.url(), `"name":"someTemplate","template":`+template), 200, reply)
		// 对应 Scala 桩 createTemplate("someTemplate", template, ...)
		assertESCall(t, f, "PUT", "/_template/someTemplate", template, jsonContentType)
	})

	t.Run("require template name to create", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/templates/create", hostBody(f.url(), ""), 400, `{"error":"Missing required parameter name"}`)
		assertNoESCalls(t, f)
	})

	// Scala 里定义了 requireNameTemplate 但没有登记到 s2 规格中（从未执行），这里补上
	t.Run("require template to create", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/templates/create", hostBody(f.url(), `"name":"any"`), 400, `{"error":"Missing required parameter template"}`)
		assertNoESCalls(t, f)
	})
}
