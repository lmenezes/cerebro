package models

import (
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/models/nodes/NodeSpec.scala，夹具来自 NodeInfoData.scala / nodes/NodeStats.scala。
func TestNode(t *testing.T) {
	cases := []struct {
		name, info, stats, expected string
	}{
		{"parse a >= 5.0 ES node", "info_5", "stats_5", "expected_node_5"},
		{"parse a AWS node", "info_aws", "stats_aws_5", "expected_aws_node"},
		{"parse a node without attributes", "info_no_attributes", "stats_aws_5", "expected_no_attributes_node"},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			info := readSpecFixture(t, "nodes/"+c.info+".json")
			stats := readSpecFixture(t, "nodes/"+c.stats+".json")
			got := node("nodeId", true, info, stats)
			assertSpecJSON(t, got, readSpecFixture(t, "nodes/"+c.expected+".json"))
		})
	}
}

// Nodes 按 info 里的节点逐个调用 node，并用 _cat/master 的 id 判断当前 master。
func TestNodes(t *testing.T) {
	info := jsonx.Obj("nodes", jsonx.Obj(
		"nodeId", readSpecFixture(t, "nodes/info_5.json"),
		"otherId", readSpecFixture(t, "nodes/info_aws.json"),
	))
	stats := jsonx.Obj("nodes", jsonx.Obj(
		"nodeId", readSpecFixture(t, "nodes/stats_5.json"),
		"otherId", readSpecFixture(t, "nodes/stats_aws_5.json"),
	))
	master := jsonx.MustParse(`[{"id": "nodeId", "host": "127.0.0.1", "ip": "127.0.0.1", "node": "-qkZcMt"}]`)
	got, err := Nodes(info, stats, master)
	if err != nil {
		t.Fatal(err)
	}
	other := readSpecFixture(t, "nodes/expected_aws_node.json").(*jsonx.Object)
	other.Set("id", "otherId").Set("current_master", false)
	assertSpecJSON(t, got, []any{readSpecFixture(t, "nodes/expected_node_5.json"), other})

	// stats 里缺少某个节点时报格式错误
	if _, err := Nodes(info, jsonx.Obj("nodes", jsonx.NewObject()), master); err == nil {
		t.Error("缺少节点统计时应返回错误")
	}
}

// Go 版只读 7.x 起的 os.cpu.percent / os.cpu.load_average.1m，不再兼容 2.x 的 os.cpu_percent / os.load_average。
func TestNodeIgnoresLegacyCPUFields(t *testing.T) {
	stats := readSpecFixture(t, "nodes/stats_5.json").(*jsonx.Object)
	stats.Set("os", jsonx.MustParse(`{"cpu_percent": 7, "load_average": 1.5}`))
	got := node("nodeId", false, readSpecFixture(t, "nodes/info_5.json"), stats)
	assertSpecJSON(t, jsonx.At(got, "cpu"), jsonx.MustParse(`{"process": 2, "os": null, "load": null}`))
}
