package server

import "testing"

// 对应 test/controllers/IndexSettingsControllerSpec.scala。

func TestIndexSettingsController(t *testing.T) {
	t.Run("return index settings", func(t *testing.T) {
		reply := `{
  "foo": {
    "settings": {"index.auto_expand_replicas": "0-all"},
    "defaults": {
      "index.allocation.max_retries": "5",
      "index.data_path": "",
      "index.write.wait_for_active_shards": "1"
    }
  }
}`
		f := newFakeES(t).on("GET /foo/_settings?flat_settings=true&include_defaults=true", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/index_settings", hostBody(f.url(), `"index":"foo"`), 200, reply)
		assertESCall(t, f, "GET", "/foo/_settings?flat_settings=true&include_defaults=true", "", noContentType)
	})

	t.Run("update index settings", func(t *testing.T) {
		settings := `{
  "index.auto_expand_replicas": "0-all",
  "index.allocation.max_retries": "5",
  "index.data_path": "",
  "index.write.wait_for_active_shards": "1"
}`
		reply := `{"acknowledged": true}`
		f := newFakeES(t).on("PUT /foo/_settings", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/index_settings/update", hostBody(f.url(), `"index":"foo","settings":`+settings), 200, reply)
		// 对应 Scala 桩 updateIndexSettings("foo", body, ...)
		assertESCall(t, f, "PUT", "/foo/_settings", settings, jsonContentType)
	})
}
