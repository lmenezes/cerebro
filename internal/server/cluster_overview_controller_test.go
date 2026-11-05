package server

import (
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/controllers/ClusterOverviewControllerSpec.scala。

// Scala 原用例只是占位（"" mustEqual ""）；这里真正调用 /overview，
// fixture 复制自 internal/models/testdata/overview/cluster_without_data_*.json。
func TestClusterOverviewController(t *testing.T) {
	t.Run("return cluster_name", func(t *testing.T) {
		apis := map[string]string{
			"/_cluster/state/master_node,routing_table,blocks": "state.json",
			"/_nodes/stats/jvm,fs,os,process?human=true":       "nodes_stats.json",
			"/_stats/docs,store?ignore_unavailable=true":       "indices_stats.json",
			"/_cluster/settings":                               "settings.json",
			"/_aliases":                                        "aliases.json",
			"/_cluster/health":                                 "health.json",
			"/_nodes/_all/os,jvm?human=true":                   "nodes_info.json",
		}
		f := newFakeES(t)
		for uri, file := range apis {
			f.on("GET "+uri, 200, fixture(t, "cluster_overview/"+file))
		}
		h := testServer(t, nil).Handler()
		status, body := call(t, h, "/overview", hostBody(f.url(), ""))
		if status != 200 {
			t.Fatalf("status = %d, body: %s", status, jsonx.String(body))
		}
		assertJSON(t, jsonx.At(body, "cluster_name"), `"elasticsearch"`)
		for uri := range apis {
			assertESCall(t, f, "GET", uri, "", noContentType)
		}
		assertESCallCount(t, f, len(apis))
	})
}
