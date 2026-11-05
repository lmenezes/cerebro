package server

import "testing"

// 对应 test/controllers/ClusterChangesControllerSpec.scala。

func TestClusterChangesController(t *testing.T) {
	t.Run("return indices, nodes and cluster name", func(t *testing.T) {
		node := func(name string) string {
			return `{
      "name": "` + name + `",
      "transport_address": "192.1.1.0:9300",
      "host": "192.1.1.0",
      "ip": "192.1.1.0",
      "version": "5.4.0",
      "build_hash": "780f8c4",
      "roles": ["master", "data", "ingest"],
      "attributes": {},
      "transport": {"bound_address": ["[::]:9300"], "publish_address": "10.12.32.25:9300", "profiles": {}}
    }`
		}
		f := newFakeES(t).
			on("GET /_cluster/state/blocks", 200, `{
  "cluster_name": "elasticsearch",
  "blocks": {
    "indices": {
      "foo": {
        "4": {"description": "index closed", "retryable": false, "levels": ["read", "write"]}
      }
    }
  }
}`).
			on("GET /_nodes/transport", 200, `{
  "_nodes": {"total": 1, "successful": 1, "failed": 0},
  "cluster_name": "elasticsearch",
  "nodes": {
    "zV4lLJgjQ6y-BkIQI0IChg": `+node("foobar")+`,
    "z4LJgjQ6y-BkIQI0IChg": `+node("qux")+`
  }
}`).
			on("GET /_aliases", 200, `{"bar": {"aliases": {}}}`)
		h := testServer(t, nil).Handler()
		ensure(t, h, "/cluster_changes", hostBody(f.url(), ""), 200, `{
  "cluster_name": "elasticsearch",
  "indices": ["bar", "foo"],
  "nodes": ["foobar", "qux"]
}`)
		assertESCall(t, f, "GET", "/_cluster/state/blocks", "", noContentType)
		assertESCall(t, f, "GET", "/_nodes/transport", "", noContentType)
		assertESCall(t, f, "GET", "/_aliases", "", noContentType)
	})
}
