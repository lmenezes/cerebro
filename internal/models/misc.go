package models

import (
	"strings"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// Aliases 对应 models.Aliases：把 _aliases 展开成别名列表。
func Aliases(data any) (out any, err error) {
	defer recoverFormat(&err)
	obj, ok := data.(*jsonx.Object)
	if !ok {
		fail([]string{"$"})
	}
	result := []any{}
	for _, index := range obj.Keys() {
		info, _ := obj.Get(index)
		aliases := jsonx.ObjectAt(info, "aliases")
		for _, alias := range aliases.Keys() {
			props, _ := aliases.Get(alias)
			result = append(result, jsonx.Obj(
				"alias", alias,
				"index", index,
				"filter", optOrNull(props, "filter"),
				"search_routing", optOrNull(props, "search_routing"),
				"index_routing", optOrNull(props, "index_routing"),
			))
		}
	}
	return result, nil
}

// Templates 对应 templates.Templates。
func Templates(data any) (out any, err error) {
	defer recoverFormat(&err)
	obj, ok := data.(*jsonx.Object)
	if !ok {
		fail([]string{"$"})
	}
	result := make([]any, 0, obj.Len())
	for _, name := range obj.Keys() {
		t, _ := obj.Get(name)
		result = append(result, jsonx.Obj("name", name, "template", t))
	}
	return result, nil
}

// Repositories 对应 repository.Repositories：仓库页的列表。
func Repositories(data any) (out any, err error) {
	defer recoverFormat(&err)
	obj, ok := data.(*jsonx.Object)
	if !ok {
		fail([]string{"$"})
	}
	result := make([]any, 0, obj.Len())
	for _, name := range obj.Keys() {
		info, _ := obj.Get(name)
		result = append(result, jsonx.Obj(
			"name", name,
			"type", must(info, "type"),
			"settings", objOrEmpty(info, "settings"),
		))
	}
	return result, nil
}

// SnapshotRepositories 对应 snapshot.Repositories：只要仓库名。
func SnapshotRepositories(data any) any {
	obj, ok := data.(*jsonx.Object)
	if !ok {
		return []any{}
	}
	return keysAsArray(obj)
}

// SnapshotIndices 对应 snapshot.Indices。
func SnapshotIndices(data any) (out any, err error) {
	defer recoverFormat(&err)
	arr, ok := data.([]any)
	if !ok {
		fail([]string{"$"})
	}
	result := make([]any, 0, len(arr))
	for _, idx := range arr {
		name := mustStr(idx, "index")
		result = append(result, jsonx.Obj("name", name, "special", strings.HasPrefix(name, ".")))
	}
	return result, nil
}

// Snapshots 对应 snapshot.Snapshots。
func Snapshots(data any) (out any, err error) {
	defer recoverFormat(&err)
	if _, ok := data.(*jsonx.Object); !ok {
		return []any{}, nil
	}
	return mustArr(data, "snapshots"), nil
}

// ShardStats 对应 models.ShardStats：先找分片统计，找不到再找恢复信息，都没有返回 null。
func ShardStats(index, node string, shard int64, stats, recovery any) (out any, err error) {
	defer recoverFormat(&err)
	if shards, ok := jsonx.ArrayAt(stats, "indices", index, "shards", jsonx.Num(shard).String()); ok {
		for _, s := range shards {
			if mustStr(s, "routing", "node") == node {
				return s, nil
			}
		}
	}
	if recoveries, ok := jsonx.ArrayAt(recovery, index, "shards"); ok {
		for _, r := range recoveries {
			if mustStr(r, "target", "id") != node {
				continue
			}
			id, ok := jsonx.Int64(must(r, "id"))
			if !ok {
				fail([]string{"id"})
			}
			if id == shard {
				return r, nil
			}
		}
	}
	return nil, nil
}

// IndexMetadata 对应 models.IndexMetadata，用于“按已有索引创建”。
// 原实现递归找第一个 mappings/settings，集群有旧版模板时会拿到模板的；这里直接读该索引，
// 并去掉 _doc 类型层和不能显式设置的项，否则 7.x 起 ES 会拒绝建索引。
func IndexMetadata(index string, metadata any) (out any, err error) {
	defer recoverFormat(&err)
	indices := jsonx.ObjectAt(metadata, "metadata", "indices")
	var meta any
	if v, ok := indices.Get(index); ok {
		meta = v
	} else if indices.Len() > 0 {
		meta, _ = indices.Get(indices.Keys()[0])
	} else {
		fail([]string{"metadata", "indices", index})
	}
	mappings := must(meta, "mappings")
	// 集群状态里的 mapping 仍包在 _doc 类型下，7.x 起建索引不接受这一层
	if o, ok := mappings.(*jsonx.Object); ok && o.Len() == 1 && o.Keys()[0] == "_doc" {
		mappings, _ = o.Get("_doc")
	}
	return jsonx.Obj("mappings", mappings, "settings", copyableSettings(must(meta, "settings"))), nil
}

// 这些设置由 ES 生成，建新索引时显式指定会被拒绝。
var privateIndexSettings = []string{"uuid", "version", "creation_date", "creation_date_string", "provided_name", "resize", "history"}

func copyableSettings(settings any) any {
	src, ok := settings.(*jsonx.Object)
	if !ok {
		return settings
	}
	index := jsonx.ObjectAt(src, "index")
	if index == nil {
		return settings
	}
	cleaned := jsonx.NewObject()
	for _, k := range index.Keys() {
		v, _ := index.Get(k)
		cleaned.Set(k, v)
	}
	for _, k := range privateIndexSettings {
		cleaned.Delete(k)
	}
	out := jsonx.NewObject()
	for _, k := range src.Keys() {
		v, _ := src.Get(k)
		if k == "index" {
			v = cleaned
		}
		out.Set(k, v)
	}
	return out
}

// AutocompletionIndices 对应 rest.AutocompletionIndices：索引名和别名，去重。
func AutocompletionIndices(aliases any) (out any, err error) {
	defer recoverFormat(&err)
	obj, ok := aliases.(*jsonx.Object)
	if !ok {
		fail([]string{"$"})
	}
	seen := map[string]bool{}
	result := []any{}
	add := func(s string) {
		if !seen[s] {
			seen[s] = true
			result = append(result, s)
		}
	}
	for _, idx := range obj.Keys() {
		data, _ := obj.Get(idx)
		for _, a := range mustObj(data, "aliases").Keys() {
			add(a)
		}
		add(idx)
	}
	return result, nil
}

// ClusterChanges 对应 ClusterChangesDataService 的加工部分。
func ClusterChanges(aliases, nodesInfo, state any) (out any, err error) {
	defer recoverFormat(&err)
	aliasesObj, ok := aliases.(*jsonx.Object)
	if !ok {
		fail([]string{"$"})
	}
	indices := keysAsArray(aliasesObj)
	blocks := objOrEmpty(state, "blocks", "indices")
	for _, index := range blocks.Keys() {
		if jsonx.ObjectAt(blocks, index, "4") != nil {
			indices = append(indices, index)
		}
	}
	seen := map[string]bool{}
	nodes := []any{}
	for _, n := range jsonx.FindAll(nodesInfo, "name") {
		if s, ok := n.(string); ok && !seen[s] {
			seen[s] = true
			nodes = append(nodes, s)
		}
	}
	return jsonx.Obj("indices", indices, "nodes", nodes, "cluster_name", must(state, "cluster_name")), nil
}
