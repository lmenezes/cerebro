package server

import (
	"go/ast"
	"go/parser"
	"go/token"
	"net/http"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"testing"

	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/jsonx"
)

// xRoute 是经 process 注册的接口。
type xRoute struct {
	path  string
	write bool
}

// xParseRoutes 从源码里找出 p("/path", readRoute|writeRoute, ...) 和直接用 mux 注册的路由，新增接口会自动被覆盖。
func xParseRoutes(t *testing.T) (routes []xRoute, direct []string) {
	t.Helper()
	files, _ := filepath.Glob("*.go")
	fset := token.NewFileSet()
	for _, name := range files {
		if strings.HasSuffix(name, "_test.go") {
			continue
		}
		f, err := parser.ParseFile(fset, name, nil, 0)
		if err != nil {
			t.Fatal(err)
		}
		ast.Inspect(f, func(n ast.Node) bool {
			call, ok := n.(*ast.CallExpr)
			if !ok || len(call.Args) == 0 {
				return true
			}
			lit, ok := call.Args[0].(*ast.BasicLit)
			if !ok || lit.Kind != token.STRING {
				return true
			}
			pattern, _ := strconv.Unquote(lit.Value)
			switch fn := call.Fun.(type) {
			case *ast.Ident:
				if fn.Name == "p" && len(call.Args) == 3 {
					kind, _ := call.Args[1].(*ast.Ident)
					if kind == nil || (kind.Name != "readRoute" && kind.Name != "writeRoute") {
						t.Fatalf("%s: route kind must be readRoute or writeRoute", pattern)
					}
					routes = append(routes, xRoute{pattern, kind.Name == "writeRoute"})
				}
			case *ast.SelectorExpr:
				if x, ok := fn.X.(*ast.Ident); ok && x.Name == "mux" && (fn.Sel.Name == "Handle" || fn.Sel.Name == "HandleFunc") {
					direct = append(direct, pattern)
				}
			}
			return true
		})
	}
	if len(routes) < 40 {
		t.Fatalf("parsed only %d routes from source, parser out of date?", len(routes))
	}
	return routes, direct
}

func xProcessRoutes(t *testing.T) []xRoute {
	r, _ := xParseRoutes(t)
	return r
}

func xWriteRoutes(t *testing.T) []string {
	var out []string
	for _, r := range xProcessRoutes(t) {
		if r.write {
			out = append(out, r.path)
		}
	}
	return out
}

// xFullBody 带上所有接口可能用到的参数，保证不开只读时每个写接口都会真的请求 ES。
func xFullBody(host string) string {
	return `{"host":"` + host + `","indices":"idx","index":"idx","kind":"primaries","shard":0,"node":"n1",` +
		`"from":"n1","to":"n2","name":"tpl","template":{"index_patterns":["x"]},"settings":{"a":"b"},"type":"fs",` +
		`"repository":"repo","snapshot":"snap","ignoreUnavailable":true,"includeGlobalState":false,"includeAliases":true,` +
		`"changes":[],"metadata":{},"api":"health","analyzer":"standard","field":"f","text":"t","method":"GET","path":"_cluster/health",` +
		`"policy":{"phases":{}},"primary":true}`
}

// 写接口清单：改动这里要确认新接口确实需要只读拦截。
var xExpectedWriteRoutes = []string{
	"/aliases/update_aliases",
	"/overview/disable_shard_allocation", "/overview/enable_shard_allocation",
	"/overview/close_indices", "/overview/open_indices", "/overview/force_merge", "/overview/clear_indices_cache",
	"/overview/refresh_indices", "/overview/flush_indices", "/overview/delete_indices", "/overview/relocate_shard",
	"/create_index/create",
	"/templates/delete", "/templates/create",
	"/cluster_settings/save", "/index_settings/update",
	"/repositories/create", "/repositories/delete",
	"/snapshots/create", "/snapshots/delete", "/snapshots/restore",
	// 第三阶段新增
	"/index_templates/create", "/index_templates/delete",
	"/component_templates/create", "/component_templates/delete",
	"/data_streams/delete", "/data_streams/rollover",
	"/ilm/policies/save", "/ilm/policies/delete",
	"/slm/policies/save", "/slm/policies/delete", "/slm/policies/execute",
}

var xMutatingWords = []string{"update", "delete", "create", "save", "close", "open", "merge", "clear", "refresh",
	"flush", "relocate", "restore", "enable", "disable", "put", "remove", "reroute", "rollover", "shrink", "reindex", "execute"}

func TestReadOnlyMode_RouteTable(t *testing.T) {
	routes, direct := xParseRoutes(t)
	got := xWriteRoutes(t)
	if !slices.Equal(slices.Sorted(slices.Values(got)), slices.Sorted(slices.Values(xExpectedWriteRoutes))) {
		t.Errorf("write routes changed:\n got %v\nwant %v", got, xExpectedWriteRoutes)
	}
	for _, r := range routes {
		last := r.path[strings.LastIndex(r.path, "/")+1:]
		for _, w := range xMutatingWords {
			if !r.write && strings.Contains(last, w) {
				t.Errorf("%s looks like a write route but is registered as readRoute", r.path)
			}
		}
	}
	// 不经过 process（不做只读检查）的路由只能是这些
	allowed := []string{"GET /{$}", "GET /login", "POST /auth/login", "POST /auth/logout", "GET /healthz",
		"GET /public/", "GET /", "GET /connect/hosts", "POST /connect", "GET /auth/oidc/start", "GET /auth/oidc/callback"}
	for _, d := range direct {
		if !slices.Contains(allowed, d) {
			t.Errorf("route %q bypasses process(); add read-only handling or allow it here", d)
		}
	}
}

func xAssertForbidden(t *testing.T, h http.Handler, f *fakeES, path, body string) {
	t.Helper()
	before := len(f.requests())
	status, out := call(t, h, path, body)
	if status != http.StatusForbidden {
		t.Errorf("%s: status %d, want 403 (%s)", path, status, jsonx.String(out))
		return
	}
	if msg, _ := jsonx.StringAt(out, "error"); !strings.Contains(msg, "read-only") {
		t.Errorf("%s: error body %s", path, jsonx.String(out))
	}
	if n := len(f.requests()) - before; n != 0 {
		t.Errorf("%s: sent %d request(s) to ES in read-only mode: %+v", path, n, f.requests()[before:])
	}
}

func xAssertReachedES(t *testing.T, h http.Handler, f *fakeES, path, body string) {
	t.Helper()
	before := len(f.requests())
	status, out := call(t, h, path, body)
	if status == http.StatusForbidden {
		t.Errorf("%s: unexpectedly forbidden: %s", path, jsonx.String(out))
	}
	if len(f.requests()) == before {
		t.Errorf("%s: did not reach ES (status %d)", path, status)
	}
}

func TestReadOnlyMode_GlobalBlocksAllWrites(t *testing.T) {
	f := newFakeES(t)
	h := testServer(t, func(c *config.Config) { c.ReadOnly = true }, xQuiet).Handler()
	for _, path := range xWriteRoutes(t) {
		xAssertForbidden(t, h, f, path, xFullBody(f.url()))
	}
}

// 对照：不开只读时同样的 body 会让每个写接口请求 ES，证明上面的 403 不是参数缺失造成的。
func TestReadOnlyMode_WriteRoutesReachESWhenWritable(t *testing.T) {
	f := newFakeES(t)
	h := testServer(t, nil, xQuiet).Handler()
	for _, path := range xWriteRoutes(t) {
		xAssertReachedES(t, h, f, path, xFullBody(f.url()))
	}
}

func TestReadOnlyMode_ReadRoutesStillWork(t *testing.T) {
	f := newFakeES(t)
	h := testServer(t, func(c *config.Config) { c.ReadOnly = true }, xQuiet).Handler()
	for _, r := range xProcessRoutes(t) {
		if r.write {
			continue
		}
		if r.path == "/rest/history" || r.path == "/cerebro_info" { // 不访问 ES
			if status, _ := call(t, h, r.path, xFullBody(f.url())); status != 200 {
				t.Errorf("%s: %d", r.path, status)
			}
			continue
		}
		xAssertReachedES(t, h, f, r.path, xFullBody(f.url()))
	}
	code, _ := post(t, h, "/connect", hostBody(f.url(), ""))
	if code != http.StatusOK || len(f.requests()) == 0 {
		t.Fatalf("/connect in read-only mode: HTTP %d", code)
	}
}

func TestReadOnlyMode_RestRequestMethods(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{}`)
	h := testServer(t, func(c *config.Config) { c.ReadOnly = true }, xQuiet).Handler()
	for _, m := range []string{"GET", "get", "Get"} {
		xAssertReachedES(t, h, f, "/rest/request", hostBody(f.url(), `"method":"`+m+`","path":"_cluster/health"`))
	}
	for _, m := range []string{"POST", "post", "PUT", "put", "DELETE", "delete", "PATCH", "HEAD"} {
		xAssertForbidden(t, h, f, "/rest/request", hostBody(f.url(), `"method":"`+m+`","path":"idx/_doc/1","data":{"a":1}`))
	}
}

func xTwoHosts(prod, dev *fakeES, globalRO, devRO bool) func(*config.Config) {
	return func(c *config.Config) {
		c.ReadOnly = globalRO
		c.Hosts = []config.HostConfig{
			{Name: "prod", Host: prod.url(), ReadOnly: true},
			{Name: "dev", Host: dev.url(), ReadOnly: devRO},
		}
	}
}

func TestReadOnlyMode_PerHost(t *testing.T) {
	prod, dev := newFakeES(t), newFakeES(t)
	h := testServer(t, xTwoHosts(prod, dev, false, false), xQuiet).Handler()
	for _, path := range xWriteRoutes(t) {
		xAssertForbidden(t, h, prod, path, xFullBody("prod"))
		xAssertReachedES(t, h, dev, path, xFullBody("dev"))
		xAssertReachedES(t, h, dev, path, xFullBody(dev.url())) // 直接输入地址
	}
	xAssertForbidden(t, h, prod, "/rest/request", `{"host":"prod","method":"DELETE","path":"idx"}`)
	xAssertReachedES(t, h, prod, "/rest/request", `{"host":"prod","method":"GET","path":"_cluster/health"}`)
	xAssertReachedES(t, h, dev, "/rest/request", `{"host":"dev","method":"DELETE","path":"idx"}`)
	xAssertReachedES(t, h, prod, "/navbar", `{"host":"prod"}`)
}

func TestReadOnlyMode_GlobalOverridesHost(t *testing.T) {
	prod, dev := newFakeES(t), newFakeES(t)
	h := testServer(t, xTwoHosts(prod, dev, true, false), xQuiet).Handler()
	for _, path := range xWriteRoutes(t) {
		xAssertForbidden(t, h, dev, path, xFullBody("dev"))
	}
	xAssertForbidden(t, h, dev, "/rest/request", `{"host":"dev","method":"POST","path":"_bulk","data":"{}\n"}`)
}

// 只读集群的地址被手动输入时，应当同样只读。
func TestReadOnlyMode_PerHostURLTypedDirectly(t *testing.T) {
	prod, dev := newFakeES(t), newFakeES(t)
	h := testServer(t, xTwoHosts(prod, dev, false, false), xQuiet).Handler()
	xAssertForbidden(t, h, prod, "/overview/delete_indices", xFullBody(prod.url()))
	xAssertForbidden(t, h, prod, "/overview/delete_indices", xFullBody(prod.url()+"/"))
}
