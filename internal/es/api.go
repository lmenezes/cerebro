package es

import (
	"context"
	"net/url"
	"strings"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// API 封装 Cerebro 用到的 ES 接口，路径与 Scala 版 HTTPElasticClient 一致。
type API struct {
	*Client
}

func enc(s string) string { return url.PathEscape(s) }

func (a API) get(ctx context.Context, t *Target, uri string) (*Response, error) {
	return a.Do(ctx, t, "GET", uri, nil, "")
}

func (a API) send(ctx context.Context, t *Target, method, uri string, body any) (*Response, error) {
	var raw []byte
	if body != nil {
		b, err := jsonx.Marshal(body)
		if err != nil {
			return nil, err
		}
		raw = b
	}
	ct := ""
	if raw != nil {
		ct = ContentTypeJSON
	}
	return a.Do(ctx, t, method, uri, raw, ct)
}

// postEmpty 发不带 body 但声明 JSON 类型的 POST，同原实现。
func (a API) postEmpty(ctx context.Context, t *Target, uri string) (*Response, error) {
	return a.Do(ctx, t, "POST", uri, []byte{}, ContentTypeJSON)
}

func (a API) ClusterHealth(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_cluster/health")
}

func (a API) Nodes(ctx context.Context, t *Target, flags ...string) (*Response, error) {
	return a.get(ctx, t, "/_nodes/_all/"+strings.Join(flags, ",")+"?human=true")
}

func (a API) NodesStats(ctx context.Context, t *Target, stats ...string) (*Response, error) {
	return a.get(ctx, t, "/_nodes/stats/"+strings.Join(stats, ",")+"?human=true")
}

func (a API) NodeStats(ctx context.Context, t *Target, node string) (*Response, error) {
	return a.get(ctx, t, "/_nodes/"+enc(node)+"/stats?human")
}

func (a API) IndexStats(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.get(ctx, t, "/"+enc(index)+"/_stats?human=true")
}

func (a API) CloseIndex(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.postEmpty(ctx, t, "/"+enc(index)+"/_close")
}

func (a API) OpenIndex(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.postEmpty(ctx, t, "/"+enc(index)+"/_open")
}

func (a API) RefreshIndex(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.postEmpty(ctx, t, "/"+enc(index)+"/_refresh")
}

func (a API) FlushIndex(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.postEmpty(ctx, t, "/"+enc(index)+"/_flush")
}

func (a API) ForceMerge(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.postEmpty(ctx, t, "/"+enc(index)+"/_forcemerge")
}

func (a API) ClearIndexCache(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.postEmpty(ctx, t, "/"+enc(index)+"/_cache/clear")
}

func (a API) DeleteIndex(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.Do(ctx, t, "DELETE", "/"+enc(index), nil, "")
}

func (a API) IndexSettings(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.get(ctx, t, "/"+enc(index)+"/_settings")
}

func (a API) IndexSettingsFlat(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.get(ctx, t, "/"+enc(index)+"/_settings?flat_settings=true&include_defaults=true")
}

func (a API) IndexMapping(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.get(ctx, t, "/"+enc(index)+"/_mapping")
}

func (a API) PutClusterSettings(ctx context.Context, t *Target, settings any) (*Response, error) {
	return a.send(ctx, t, "PUT", "/_cluster/settings", settings)
}

func allocation(value string) any {
	return jsonx.Obj("transient", jsonx.Obj("cluster", jsonx.Obj("routing", jsonx.Obj("allocation", jsonx.Obj("enable", value)))))
}

func (a API) EnableShardAllocation(ctx context.Context, t *Target) (*Response, error) {
	return a.PutClusterSettings(ctx, t, allocation("all"))
}

func (a API) DisableShardAllocation(ctx context.Context, t *Target, kind string) (*Response, error) {
	return a.PutClusterSettings(ctx, t, allocation(kind))
}

func (a API) ShardStats(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.get(ctx, t, "/"+enc(index)+"/_stats?level=shards&human=true")
}

func (a API) IndexRecovery(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.get(ctx, t, "/"+enc(index)+"/_recovery?active_only=true&human=true")
}

func (a API) RelocateShard(ctx context.Context, t *Target, shard int64, index, from, to string) (*Response, error) {
	move := jsonx.Obj("shard", jsonx.Num(shard), "index", index, "from_node", from, "to_node", to)
	return a.send(ctx, t, "POST", "/_cluster/reroute", jsonx.Obj("commands", []any{jsonx.Obj("move", move)}))
}

func (a API) Aliases(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_aliases")
}

func (a API) UpdateAliases(ctx context.Context, t *Target, actions []any) (*Response, error) {
	return a.send(ctx, t, "POST", "/_aliases", jsonx.Obj("actions", actions))
}

func (a API) IndexMetadata(ctx context.Context, t *Target, index string) (*Response, error) {
	return a.get(ctx, t, "/_cluster/state/metadata/"+enc(index)+"?human=true")
}

func (a API) CreateIndex(ctx context.Context, t *Target, index string, metadata any) (*Response, error) {
	return a.send(ctx, t, "PUT", "/"+enc(index), metadata)
}

func (a API) CatIndices(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_cat/indices?format=json")
}

func (a API) CatNodes(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_cat/nodes?format=json")
}

func (a API) CatMaster(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_cat/master?format=json")
}

// Cat 调用任意 _cat 接口，api 由前端给出（如 "indices"）。
func (a API) Cat(ctx context.Context, t *Target, api string) (*Response, error) {
	return a.get(ctx, t, "/_cat/"+api+"?format=json")
}

func (a API) Templates(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_template")
}

func (a API) CreateTemplate(ctx context.Context, t *Target, name string, template any) (*Response, error) {
	return a.send(ctx, t, "PUT", "/_template/"+enc(name), template)
}

func (a API) DeleteTemplate(ctx context.Context, t *Target, name string) (*Response, error) {
	return a.Do(ctx, t, "DELETE", "/_template/"+enc(name), nil, "")
}

func (a API) AnalyzeByField(ctx context.Context, t *Target, index, field, text string) (*Response, error) {
	return a.send(ctx, t, "GET", "/"+enc(index)+"/_analyze", jsonx.Obj("text", text, "field", field))
}

func (a API) AnalyzeByAnalyzer(ctx context.Context, t *Target, index, analyzer, text string) (*Response, error) {
	return a.send(ctx, t, "GET", "/"+enc(index)+"/_analyze", jsonx.Obj("text", text, "analyzer", analyzer))
}

func (a API) ClusterSettingsAll(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_cluster/settings?flat_settings=true&include_defaults=true")
}

func (a API) Repositories(ctx context.Context, t *Target) (*Response, error) {
	return a.get(ctx, t, "/_snapshot")
}

func (a API) CreateRepository(ctx context.Context, t *Target, name, repoType string, settings any) (*Response, error) {
	return a.send(ctx, t, "PUT", "/_snapshot/"+enc(name), jsonx.Obj("type", repoType, "settings", settings))
}

func (a API) DeleteRepository(ctx context.Context, t *Target, name string) (*Response, error) {
	return a.Do(ctx, t, "DELETE", "/_snapshot/"+enc(name), nil, "")
}

func (a API) Snapshots(ctx context.Context, t *Target, repository string) (*Response, error) {
	return a.get(ctx, t, "/_snapshot/"+enc(repository)+"/_all")
}

func (a API) DeleteSnapshot(ctx context.Context, t *Target, repository, snapshot string) (*Response, error) {
	return a.Do(ctx, t, "DELETE", "/_snapshot/"+enc(repository)+"/"+enc(snapshot), nil, "")
}

// CreateSnapshot 用 ES 认识的参数名（原实现传的是 camelCase，ES 会忽略）。
func (a API) CreateSnapshot(ctx context.Context, t *Target, repository, snapshot string, ignoreUnavailable, includeGlobalState bool, indices *string) (*Response, error) {
	body := jsonx.Obj("ignore_unavailable", ignoreUnavailable, "include_global_state", includeGlobalState)
	if indices != nil {
		body.Set("indices", *indices)
	}
	return a.send(ctx, t, "PUT", "/_snapshot/"+enc(repository)+"/"+enc(snapshot), body)
}

// RestoreOptions 是恢复快照的参数。
type RestoreOptions struct {
	RenamePattern, RenameReplacement, Indices             *string
	IgnoreUnavailable, IncludeAliases, IncludeGlobalState bool
}

func (a API) RestoreSnapshot(ctx context.Context, t *Target, repository, snapshot string, o RestoreOptions) (*Response, error) {
	body := jsonx.Obj(
		"ignore_unavailable", o.IgnoreUnavailable,
		"include_global_state", o.IncludeGlobalState,
		"include_aliases", o.IncludeAliases,
	)
	if o.Indices != nil {
		body.Set("indices", *o.Indices)
	}
	if o.RenamePattern != nil {
		body.Set("rename_pattern", *o.RenamePattern)
	}
	if o.RenameReplacement != nil {
		body.Set("rename_replacement", *o.RenameReplacement)
	}
	return a.send(ctx, t, "POST", "/_snapshot/"+enc(repository)+"/"+enc(snapshot)+"/_restore", body)
}

func (a API) UpdateIndexSettings(ctx context.Context, t *Target, index string, settings any) (*Response, error) {
	return a.send(ctx, t, "PUT", "/"+enc(index)+"/_settings", settings)
}

// Execute 是 REST 页面的任意请求：data 为字符串时按 NDJSON（bulk/msearch）原样发送。
func (a API) Execute(ctx context.Context, t *Target, method, path string, data any, hasData bool) (*Response, error) {
	uri := "/" + strings.TrimLeft(path, "/")
	if !hasData {
		return a.Do(ctx, t, method, uri, nil, "")
	}
	if s, ok := data.(string); ok {
		return a.Do(ctx, t, method, uri, []byte(s), ContentTypeNDJSON)
	}
	b, err := jsonx.Marshal(data)
	if err != nil {
		return nil, err
	}
	return a.Do(ctx, t, method, uri, b, ContentTypeJSON)
}
