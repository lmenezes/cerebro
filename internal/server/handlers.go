package server

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/jsonx"
	"github.com/RitterHou/cerebro/internal/models"
	"github.com/RitterHou/cerebro/internal/store"
)

func (s *Server) routes(mux *http.ServeMux) {
	p := func(pattern string, kind routeKind, fn handlerFunc) {
		mux.Handle("POST "+pattern, s.process(kind, fn))
	}
	// 页面、登录、静态资源
	mux.HandleFunc("GET /{$}", s.index)
	mux.HandleFunc("GET /login", s.loginPage)
	mux.HandleFunc("POST /auth/login", s.login)
	mux.HandleFunc("POST /auth/logout", s.logout)
	mux.HandleFunc("GET /auth/oidc/start", s.oidcStart)
	mux.HandleFunc("GET /auth/oidc/callback", s.oidcCallback)
	mux.HandleFunc("GET /healthz", s.healthz)
	mux.Handle("GET /public/", http.StripPrefix("/public", s.assets))
	mux.Handle("GET /", s.assets)

	// Aliases
	p("/aliases/get_aliases", readRoute, s.getAliases)
	p("/aliases/update_aliases", writeRoute, s.updateAliases)

	// Rest：只读模式下的拦截在 restRequest 里按 method 判断
	p("/rest/history", readRoute, s.restHistory)
	p("/rest/request", readRoute, s.restRequest)
	p("/rest", readRoute, s.restIndex)

	// Overview
	p("/overview", readRoute, s.overview)
	p("/overview/disable_shard_allocation", writeRoute, s.disableShardAllocation)
	p("/overview/enable_shard_allocation", writeRoute, s.enableShardAllocation)
	p("/overview/close_indices", writeRoute, s.indicesAction(s.api.CloseIndex))
	p("/overview/open_indices", writeRoute, s.indicesAction(s.api.OpenIndex))
	p("/overview/force_merge", writeRoute, s.indicesAction(s.api.ForceMerge))
	p("/overview/clear_indices_cache", writeRoute, s.indicesAction(s.api.ClearIndexCache))
	p("/overview/refresh_indices", writeRoute, s.indicesAction(s.api.RefreshIndex))
	p("/overview/flush_indices", writeRoute, s.indicesAction(s.api.FlushIndex))
	p("/overview/delete_indices", writeRoute, s.indicesAction(s.api.DeleteIndex))
	p("/overview/get_shard_stats", readRoute, s.getShardStats)
	p("/overview/relocate_shard", writeRoute, s.relocateShard)

	p("/nodes", readRoute, s.nodes)
	p("/navbar", readRoute, s.navbar)

	// Analysis
	p("/analysis/indices", readRoute, s.analysisIndices)
	p("/analysis/analyzers", readRoute, s.analysisAnalyzers)
	p("/analysis/fields", readRoute, s.analysisFields)
	p("/analysis/analyze/analyzer", readRoute, s.analyzeByAnalyzer)
	p("/analysis/analyze/field", readRoute, s.analyzeByField)

	p("/cluster_changes", readRoute, s.clusterChanges)

	// Commons
	p("/commons/indices", readRoute, s.commonsIndices)
	p("/commons/nodes", readRoute, s.commonsNodes)
	p("/commons/get_index_settings", readRoute, s.indexArg(s.api.IndexSettings))
	p("/commons/get_index_mapping", readRoute, s.indexArg(s.api.IndexMapping))
	p("/commons/get_node_stats", readRoute, s.getNodeStats)
	p("/commons/get_index_stats", readRoute, s.indexArg(s.api.IndexStats))

	// Create index
	p("/create_index/get_index_metadata", readRoute, s.getIndexMetadata)
	p("/create_index/create", writeRoute, s.createIndex)

	// Templates
	p("/templates", readRoute, s.templates)
	p("/templates/delete", writeRoute, s.deleteTemplate)
	p("/templates/create", writeRoute, s.createTemplate)

	// Cluster / index settings
	p("/cluster_settings", readRoute, s.clusterSettings)
	p("/cluster_settings/save", writeRoute, s.saveClusterSettings)
	p("/index_settings", readRoute, s.indexArg(s.api.IndexSettingsFlat))
	p("/index_settings/update", writeRoute, s.updateIndexSettings)

	// Connect
	mux.HandleFunc("GET /connect/hosts", s.connectHosts)
	mux.HandleFunc("POST /connect", s.connect)

	// Repositories / snapshots
	p("/repositories", readRoute, s.repositories)
	p("/repositories/create", writeRoute, s.createRepository)
	p("/repositories/delete", writeRoute, s.deleteRepository)
	p("/snapshots", readRoute, s.snapshots)
	p("/snapshots/load", readRoute, s.loadSnapshots)
	p("/snapshots/create", writeRoute, s.createSnapshot)
	p("/snapshots/delete", writeRoute, s.deleteSnapshot)
	p("/snapshots/restore", writeRoute, s.restoreSnapshot)

	p("/cat", readRoute, s.cat)

	s.featureRoutes(p)
}

type indexFn func(ctx context.Context, t *es.Target, index string) (*es.Response, error)

// indicesAction 是 overview 里对 indices 参数做操作的一组接口。
func (s *Server) indicesAction(fn indexFn) handlerFunc {
	return func(ctx context.Context, r *cerebroRequest) (int, any, error) {
		indices, err := r.get("indices")
		if err != nil {
			return 0, nil, err
		}
		return passthrough(fn(ctx, r.target, indices))
	}
}

// indexArg 是只带 index 参数、原样透传的接口。
func (s *Server) indexArg(fn indexFn) handlerFunc {
	return func(ctx context.Context, r *cerebroRequest) (int, any, error) {
		index, err := r.get("index")
		if err != nil {
			return 0, nil, err
		}
		return passthrough(fn(ctx, r.target, index))
	}
}

// ---------- Aliases ----------

func (s *Server) getAliases(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.Aliases(ctx, r.target)
	return esResult(resp, err, models.Aliases)
}

func (s *Server) updateAliases(ctx context.Context, r *cerebroRequest) (int, any, error) {
	changes, _ := jsonx.ArrayAt(r.body, "changes")
	if changes == nil {
		changes = []any{}
	}
	return passthrough(s.api.UpdateAliases(ctx, r.target, changes))
}

// ---------- Rest ----------

func (s *Server) restRequest(ctx context.Context, r *cerebroRequest) (int, any, error) {
	method, err := r.get("method")
	if err != nil {
		return 0, nil, err
	}
	method = strings.ToUpper(method)
	path, err := r.get("path")
	if err != nil {
		return 0, nil, err
	}
	if r.readOnly && (method != http.MethodGet || getHasSideEffects(path)) {
		return http.StatusForbidden, errorBody(readOnlyMessage), nil
	}
	data, hasData := r.getAny("data")
	resp, err := s.api.Execute(ctx, r.target, method, path, data, hasData)
	if err != nil {
		return 0, nil, err
	}
	if resp.OK() && !sensitiveRequest(method, path) {
		body := "{}"
		if hasData {
			if str, ok := data.(string); ok {
				body = str
			} else {
				body = jsonx.String(data)
			}
		}
		entry := store.Request{Path: path, Method: method, Body: body, Username: r.user, CreatedAt: time.Now()}
		if err := s.history.Save(ctx, entry); err != nil {
			s.log.Error("error saving rest request history", "err", err)
		}
	}
	return resp.Status, resp.Body(), nil
}

// sensitiveRequest 判断请求体里可能带密码或密钥的请求，不写进历史：
// _security 的所有请求，以及 _inference（API key）、_snapshot（仓库密钥）、_watcher、_connector 的写请求。
func sensitiveRequest(method, path string) bool {
	p := strings.ToLower(path)
	if strings.Contains(p, "_security") {
		return true
	}
	if method == http.MethodGet || method == http.MethodHead {
		return false
	}
	for _, s := range []string{"_inference", "_snapshot", "_watcher", "_connector"} {
		if strings.Contains(p, s) {
			return true
		}
	}
	return false
}

// getHasSideEffects 识别会改动集群的 GET 接口：_refresh、_flush 和 8.x 的 _security/enroll。
func getHasSideEffects(path string) bool {
	if i := strings.IndexAny(path, "?#"); i >= 0 {
		path = path[:i]
	}
	segs := strings.Split(strings.ToLower(strings.Trim(path, "/")), "/")
	for i, seg := range segs {
		if seg == "_refresh" || seg == "_flush" || (seg == "_security" && i+1 < len(segs) && segs[i+1] == "enroll") {
			return true
		}
	}
	return false
}

func (s *Server) restIndex(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.Aliases(ctx, r.target)
	return esResult(resp, err, func(v any) (any, error) {
		indices, err := models.AutocompletionIndices(v)
		if err != nil {
			return nil, err
		}
		return jsonx.Obj("indices", indices, "host", redactURL(r.target.URL)), nil
	})
}

func (s *Server) restHistory(ctx context.Context, r *cerebroRequest) (int, any, error) {
	reqs, err := s.history.All(ctx, r.user)
	if err != nil {
		return http.StatusInternalServerError, jsonx.Obj("Error", "Error while loading requests history: "+err.Error()), nil
	}
	out := make([]any, 0, len(reqs))
	for _, q := range reqs {
		out = append(out, jsonx.Obj(
			"path", q.Path,
			"method", q.Method,
			"body", q.Body,
			"created_at", q.CreatedAt.Format("02/01 15:04:05"),
		))
	}
	return http.StatusOK, out, nil
}

// ---------- Overview ----------

var overviewAPIs = []string{
	"_cluster/state/master_node,routing_table,blocks",
	"_nodes/stats/jvm,fs,os,process?human=true",
	"_stats/docs,store?ignore_unavailable=true",
	"_cluster/settings",
	"_aliases",
	"_cluster/health",
	"_nodes/_all/os,jvm?human=true",
}

// getAll 并发 GET 多个接口，任一失败按 RequestFailedException 处理。
func (s *Server) getAll(ctx context.Context, t *es.Target, apis []string) ([]any, error) {
	calls := make([]esCall, len(apis))
	for i, api := range apis {
		calls[i] = func(ctx context.Context) (*es.Response, error) {
			return s.api.Execute(ctx, t, http.MethodGet, api, nil, false)
		}
	}
	resps, err := parallel(ctx, calls...)
	if err != nil {
		return nil, err
	}
	return parsedAll(resps, apis)
}

func (s *Server) overview(ctx context.Context, r *cerebroRequest) (int, any, error) {
	v, err := s.getAll(ctx, r.target, overviewAPIs)
	if err != nil {
		return 0, nil, err
	}
	out, err := models.ClusterOverview(v[0], v[1], v[2], v[3], v[4], v[5], v[6])
	if err != nil {
		return 0, nil, err
	}
	return http.StatusOK, out, nil
}

func (s *Server) disableShardAllocation(ctx context.Context, r *cerebroRequest) (int, any, error) {
	kind, err := r.get("kind")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.DisableShardAllocation(ctx, r.target, kind))
}

func (s *Server) enableShardAllocation(ctx context.Context, r *cerebroRequest) (int, any, error) {
	return passthrough(s.api.EnableShardAllocation(ctx, r.target))
}

func (s *Server) getShardStats(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	shard, err := r.getInt("shard")
	if err != nil {
		return 0, nil, err
	}
	node, err := r.get("node")
	if err != nil {
		return 0, nil, err
	}
	resps, err := parallel(ctx,
		func(ctx context.Context) (*es.Response, error) { return s.api.ShardStats(ctx, r.target, index) },
		func(ctx context.Context) (*es.Response, error) { return s.api.IndexRecovery(ctx, r.target, index) },
	)
	if err != nil {
		return 0, nil, err
	}
	for _, resp := range resps {
		if !resp.OK() {
			return resp.Status, resp.Body(), nil
		}
	}
	stats, err := resps[0].JSON()
	if err != nil {
		return 0, nil, err
	}
	recovery, err := resps[1].JSON()
	if err != nil {
		return 0, nil, err
	}
	out, err := models.ShardStats(index, node, shard, stats, recovery)
	if err != nil {
		return 0, nil, err
	}
	return http.StatusOK, out, nil
}

func (s *Server) relocateShard(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	shard, err := r.getInt("shard")
	if err != nil {
		return 0, nil, err
	}
	from, err := r.get("from")
	if err != nil {
		return 0, nil, err
	}
	to, err := r.get("to")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.RelocateShard(ctx, r.target, shard, index, from, to))
}

// ---------- Nodes / Navbar ----------

func (s *Server) nodes(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resps, err := parallel(ctx,
		func(ctx context.Context) (*es.Response, error) { return s.api.Nodes(ctx, r.target, "jvm", "os") },
		func(ctx context.Context) (*es.Response, error) {
			return s.api.NodesStats(ctx, r.target, "jvm", "fs", "os", "process")
		},
		func(ctx context.Context) (*es.Response, error) { return s.api.CatMaster(ctx, r.target) },
	)
	if err != nil {
		return 0, nil, err
	}
	for _, resp := range resps {
		if !resp.OK() {
			return resp.Status, resp.Body(), nil
		}
	}
	v, err := parsedAll(resps, []string{"_nodes", "_nodes/stats", "_cat/master"})
	if err != nil {
		return 0, nil, err
	}
	out, err := models.Nodes(v[0], v[1], v[2])
	if err != nil {
		return 0, nil, err
	}
	return http.StatusOK, out, nil
}

func (s *Server) navbar(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.ClusterHealth(ctx, r.target)
	return esResult(resp, err, func(v any) (any, error) {
		if r.user == "" {
			return v, nil
		}
		obj, ok := v.(*jsonx.Object)
		if !ok {
			return nil, &models.FormatError{Path: "$"}
		}
		return obj.Set("username", r.user), nil
	})
}

// ---------- Analysis ----------

func (s *Server) analysisIndices(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.CatIndices(ctx, r.target)
	return esResult(resp, err, models.OpenIndices)
}

func (s *Server) analysisAnalyzers(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	resp, err := s.api.IndexSettings(ctx, r.target, index)
	return esResult(resp, err, func(v any) (any, error) { return models.IndexAnalyzers(index, v), nil })
}

func (s *Server) analysisFields(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	resp, err := s.api.IndexMapping(ctx, r.target, index)
	return esResult(resp, err, func(v any) (any, error) { return models.IndexFields(index, v) })
}

func (s *Server) analyzeByField(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, field, text, err := r.get3("index", "field", "text")
	if err != nil {
		return 0, nil, err
	}
	resp, err := s.api.AnalyzeByField(ctx, r.target, index, field, text)
	return esResult(resp, err, models.Tokens)
}

func (s *Server) analyzeByAnalyzer(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, analyzer, text, err := r.get3("index", "analyzer", "text")
	if err != nil {
		return 0, nil, err
	}
	resp, err := s.api.AnalyzeByAnalyzer(ctx, r.target, index, analyzer, text)
	return esResult(resp, err, models.Tokens)
}

func (r *cerebroRequest) get3(a, b, c string) (string, string, string, error) {
	va, err := r.get(a)
	if err != nil {
		return "", "", "", err
	}
	vb, err := r.get(b)
	if err != nil {
		return "", "", "", err
	}
	vc, err := r.get(c)
	if err != nil {
		return "", "", "", err
	}
	return va, vb, vc, nil
}

// ---------- Cluster changes ----------

var clusterChangesAPIs = []string{"_aliases", "_nodes/transport", "_cluster/state/blocks"}

func (s *Server) clusterChanges(ctx context.Context, r *cerebroRequest) (int, any, error) {
	v, err := s.getAll(ctx, r.target, clusterChangesAPIs)
	if err != nil {
		return 0, nil, err
	}
	out, err := models.ClusterChanges(v[0], v[1], v[2])
	if err != nil {
		return 0, nil, err
	}
	return http.StatusOK, out, nil
}

// ---------- Commons ----------

func (s *Server) commonsIndices(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.CatIndices(ctx, r.target)
	return esResult(resp, err, func(v any) (any, error) { return models.CommonsIndices(v), nil })
}

func (s *Server) commonsNodes(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.CatNodes(ctx, r.target)
	return esResult(resp, err, func(v any) (any, error) { return models.CommonsNodes(v), nil })
}

func (s *Server) getNodeStats(ctx context.Context, r *cerebroRequest) (int, any, error) {
	node, err := r.get("node")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.NodeStats(ctx, r.target, node))
}

// ---------- Create index ----------

func (s *Server) getIndexMetadata(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	resp, err := s.api.IndexMetadata(ctx, r.target, index)
	return esResult(resp, err, func(v any) (any, error) { return models.IndexMetadata(index, v) })
}

func (s *Server) createIndex(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	metadata, ok := r.getAny("metadata")
	if !ok {
		metadata = jsonx.NewObject()
	}
	return passthrough(s.api.CreateIndex(ctx, r.target, index, metadata))
}

// ---------- Templates ----------

func (s *Server) templates(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.Templates(ctx, r.target)
	return esResult(resp, err, models.Templates)
}

func (s *Server) deleteTemplate(ctx context.Context, r *cerebroRequest) (int, any, error) {
	name, err := r.get("name")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.DeleteTemplate(ctx, r.target, name))
}

func (s *Server) createTemplate(ctx context.Context, r *cerebroRequest) (int, any, error) {
	name, err := r.get("name")
	if err != nil {
		return 0, nil, err
	}
	template, err := r.getObj("template")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.CreateTemplate(ctx, r.target, name, template))
}

// ---------- Settings ----------

func (s *Server) clusterSettings(ctx context.Context, r *cerebroRequest) (int, any, error) {
	return passthrough(s.api.ClusterSettingsAll(ctx, r.target))
}

func (s *Server) saveClusterSettings(ctx context.Context, r *cerebroRequest) (int, any, error) {
	settings, err := r.getObj("settings")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.PutClusterSettings(ctx, r.target, settings))
}

func (s *Server) updateIndexSettings(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	settings, err := r.getObj("settings")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.UpdateIndexSettings(ctx, r.target, index, settings))
}

// ---------- Repositories / Snapshots ----------

func (s *Server) repositories(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resp, err := s.api.Repositories(ctx, r.target)
	return esResult(resp, err, models.Repositories)
}

func (s *Server) createRepository(ctx context.Context, r *cerebroRequest) (int, any, error) {
	name, err := r.get("name")
	if err != nil {
		return 0, nil, err
	}
	repoType, err := r.get("type")
	if err != nil {
		return 0, nil, err
	}
	settings, err := r.getObj("settings")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.CreateRepository(ctx, r.target, name, repoType, settings))
}

func (s *Server) deleteRepository(ctx context.Context, r *cerebroRequest) (int, any, error) {
	name, err := r.get("name")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.DeleteRepository(ctx, r.target, name))
}

func (s *Server) snapshots(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resps, err := parallel(ctx,
		func(ctx context.Context) (*es.Response, error) { return s.api.CatIndices(ctx, r.target) },
		func(ctx context.Context) (*es.Response, error) { return s.api.Repositories(ctx, r.target) },
	)
	if err != nil {
		return 0, nil, err
	}
	for _, resp := range resps {
		if !resp.OK() {
			return resp.Status, resp.Body(), nil
		}
	}
	v, err := parsedAll(resps, []string{"_cat/indices", "_snapshot"})
	if err != nil {
		return 0, nil, err
	}
	indices, err := models.SnapshotIndices(v[0])
	if err != nil {
		return 0, nil, err
	}
	return http.StatusOK, jsonx.Obj("indices", indices, "repositories", models.SnapshotRepositories(v[1])), nil
}

func (s *Server) loadSnapshots(ctx context.Context, r *cerebroRequest) (int, any, error) {
	repo, err := r.get("repository")
	if err != nil {
		return 0, nil, err
	}
	resp, err := s.api.Snapshots(ctx, r.target, repo)
	return esResult(resp, err, models.Snapshots)
}

func (s *Server) deleteSnapshot(ctx context.Context, r *cerebroRequest) (int, any, error) {
	repo, err := r.get("repository")
	if err != nil {
		return 0, nil, err
	}
	snapshot, err := r.get("snapshot")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.DeleteSnapshot(ctx, r.target, repo, snapshot))
}

func (s *Server) createSnapshot(ctx context.Context, r *cerebroRequest) (int, any, error) {
	repo, err := r.get("repository")
	if err != nil {
		return 0, nil, err
	}
	snapshot, err := r.get("snapshot")
	if err != nil {
		return 0, nil, err
	}
	indices := r.getStringArrayJoined("indices")
	ignoreUnavailable, err := r.getBool("ignoreUnavailable")
	if err != nil {
		return 0, nil, err
	}
	includeGlobalState, err := r.getBool("includeGlobalState")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.CreateSnapshot(ctx, r.target, repo, snapshot, ignoreUnavailable, includeGlobalState, indices))
}

func (s *Server) restoreSnapshot(ctx context.Context, r *cerebroRequest) (int, any, error) {
	repo, err := r.get("repository")
	if err != nil {
		return 0, nil, err
	}
	snapshot, err := r.get("snapshot")
	if err != nil {
		return 0, nil, err
	}
	o := es.RestoreOptions{
		RenamePattern:     r.getOpt("renamePattern"),
		RenameReplacement: r.getOpt("renameReplacement"),
		Indices:           r.getStringArrayJoined("indices"),
	}
	for _, f := range []struct {
		name string
		dst  *bool
	}{
		{"ignoreUnavailable", &o.IgnoreUnavailable},
		{"includeAliases", &o.IncludeAliases},
		{"includeGlobalState", &o.IncludeGlobalState},
	} {
		if *f.dst, err = r.getBool(f.name); err != nil {
			return 0, nil, err
		}
	}
	return passthrough(s.api.RestoreSnapshot(ctx, r.target, repo, snapshot, o))
}

// ---------- Cat ----------

func (s *Server) cat(ctx context.Context, r *cerebroRequest) (int, any, error) {
	api, err := r.get("api")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.Cat(ctx, r.target, api))
}

// ---------- Connect ----------

func (s *Server) connectHosts(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.currentUser(r); !ok {
		cerebroResponse(w, http.StatusSeeOther, nil)
		return
	}
	names := make([]any, 0, len(s.hostNames))
	for _, n := range s.hostNames {
		names = append(names, n)
	}
	cerebroResponse(w, http.StatusOK, names)
}

// connect 测试连接；网络错误时返回 HTTP 500，前端据此弹出错误。
func (s *Server) connect(w http.ResponseWriter, r *http.Request) {
	if _, ok := s.currentUser(r); !ok {
		cerebroResponse(w, http.StatusSeeOther, nil)
		return
	}
	body, err := parseBody(w, r)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, errorBody(err.Error()))
		return
	}
	target, _, _, err := s.resolveTarget(body, r)
	if err != nil {
		status, out := s.errorResponse(r, err)
		cerebroResponse(w, status, out)
		return
	}
	resp, err := s.api.Execute(r.Context(), target, http.MethodGet, "_cluster/health", nil, false)
	if err != nil {
		s.log.Warn("connect failed", "err", err)
		writeJSON(w, http.StatusInternalServerError, errorBody(err.Error()))
		return
	}
	cerebroResponse(w, resp.Status, resp.Body())
}
