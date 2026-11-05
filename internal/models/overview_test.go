package models

import (
	"sort"
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/models/overview/*Spec.scala，夹具在 testdata/overview/ 下。

// readOverviewFixture 读取 testdata/overview/<name>.json。
func readOverviewFixture(t *testing.T, name string) any {
	t.Helper()
	return readSpecFixture(t, "overview/"+name+".json")
}

// overviewCluster 等价 ClusterStub.apply：用一组 fixture 调用 ClusterOverview，settings 可覆盖。
func overviewCluster(t *testing.T, prefix, settings string) any {
	t.Helper()
	if settings == "" {
		settings = prefix + "_settings"
	}
	f := func(s string) any { return readOverviewFixture(t, prefix+"_"+s) }
	out, err := ClusterOverview(f("state"), f("nodes_stats"), f("indices_stats"),
		readOverviewFixture(t, settings), f("aliases"), f("health"), f("nodes_info"))
	if err != nil {
		t.Fatalf("%s: %v", prefix, err)
	}
	return out
}

func TestClusterOverview(t *testing.T) {
	clusters := map[string]any{
		"withoutData":  overviewCluster(t, "cluster_without_data", ""),
		"withData":     overviewCluster(t, "cluster_with_data", ""),
		"initializing": overviewCluster(t, "cluster_initializing_shards", ""),
		"relocating":   overviewCluster(t, "cluster_relocating_shards", ""),
		// ClusterDisabledAllocation 继承 ClusterWithData，只覆盖 clusterSettings
		"disabledAllocation": overviewCluster(t, "cluster_with_data", "cluster_disabled_allocation_settings"),
	}
	type want struct {
		cluster string
		value   any // int、string 或 bool
	}
	cases := []struct {
		name, field string
		wants       []want
	}{
		{"return cluster_name", "cluster_name", []want{
			{"withoutData", "elasticsearch"}, {"withData", "elasticsearch"}, {"initializing", "elasticsearch"}, {"relocating", "elasticsearch"}}},
		{"return number of nodes", "number_of_nodes", []want{
			{"withoutData", 2}, {"withData", 2}, {"initializing", 2}, {"relocating", 3}}},
		{"return number of active primary shards", "active_primary_shards", []want{
			{"withoutData", 0}, {"withData", 8}, {"initializing", 5}, {"relocating", 5}}},
		{"return number of active shards", "active_shards", []want{
			{"withoutData", 0}, {"withData", 11}, {"initializing", 5},
			{"relocating", 10}}}, // Scala 原文此处误查 active_primary_shards(=5)，按用例本意查 active_shards
		{"return number of relocating shards", "relocating_shards", []want{
			{"withoutData", 0}, {"withData", 0}, {"initializing", 0}, {"relocating", 2}}},
		{"return number of initializing shards", "initializing_shards", []want{
			{"withoutData", 0}, {"withData", 0}, {"initializing", 4}, {"relocating", 0}}},
		{"return number of unassigned shards", "unassigned_shards", []want{
			{"withoutData", 0}, {"withData", 0}, {"initializing", 1}, {"relocating", 0}}},
		{"return cluster doc count", "docs_count", []want{
			{"withoutData", 0}, {"withData", 3}, {"initializing", 108680}, {"relocating", 108680}}},
		{"return cluster size in bytes", "size_in_bytes", []want{
			{"withoutData", 0}, {"withData", 16184}, {"initializing", 2026271}, {"relocating", 4052542}}},
		{"return number of indices", "total_indices", []want{
			{"withoutData", 0}, {"withData", 3}, {"initializing", 1}, {"relocating", 1}}},
		{"return number of closed indices", "closed_indices", []want{
			{"withoutData", 0}, {"withData", 1}, {"initializing", 0}, {"relocating", 0}}},
		{"return number of special indices", "special_indices", []want{
			{"withoutData", 0}, {"withData", 1}, {"initializing", 0}, {"relocating", 0}}},
		{"return state of shard allocation", "shard_allocation", []want{
			{"withData", true}, {"disabledAllocation", false}}},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			for _, w := range c.wants {
				want := w.value
				if i, ok := want.(int); ok {
					want = jsonx.Num(int64(i))
				}
				got, ok := jsonx.Path(clusters[w.cluster], c.field)
				if !ok || !jsonx.Equal(got, want) {
					t.Errorf("%s.%s = %s, want %s", w.cluster, c.field, jsonx.String(got), jsonx.String(want))
				}
			}
		})
	}
}

func TestOverviewIndex(t *testing.T) {
	cases := []struct {
		name, index, routing, blocks, expected string
	}{
		{"build a healthy index", "ipsum", "index_routing_table_healthy", "", "index_healthy_expected"},
		{"build an index with relocating shards", "ipsum", "index_routing_table_relocating", "", "index_relocating_expected"},
		{"build an index with unassigned shards", "ipsum", "index_routing_table_unassigned", "", "index_unassigned_expected"},
		{"build a special index", ".ipsum", "index_routing_table_healthy", "", "index_special_expected"},
		{"build a closed index", "ipsum", "index_routing_table_healthy", "index_blocks_closed", "index_closed_expected"},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			block := jsonx.NewObject() // Json.obj()
			if c.blocks != "" {
				block = jsonx.ObjectAt(readOverviewFixture(t, c.blocks))
			}
			aliases := jsonx.ObjectAt(readOverviewFixture(t, "index_aliases"))
			got := overviewIndex(c.index, readOverviewFixture(t, "index_stats"), readOverviewFixture(t, c.routing), aliases, block)
			want := readOverviewFixture(t, c.expected)
			// Scala 期望里各节点分片顺序来自 HashMap 遍历（如 4,1,0），Go 按文档顺序，故节点内分片无序比较
			sortOverviewShards(got)
			sortOverviewShards(want)
			assertSpecJSON(t, got, want)
		})
	}
}

// sortOverviewShards 把 shards 下每个节点的分片数组按规范化文本排序，用于无序比较。
func sortOverviewShards(index any) {
	shards := jsonx.ObjectAt(index, "shards")
	for _, node := range shards.Keys() {
		v, _ := shards.Get(node)
		arr, _ := v.([]any)
		sort.Slice(arr, func(i, j int) bool { return canonicalOverviewJSON(arr[i]) < canonicalOverviewJSON(arr[j]) })
	}
}

// canonicalOverviewJSON 输出键排序后的 JSON 文本，与键顺序无关。
func canonicalOverviewJSON(v any) string {
	o, ok := v.(*jsonx.Object)
	if !ok {
		return jsonx.String(v)
	}
	keys := append([]string(nil), o.Keys()...)
	sort.Strings(keys)
	s := "{"
	for i, k := range keys {
		if i > 0 {
			s += ","
		}
		val, _ := o.Get(k)
		s += jsonx.String(k) + ":" + canonicalOverviewJSON(val)
	}
	return s + "}"
}

// setOverviewPath 设置嵌套字段，中间对象不存在时创建。
func setOverviewPath(v any, value any, keys ...string) {
	o := v.(*jsonx.Object)
	for _, k := range keys[:len(keys)-1] {
		next := jsonx.ObjectAt(o, k)
		if next == nil {
			next = jsonx.NewObject()
			o.Set(k, next)
		}
		o = next
	}
	o.Set(keys[len(keys)-1], value)
}

// adjustLegacyNodeStats 把 Scala 期望改为 Go 行为：这些 stats fixture 是 2.x 格式（无 roles、只有 os.load_average）。
func adjustLegacyNodeStats(want any) {
	setOverviewPath(want, false, "master")              // 2.x 回退已移除：stats 无 roles 数组时不再默认 master
	setOverviewPath(want, false, "data")                // 同上，不再默认 data
	setOverviewPath(want, true, "coordinating")         // 没有任何角色即 coordinating
	setOverviewPath(want, jsonx.Num(0), "load_average") // 只读 os.cpu.load_average.1m，2.x 的 os.load_average 被忽略
}

func TestOverviewNode(t *testing.T) {
	cases := []struct {
		name, info, stats, expected string
		adjust                      func(t *testing.T, stats, want any)
	}{
		{"parse a >= 7.10.0 ES node", "node_info_7_10", "node_stats_5", "node_7_10_expected",
			func(t *testing.T, stats, want any) {
				// Scala 原例误用 5.x fixture（与下一例完全相同）；这里补成 7.10+ 格式的 stats 以覆盖新逻辑
				roles, _ := jsonx.ArrayAt(readOverviewFixture(t, "node_info_7_10"), "roles")
				setOverviewPath(stats, roles, "roles")                                                           // master、data_content、ingest
				setOverviewPath(stats, jsonx.At(stats, "os", "load_average"), "os", "cpu", "load_average", "1m") // 7.x 起的位置
				setOverviewPath(want, true, "ingest")                                                            // roles 含 ingest
			}},
		{"parse a >= 5.0 ES node", "node_info_5", "node_stats_5", "node_5_expected",
			func(_ *testing.T, _, want any) { adjustLegacyNodeStats(want) }},
		{"parse a AWS nods", "node_info_aws", "aws_node_stats_5", "node_aws_expected",
			func(_ *testing.T, _, want any) { adjustLegacyNodeStats(want) }},
		{"parse a node without attributes", "node_info_no_attributes", "node_stats_5", "node_no_attributes_expected",
			func(_ *testing.T, _, want any) { adjustLegacyNodeStats(want) }},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			info := jsonx.ObjectAt(readOverviewFixture(t, c.info))
			stats := readOverviewFixture(t, c.stats)
			want := readOverviewFixture(t, c.expected)
			c.adjust(t, stats, want)
			got := overviewNode("nodeId", info, stats, "otherId")
			assertSpecJSON(t, got, want)
		})
	}
}
