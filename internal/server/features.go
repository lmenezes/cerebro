package server

import (
	"context"
	"net/http"

	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/jsonx"
	"github.com/RitterHou/cerebro/internal/models"
)

// featureRoutes 注册第三阶段新增的接口：组合模板、组件模板、data streams、ILM、SLM、分片诊断。
// 写接口一律用 writeRoute，只读模式下会被拦截。
func (s *Server) featureRoutes(p func(string, routeKind, handlerFunc)) {
	p("/cerebro_info", readRoute, s.cerebroInfo)

	p("/index_templates", readRoute, s.listOf(s.api.IndexTemplates, "index_templates"))
	p("/index_templates/simulate", readRoute, s.nameArg(s.api.SimulateIndexTemplate))
	p("/index_templates/create", writeRoute, s.nameBody(s.api.PutIndexTemplate, "template"))
	p("/index_templates/delete", writeRoute, s.nameArg(s.api.DeleteIndexTemplate))

	p("/component_templates", readRoute, s.listOf(s.api.ComponentTemplates, "component_templates"))
	p("/component_templates/create", writeRoute, s.nameBody(s.api.PutComponentTemplate, "template"))
	p("/component_templates/delete", writeRoute, s.nameArg(s.api.DeleteComponentTemplate))

	p("/data_streams", readRoute, s.dataStreams)
	p("/data_streams/delete", writeRoute, s.nameArg(s.api.DeleteDataStream))
	p("/data_streams/rollover", writeRoute, s.nameArg(s.api.Rollover))

	p("/ilm/policies", readRoute, s.objectList(s.api.ILMPolicies))
	p("/ilm/policies/save", writeRoute, s.nameBody(s.api.PutILMPolicy, "policy"))
	p("/ilm/policies/delete", writeRoute, s.nameArg(s.api.DeleteILMPolicy))
	p("/ilm/explain", readRoute, s.indexArg(s.api.ILMExplain))

	p("/slm/policies", readRoute, s.objectList(s.api.SLMPolicies))
	p("/slm/policies/save", writeRoute, s.nameBody(s.api.PutSLMPolicy, "policy"))
	p("/slm/policies/delete", writeRoute, s.nameArg(s.api.DeleteSLMPolicy))
	p("/slm/policies/execute", writeRoute, s.nameArg(s.api.ExecuteSLMPolicy))

	p("/overview/allocation_explain", readRoute, s.allocationExplain)
	p("/overview/shards", readRoute, s.optIndices(s.api.CatShards))
	p("/overview/recovery", readRoute, s.optIndices(s.api.CatRecovery))
}

// cerebroInfo 告诉前端当前连接是否只读、登录的用户名，用于隐藏修改类按钮。
func (s *Server) cerebroInfo(_ context.Context, r *cerebroRequest) (int, any, error) {
	user := any(nil)
	if r.user != "" {
		user = r.user
	}
	return http.StatusOK, jsonx.Obj("read_only", r.readOnly, "username", user, "version", s.version), nil
}

type targetFn func(ctx context.Context, t *es.Target) (*es.Response, error)
type nameFn func(ctx context.Context, t *es.Target, name string) (*es.Response, error)
type nameBodyFn func(ctx context.Context, t *es.Target, name string, body any) (*es.Response, error)

// optIndices 是可选 indices 参数（逗号分隔）的只读接口，不传时查全部索引。
func (s *Server) optIndices(fn indexFn) handlerFunc {
	return func(ctx context.Context, r *cerebroRequest) (int, any, error) {
		indices := ""
		if v := r.getOpt("indices"); v != nil {
			indices = *v
		}
		return passthrough(fn(ctx, r.target, indices))
	}
}

// listOf 取响应里的某个数组字段（如 index_templates）。
func (s *Server) listOf(fn targetFn, key string) handlerFunc {
	return func(ctx context.Context, r *cerebroRequest) (int, any, error) {
		resp, err := fn(ctx, r.target)
		return esResult(resp, err, func(v any) (any, error) { return models.NamedList(v, key), nil })
	}
}

func (s *Server) objectList(fn targetFn) handlerFunc {
	return func(ctx context.Context, r *cerebroRequest) (int, any, error) {
		resp, err := fn(ctx, r.target)
		return esResult(resp, err, models.ObjectToList)
	}
}

func (s *Server) nameArg(fn nameFn) handlerFunc {
	return func(ctx context.Context, r *cerebroRequest) (int, any, error) {
		name, err := r.get("name")
		if err != nil {
			return 0, nil, err
		}
		return passthrough(fn(ctx, r.target, name))
	}
}

// nameBody 是 name + 一个 JSON 对象参数的写接口。
func (s *Server) nameBody(fn nameBodyFn, field string) handlerFunc {
	return func(ctx context.Context, r *cerebroRequest) (int, any, error) {
		name, err := r.get("name")
		if err != nil {
			return 0, nil, err
		}
		body, err := r.getObj(field)
		if err != nil {
			return 0, nil, err
		}
		return passthrough(fn(ctx, r.target, name, body))
	}
}

func (s *Server) dataStreams(ctx context.Context, r *cerebroRequest) (int, any, error) {
	resps, err := parallel(ctx,
		func(ctx context.Context) (*es.Response, error) { return s.api.DataStreams(ctx, r.target) },
		func(ctx context.Context) (*es.Response, error) { return s.api.DataStreamsStats(ctx, r.target) },
	)
	if err != nil {
		return 0, nil, err
	}
	if !resps[0].OK() {
		return resps[0].Status, resps[0].Body(), nil
	}
	streams, err := resps[0].JSON()
	if err != nil {
		return 0, nil, err
	}
	var stats any
	if resps[1].OK() { // 统计失败不影响列表
		stats, _ = resps[1].JSON()
	}
	out, err := models.DataStreams(streams, stats)
	if err != nil {
		return 0, nil, err
	}
	return http.StatusOK, out, nil
}

func (s *Server) allocationExplain(ctx context.Context, r *cerebroRequest) (int, any, error) {
	index, err := r.get("index")
	if err != nil {
		return 0, nil, err
	}
	shard, err := r.getInt("shard")
	if err != nil {
		return 0, nil, err
	}
	primary, err := r.getBool("primary")
	if err != nil {
		return 0, nil, err
	}
	return passthrough(s.api.AllocationExplain(ctx, r.target, index, shard, primary))
}
