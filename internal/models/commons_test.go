package models

import (
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/models/commons/NodesSpec.scala：return all nodes。
func TestCommonsNodes(t *testing.T) {
	data := jsonx.MustParse(`
[
  {
    "host": "12.8.17.5",
    "ip": "12.8.17.5",
    "heap.percent": "8",
    "ram.percent": "95",
    "load": "0.19",
    "node.role": "d",
    "master": "*",
    "name": "Node 1"
  },
  {
    "host": "12.8.17.7",
    "ip": "12.8.17.7",
    "heap.percent": "8",
    "ram.percent": "95",
    "load": "0.19",
    "node.role": "d",
    "master": "*",
    "name": "Node 2"
  }
]`)
	assertSpecJSON(t, CommonsNodes(data), []any{"Node 1", "Node 2"})
}

// 对应 test/models/commons/IndicesSpec.scala：return all indices。
func TestCommonsIndices(t *testing.T) {
	data := jsonx.MustParse(`
[
  {
    "health": "yellow",
    "status": "open",
    "index": "some_index",
    "pri": "5",
    "rep": "1",
    "docs.count": "0",
    "docs.deleted": "0",
    "store.size": "795b",
    "pri.store.size": "795b"
  },
  {
    "health": null,
    "status": "close",
    "index": "some_other_index",
    "pri": null,
    "rep": null,
    "docs.count": null,
    "docs.deleted": null,
    "store.size": null,
    "pri.store.size": null
  }
]`)
	assertSpecJSON(t, CommonsIndices(data), []any{"some_index", "some_other_index"})
}

// 新行为：7.10 起的数据层角色（含 data_frozen）都算 data 节点。
func TestRoles(t *testing.T) {
	cases := []struct {
		name string
		info any
		want NodeRoles
	}{
		{"data", jsonx.MustParse(`{"roles": ["data"]}`), NodeRoles{Data: true}},
		{"data_content", jsonx.MustParse(`{"roles": ["data_content"]}`), NodeRoles{Data: true}},
		{"data_hot", jsonx.MustParse(`{"roles": ["data_hot"]}`), NodeRoles{Data: true}},
		{"data_warm", jsonx.MustParse(`{"roles": ["data_warm"]}`), NodeRoles{Data: true}},
		{"data_cold", jsonx.MustParse(`{"roles": ["data_cold"]}`), NodeRoles{Data: true}},
		// Scala 版的数据角色列表漏了 data_frozen
		{"data_frozen", jsonx.MustParse(`{"roles": ["data_frozen"]}`), NodeRoles{Data: true}},
		{"7.10 节点信息", readSpecFixture(t, "nodes/info_7_10.json"), NodeRoles{Master: true, Data: true, Ingest: true}},
		{"master + ingest", jsonx.MustParse(`{"roles": ["master", "ingest", "ml"]}`), NodeRoles{Master: true, Ingest: true}},
		{"仅协调节点", jsonx.MustParse(`{"roles": []}`), NodeRoles{}},
		{"非 data/master/ingest 角色", jsonx.MustParse(`{"roles": ["ml", "remote_cluster_client", "transform"]}`), NodeRoles{}},
		// 去掉了 2.x 的 attributes.master/data/client 兜底：没有 roles 就没有任何角色（Scala 会默认 master+data）
		{"没有 roles 字段", jsonx.MustParse(`{"attributes": {"master": "true", "data": "true"}}`), NodeRoles{}},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got := Roles(c.info)
			if got != c.want {
				t.Errorf("Roles = %+v, want %+v", got, c.want)
			}
			if got.Coordinating() != (!c.want.Master && !c.want.Data && !c.want.Ingest) {
				t.Errorf("Coordinating = %v", got.Coordinating())
			}
		})
	}
}

// Attrs 去掉内部属性（含 8.x/9.x 新增的 ml.* / transform.*），保留其余属性及顺序。
func TestAttrs(t *testing.T) {
	info := jsonx.MustParse(`{"attributes": {
  "ml.machine_memory": "17179869184",
  "xpack.installed": "true",
  "transform.node": "true",
  "ml.max_open_jobs": "512",
  "ml.allocated_processors": "4",
  "ml.allocated_processors_double": "4.0",
  "ml.max_jvm_size": "1073741824",
  "ml.config_version": "12.0.0",
  "transform.config_version": "10.0.0",
  "node_type": "warm",
  "rack": "r1"
}}`)
	got := Attrs(info)
	assertSpecJSON(t, got, jsonx.MustParse(`{"node_type": "warm", "rack": "r1"}`))
	if keys := got.Keys(); len(keys) != 2 || keys[0] != "node_type" || keys[1] != "rack" {
		t.Errorf("键顺序 = %v", keys)
	}
	// 没有 attributes 时返回空对象而不是 null
	assertSpecJSON(t, Attrs(jsonx.MustParse(`{}`)), jsonx.NewObject())
}
