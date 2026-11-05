package server

import "testing"

// 对应 test/controllers/AnalysisControllerSpec.scala。

const analysisTokensReply = `{
  "tokens": [
    {"token": "foobar", "start_offset": 0, "end_offset": 3, "type": "<ALPHANUM>", "position": 0}
  ]
}`

const analysisTokensExpected = `[
  {"token": "foobar", "start_offset": 0, "end_offset": 3, "type": "<ALPHANUM>", "position": 0}
]`

func TestAnalysisController(t *testing.T) {
	t.Run("return open indices", func(t *testing.T) {
		f := newFakeES(t).on("GET /_cat/indices?format=json", 200, `[
  {"health":"green","status":"open","index":"index1","pri":"10","rep":"0","docs.count":"4330","docs.deleted":"10","store.size":"4.1mb","pri.store.size":"4.1mb"},
  {"health":"green","status":"open","index":"index2","pri":"10","rep":"0","docs.count":"1497203","docs.deleted":"5048","store.size":"860.9mb","pri.store.size":"860.9mb"}
]`)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/analysis/indices", hostBody(f.url(), ""), 200, `["index1", "index2"]`)
		assertESCall(t, f, "GET", "/_cat/indices?format=json", "", noContentType)
	})

	t.Run("return index analyzers", func(t *testing.T) {
		f := newFakeES(t).on("GET /foo/_settings", 200, `{
  "foo": {
    "settings": {
      "index": {
        "analysis": {
          "analyzer": {
            "foo_analyzer": {"filter": ["lowercase"], "tokenizer": "standard"}
          }
        }
      }
    }
  }
}`)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/analysis/analyzers", hostBody(f.url(), `"index":"foo"`), 200, `["foo_analyzer"]`)
		assertESCall(t, f, "GET", "/foo/_settings", "", noContentType)
	})

	t.Run("return index fields", func(t *testing.T) {
		// 有意差异：只支持 7.10+，mapping 没有 type 层且没有 string 类型；Scala 原 fixture 是 6.x 的 "bar" type + "string"
		f := newFakeES(t).on("GET /foo/_mapping", 200, `{
  "foo": {
    "mappings": {
      "dynamic": "false",
      "properties": {
        "name": {"type": "text", "index": false}
      }
    }
  }
}`)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/analysis/fields", hostBody(f.url(), `"index":"foo"`), 200, `["name"]`)
		assertESCall(t, f, "GET", "/foo/_mapping", "", noContentType)
	})

	t.Run("analyze by field", func(t *testing.T) {
		f := newFakeES(t).on("GET /foo/_analyze", 200, analysisTokensReply)
		h := testServer(t, nil).Handler()
		body := hostBody(f.url(), `"index":"foo","field":"bar","text":"qux"`)
		ensure(t, h, "/analysis/analyze/field", body, 200, analysisTokensExpected)
		// 对应 Scala 桩 analyzeTextByField("foo", "bar", "qux", ...)
		assertESCall(t, f, "GET", "/foo/_analyze", `{"text":"qux","field":"bar"}`, jsonContentType)
	})

	t.Run("analyze by analyzer", func(t *testing.T) {
		f := newFakeES(t).on("GET /foo/_analyze", 200, analysisTokensReply)
		h := testServer(t, nil).Handler()
		body := hostBody(f.url(), `"index":"foo","analyzer":"bar","text":"qux"`)
		ensure(t, h, "/analysis/analyze/analyzer", body, 200, analysisTokensExpected)
		// 对应 Scala 桩 analyzeTextByAnalyzer("foo", "bar", "qux", ...)
		assertESCall(t, f, "GET", "/foo/_analyze", `{"text":"qux","analyzer":"bar"}`, jsonContentType)
	})
}
