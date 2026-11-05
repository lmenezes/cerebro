package models

import (
	"fmt"
	"strings"
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 合成一个大集群（3000 个索引，每个 5 主 1 副，6 个节点），衡量解析加加工 overview 的耗时。
func bigCluster(indices, nodes int) (state, stats, nodesStats, nodesInfo, aliases string) {
	var sb, st, al strings.Builder
	sb.WriteString(`{"cluster_name":"big","master_node":"n0","routing_table":{"indices":{`)
	st.WriteString(`{"_all":{"primaries":{"docs":{"count":1}},"total":{"store":{"size_in_bytes":1}}},"indices":{`)
	al.WriteString(`{`)
	for i := 0; i < indices; i++ {
		if i > 0 {
			sb.WriteString(",")
			st.WriteString(",")
			al.WriteString(",")
		}
		name := fmt.Sprintf("logs-2026.11.%05d", i)
		fmt.Fprintf(&sb, `%q:{"shards":{`, name)
		for s := 0; s < 5; s++ {
			if s > 0 {
				sb.WriteString(",")
			}
			fmt.Fprintf(&sb, `"%d":[{"state":"STARTED","primary":true,"node":"n%d","relocating_node":null,"shard":%d,"index":%q,"allocation_id":{"id":"abc"}},{"state":"STARTED","primary":false,"node":"n%d","relocating_node":null,"shard":%d,"index":%q,"allocation_id":{"id":"def"}}]`,
				s, s%nodes, s, name, (s+1)%nodes, s, name)
		}
		sb.WriteString(`}}`)
		fmt.Fprintf(&st, `%q:{"primaries":{"docs":{"count":1000,"deleted":0},"store":{"size_in_bytes":123456}},"total":{"store":{"size_in_bytes":246912}}}`, name)
		fmt.Fprintf(&al, `%q:{"aliases":{}}`, name)
	}
	sb.WriteString(`}},"blocks":{}}`)
	st.WriteString(`}}`)
	al.WriteString(`}`)
	var ns, ni strings.Builder
	ns.WriteString(`{"nodes":{`)
	ni.WriteString(`{"nodes":{`)
	for n := 0; n < nodes; n++ {
		if n > 0 {
			ns.WriteString(",")
			ni.WriteString(",")
		}
		fmt.Fprintf(&ns, `"n%d":{"name":"node-%d","host":"10.0.0.%d","ip":"10.0.0.%d","roles":["master","data"],"os":{"cpu":{"percent":3,"load_average":{"1m":0.5}}},"jvm":{"mem":{"heap_used_in_bytes":1,"heap_committed_in_bytes":2,"heap_used_percent":30,"heap_max_in_bytes":4}},"fs":{"total":{"total_in_bytes":100,"free_in_bytes":50}}}`, n, n, n, n)
		fmt.Fprintf(&ni, `"n%d":{"version":"9.3.2","jvm":{"version":"21"},"os":{"available_processors":8},"attributes":{}}`, n)
	}
	ns.WriteString(`}}`)
	ni.WriteString(`}}`)
	return sb.String(), st.String(), ns.String(), ni.String(), al.String()
}

func BenchmarkClusterOverview3000(b *testing.B) {
	state, stats, ns, ni, aliases := bigCluster(3000, 6)
	b.SetBytes(int64(len(state) + len(stats) + len(ns) + len(ni) + len(aliases)))
	health := `{"cluster_name":"big","status":"green","number_of_nodes":6,"active_primary_shards":15000,"active_shards":30000,"relocating_shards":0,"initializing_shards":0,"unassigned_shards":0}`
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		v := func(s string) any { return jsonx.MustParse(s) }
		out, err := ClusterOverview(v(state), v(ns), v(stats), v(`{}`), v(aliases), v(health), v(ni))
		if err != nil {
			b.Fatal(err)
		}
		if _, err := jsonx.Marshal(out); err != nil {
			b.Fatal(err)
		}
	}
}
