package server

import "testing"

// 对应 test/controllers/ClusterSettingsControllerSpec.scala。

func TestClusterSettingsController(t *testing.T) {
	t.Run("return cluster settings", func(t *testing.T) {
		reply := `{"persistent": {}, "transient": {}}`
		f := newFakeES(t).on("GET /_cluster/settings?flat_settings=true&include_defaults=true", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/cluster_settings", hostBody(f.url(), ""), 200, reply)
		assertESCall(t, f, "GET", "/_cluster/settings?flat_settings=true&include_defaults=true", "", noContentType)
	})

	t.Run("update cluster settings", func(t *testing.T) {
		settings := `{"persistent": {}, "transient": {}}`
		reply := `{"acknowledged": true, "persistent": {}, "transient": {}}`
		f := newFakeES(t).on("PUT /_cluster/settings", 200, reply)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/cluster_settings/save", hostBody(f.url(), `"settings":`+settings), 200, reply)
		// 对应 Scala 桩 saveClusterSettings(body, ...)
		assertESCall(t, f, "PUT", "/_cluster/settings", settings, jsonContentType)
	})

	t.Run("require settings to update", func(t *testing.T) {
		f := newFakeES(t)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/cluster_settings/save", hostBody(f.url(), ""), 400, `{"error":"Missing required parameter settings"}`)
		assertNoESCalls(t, f)
	})
}
