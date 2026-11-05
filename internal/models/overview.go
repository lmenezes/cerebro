package models

import (
	"encoding/json"
	"strconv"
	"strings"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// ClusterOverview 对应 overview.ClusterOverview。
func ClusterOverview(clusterState, nodesStats, indicesStats, clusterSettings, aliases, clusterHealth, nodesInfo any) (out any, err error) {
	defer recoverFormat(&err)
	indices := buildIndices(clusterState, indicesStats, aliases)
	masterNodeID := mustStr(clusterState, "master_node")

	allocation := "all"
	if s, ok := jsonx.StringAt(clusterSettings, "persistent", "cluster", "routing", "allocation", "enable"); ok {
		allocation = s
	}
	if s, ok := jsonx.StringAt(clusterSettings, "transient", "cluster", "routing", "allocation", "enable"); ok {
		allocation = s
	}

	closed, special := 0, 0
	for _, idx := range indices {
		if b, _ := jsonx.At(idx, "closed").(bool); b {
			closed++
		}
		if b, _ := jsonx.At(idx, "special").(bool); b {
			special++
		}
	}

	healthStr := func(k string) string { return mustStr(clusterHealth, k) }
	return jsonx.Obj(
		"cluster_name", healthStr("cluster_name"),
		"status", healthStr("status"),
		"number_of_nodes", mustNum(clusterHealth, "number_of_nodes"),
		"active_primary_shards", mustNum(clusterHealth, "active_primary_shards"),
		"active_shards", mustNum(clusterHealth, "active_shards"),
		"relocating_shards", mustNum(clusterHealth, "relocating_shards"),
		"initializing_shards", mustNum(clusterHealth, "initializing_shards"),
		"unassigned_shards", mustNum(clusterHealth, "unassigned_shards"),
		"docs_count", numOrZero(indicesStats, "_all", "primaries", "docs", "count"),
		"size_in_bytes", numOrZero(indicesStats, "_all", "total", "store", "size_in_bytes"),
		"total_indices", jsonx.Num(int64(len(indices))),
		"closed_indices", jsonx.Num(int64(closed)),
		"special_indices", jsonx.Num(int64(special)),
		"indices", indices,
		"nodes", buildOverviewNodes(masterNodeID, nodesInfo, nodesStats),
		"shard_allocation", allocation == "all",
	), nil
}

func buildOverviewNodes(masterNodeID string, nodesInfo, nodesStats any) []any {
	stats := mustObj(nodesStats, "nodes")
	out := make([]any, 0, stats.Len())
	for _, id := range stats.Keys() {
		s, _ := stats.Get(id)
		info := mustObj(nodesInfo, "nodes", id)
		out = append(out, overviewNode(id, info, s, masterNodeID))
	}
	return out
}

func buildIndices(clusterState, indicesStats, aliases any) []any {
	routing := mustObj(clusterState, "routing_table", "indices")
	blocks := objOrEmpty(clusterState, "blocks", "indices")
	stats := objOrEmpty(indicesStats, "indices")
	out := make([]any, 0, routing.Len())
	for _, name := range routing.Keys() {
		shards, _ := routing.Get(name)
		indexStats := objOrEmpty(stats, name)
		indexBlock := objOrEmpty(blocks, name)
		indexAliases := objOrEmpty(aliases, name, "aliases")
		out = append(out, overviewIndex(name, indexStats, shards, indexAliases, indexBlock))
	}
	// 7.x 以下关闭的索引不在 routing_table 里，保留这段以防万一
	for _, name := range blocks.Keys() {
		b, _ := blocks.Get(name)
		if !routing.Has(name) && jsonx.ObjectAt(b).Has("4") {
			out = append(out, closedIndex(name))
		}
	}
	return out
}

func closedIndex(name string) any {
	return jsonx.Obj("name", name, "closed", true, "special", strings.HasPrefix(name, "."))
}

func overviewIndex(name string, stats any, routingTable any, aliases, block *jsonx.Object) any {
	shardMap, unhealthy := createShardMap(routingTable)
	shards := mustObj(routingTable, "shards")
	maxShard := int64(-1)
	for _, k := range shards.Keys() {
		n, err := strconv.ParseInt(k, 10, 32)
		if err != nil {
			fail([]string{"shards", k})
		}
		maxShard = max(maxShard, n)
	}
	if maxShard < 0 {
		fail([]string{"shards"})
	}
	return jsonx.Obj(
		"name", name,
		"closed", block.Has("4"),
		"special", strings.HasPrefix(name, "."),
		"unhealthy", unhealthy,
		"doc_count", numOrZero(stats, "primaries", "docs", "count"),
		"deleted_docs", numOrZero(stats, "primaries", "docs", "deleted"),
		"size_in_bytes", numOrZero(stats, "primaries", "store", "size_in_bytes"),
		"total_size_in_bytes", numOrZero(stats, "total", "store", "size_in_bytes"),
		"aliases", keysAsArray(aliases),
		"num_shards", jsonx.Num(maxShard+1),
		"num_replicas", jsonx.Num(int64(len(mustArr(routingTable, "shards", "0"))-1)),
		"shards", shardMap,
	)
}

// createShardMap 按节点分组分片，未分配的放在 "unassigned" 下；迁移中的分片在目标节点补一个 INITIALIZING 副本。
func createShardMap(routingTable any) (*jsonx.Object, bool) {
	out := jsonx.NewObject()
	unhealthy := false
	add := func(node string, shard any) {
		cur, _ := out.Get(node)
		arr, _ := cur.([]any)
		out.Set(node, append(arr, shard))
		if mustStr(shard, "state") != "STARTED" {
			unhealthy = true
		}
	}
	shards := mustObj(routingTable, "shards")
	for _, k := range shards.Keys() {
		list, _ := shards.Get(k)
		arr, ok := list.([]any)
		if !ok {
			fail([]string{"shards", k})
		}
		for _, shard := range arr {
			node, ok := jsonx.StringAt(shard, "node")
			if !ok {
				node = "unassigned"
			}
			add(node, shard)
			if target, ok := jsonx.StringAt(shard, "relocating_node"); ok {
				add(target, jsonx.Obj(
					"node", target,
					"index", must(shard, "index"),
					"state", "INITIALIZING",
					"shard", must(shard, "shard"),
					"primary", false,
				))
			}
		}
	}
	return out, unhealthy
}

func overviewNode(id string, info *jsonx.Object, stats any, masterNodeID string) any {
	roles := Roles(stats)
	return jsonx.Obj(
		"id", id,
		"current_master", id == masterNodeID,
		"name", mustStr(stats, "name"),
		"host", optStrOrNull(stats, "host"),
		"ip", optStrOrNull(stats, "ip"),
		"es_version", mustStr(info, "version"),
		"jvm_version", optStrOrNull(info, "jvm", "version"),
		"load_average", numOrZero(stats, "os", "cpu", "load_average", "1m"),
		"available_processors", mustNum(info, "os", "available_processors"),
		"cpu_percent", intOrZero(stats, "os", "cpu", "percent"),
		"master", roles.Master,
		"data", roles.Data,
		"coordinating", roles.Coordinating(),
		"ingest", roles.Ingest,
		"heap", jsonx.Obj(
			"used", mustNum(stats, "jvm", "mem", "heap_used_in_bytes"),
			"committed", mustNum(stats, "jvm", "mem", "heap_committed_in_bytes"),
			"used_percent", mustNum(stats, "jvm", "mem", "heap_used_percent"),
			"max", mustNum(stats, "jvm", "mem", "heap_max_in_bytes"),
		),
		"disk", overviewDisk(stats),
		"attributes", Attrs(info),
	)
}

func intOrZero(v any, keys ...string) json.Number {
	if i, ok := int64At(v, keys...); ok {
		return jsonx.Num(i)
	}
	return json.Number("0")
}

func overviewDisk(stats any) any {
	total, _ := int64At(stats, "fs", "total", "total_in_bytes")
	free, _ := int64At(stats, "fs", "total", "free_in_bytes")
	used := 100 - f32ToInt(100*(float32(free)/float32(total)))
	return jsonx.Obj("total", jsonx.Num(total), "free", jsonx.Num(free), "used_percent", jsonx.Num(used))
}
