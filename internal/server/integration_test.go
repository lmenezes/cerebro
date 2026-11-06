//go:build integration

// 对真实 Elasticsearch 跑一遍所有接口（CI 里对 7.17、8.x、9.x 各跑一次）：
//
//	CEREBRO_IT_ES_URL=http://localhost:9200 CEREBRO_IT_ES_USER=elastic CEREBRO_IT_ES_PASSWORD=changeme \
//	  go test -tags integration -run TestIntegration -v ./internal/server/
//
// ES 需要配置 path.repo=/tmp/snapshots（快照仓库用）。可选 CEREBRO_IT_ES_CA 指定 CA 文件。
// 测试写入的索引、模板、仓库都以 cerebro-it- 开头，结束时清理。
package server

import (
	"bytes"
	"context"
	"crypto/tls"
	"crypto/x509"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/jsonx"
	"github.com/RitterHou/cerebro/internal/store"
)

type itCluster struct {
	t      *testing.T
	url    string
	user   string
	pass   string
	client *http.Client
}

// do 直接请求 ES（准备和清理测试数据用）。
func (c *itCluster) do(method, path, body string) (int, any) {
	c.t.Helper()
	var r io.Reader
	if body != "" {
		r = strings.NewReader(body)
	}
	req, _ := http.NewRequestWithContext(context.Background(), method, strings.TrimRight(c.url, "/")+path, r)
	if body != "" {
		ct := "application/json"
		if strings.HasSuffix(strings.Split(path, "?")[0], "_bulk") {
			ct = "application/x-ndjson"
		}
		req.Header.Set("Content-Type", ct)
	}
	if c.user != "" {
		req.Header.Set("Authorization", "Basic "+base64.StdEncoding.EncodeToString([]byte(c.user+":"+c.pass)))
	}
	resp, err := c.client.Do(req)
	if err != nil {
		c.t.Fatalf("%s %s: %v", method, path, err)
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)
	v, _ := jsonx.Parse(data)
	return resp.StatusCode, v
}

func (c *itCluster) must(method, path, body string) any {
	c.t.Helper()
	status, v := c.do(method, path, body)
	if status >= 300 {
		c.t.Fatalf("%s %s: %d %s", method, path, status, jsonx.String(v))
	}
	return v
}

func itSetup(t *testing.T) (*itCluster, http.Handler, string) {
	url := os.Getenv("CEREBRO_IT_ES_URL")
	if url == "" {
		t.Skip("CEREBRO_IT_ES_URL not set")
	}
	tlsCfg := &tls.Config{MinVersion: tls.VersionTLS12}
	ca := os.Getenv("CEREBRO_IT_ES_CA")
	if ca != "" {
		pem, err := os.ReadFile(ca)
		if err != nil {
			t.Fatal(err)
		}
		pool := x509.NewCertPool()
		pool.AppendCertsFromPEM(pem)
		tlsCfg.RootCAs = pool
	}
	c := &itCluster{t: t, url: url, user: os.Getenv("CEREBRO_IT_ES_USER"), pass: os.Getenv("CEREBRO_IT_ES_PASSWORD"),
		client: &http.Client{Timeout: time.Minute, Transport: &http.Transport{TLSClientConfig: tlsCfg}}}

	// 等集群可用
	deadline := time.Now().Add(2 * time.Minute)
	for {
		status, _ := c.do("GET", "/_cluster/health?wait_for_status=yellow&timeout=5s", "")
		if status == 200 {
			break
		}
		if time.Now().After(deadline) {
			t.Fatalf("cluster not ready: %d", status)
		}
		time.Sleep(2 * time.Second)
	}

	itCleanup(c)
	t.Cleanup(func() { itCleanup(c) })
	c.must("PUT", "/cerebro-it-logs", `{"settings":{"number_of_shards":3,"number_of_replicas":1,
	  "analysis":{"analyzer":{"it_analyzer":{"type":"custom","tokenizer":"standard","filter":["lowercase"]}}}},
	  "mappings":{"dynamic":"strict","properties":{"title":{"type":"text","fields":{"raw":{"type":"keyword"}}},
	  "msg":{"type":"match_only_text"},"user":{"properties":{"name":{"type":"text"}}}}}}`)
	c.must("PUT", "/cerebro-it-products", `{"settings":{"number_of_shards":1,"number_of_replicas":0}}`)
	c.must("PUT", "/cerebro-it-closed", `{"settings":{"number_of_shards":1,"number_of_replicas":0}}`)
	c.must("POST", "/_bulk?refresh=true", `{"index":{"_index":"cerebro-it-logs"}}
{"title":"Hello World","msg":"first","user":{"name":"Ann"}}
{"index":{"_index":"cerebro-it-products"}}
{"name":"pen"}
`)
	c.must("POST", "/cerebro-it-closed/_close", "")
	c.must("POST", "/_aliases", `{"actions":[{"add":{"index":"cerebro-it-logs","alias":"cerebro-it-alias","filter":{"term":{"user.name":"ann"}}}}]}`)
	c.must("PUT", "/_template/cerebro-it-legacy", `{"index_patterns":["cerebro-it-legacy-*"],"settings":{"number_of_shards":1}}`)
	c.must("PUT", "/_snapshot/cerebro-it-repo", `{"type":"fs","settings":{"location":"/tmp/snapshots/cerebro-it"}}`)

	cfg := config.Default()
	cfg.DataDir = t.TempDir()
	cfg.ES.TLS.CA = ca
	db, err := store.Open(filepath.Join(cfg.DataDir, "cerebro.db"), 50)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = db.Close() })
	s, err := New(Options{Config: cfg, Client: es.NewClient(time.Minute, "cerebro-it"), History: db,
		SessionKey: bytes.Repeat([]byte("k"), 32), Version: "it"})
	if err != nil {
		t.Fatal(err)
	}
	creds := fmt.Sprintf(`"host":%q,"username":%q,"password":%q`, url, c.user, c.pass)
	return c, s.Handler(), creds
}

func itCleanup(c *itCluster) {
	c.do("DELETE", "/_snapshot/cerebro-it-repo/cerebro-it-snap", "")
	c.do("DELETE", "/_snapshot/cerebro-it-repo", "")
	c.do("DELETE", "/_data_stream/cerebro-it-ds-web", "")
	// 8.x 起默认禁止用通配符删除索引（action.destructive_requires_name），逐个按名字删
	_, rows := c.do("GET", "/_cat/indices/cerebro-it-*?format=json&h=index&expand_wildcards=all", "")
	if arr, ok := rows.([]any); ok {
		for _, r := range arr {
			if name, ok := jsonx.StringAt(r, "index"); ok {
				c.do("DELETE", "/"+name, "")
			}
		}
	}
	for _, p := range []string{"/_template/cerebro-it-legacy", "/_template/cerebro-it-tmp", "/_index_template/cerebro-it-composable",
		"/_component_template/cerebro-it-component", "/_ilm/policy/cerebro-it-policy"} {
		c.do("DELETE", p, "")
	}
}

// itCall 调 Cerebro 接口，断言状态码，返回 body。
func itCall(t *testing.T, h http.Handler, creds, path, extra string, want int) any {
	t.Helper()
	body := "{" + creds
	if extra != "" {
		body += "," + extra
	}
	body += "}"
	status, v := call(t, h, path, body)
	if status != want {
		t.Fatalf("%s: status %d, want %d: %s", path, status, want, jsonx.String(v))
	}
	return v
}

func itHas(list any, value string) bool {
	arr, _ := list.([]any)
	for _, v := range arr {
		if v == value {
			return true
		}
	}
	return false
}

func TestIntegration(t *testing.T) {
	c, h, creds := itSetup(t)
	ok := func(cond bool, format string, args ...any) {
		t.Helper()
		if !cond {
			t.Errorf(format, args...)
		}
	}

	t.Run("connect and navbar", func(t *testing.T) {
		v := itCall(t, h, creds, "/connect", "", 200)
		ok(jsonx.At(v, "cluster_name") != nil, "connect: %s", jsonx.String(v))
		itCall(t, h, creds, "/navbar", "", 200)
	})

	var nodeID string
	t.Run("overview", func(t *testing.T) {
		v := itCall(t, h, creds, "/overview", "", 200)
		nodes, _ := jsonx.ArrayAt(v, "nodes")
		ok(len(nodes) > 0, "no nodes")
		if len(nodes) > 0 {
			nodeID, _ = jsonx.StringAt(nodes[0], "id")
		}
		names := map[string]any{}
		indices, _ := jsonx.ArrayAt(v, "indices")
		for _, idx := range indices {
			n, _ := jsonx.StringAt(idx, "name")
			names[n] = idx
		}
		ok(names["cerebro-it-logs"] != nil, "cerebro-it-logs missing")
		closed, _ := jsonx.At(names["cerebro-it-closed"], "closed").(bool)
		ok(closed, "cerebro-it-closed should be closed")
		n, _ := jsonx.Int64(jsonx.At(names["cerebro-it-logs"], "num_shards"))
		ok(n == 3, "num_shards = %d", n)
	})

	t.Run("nodes and commons", func(t *testing.T) {
		v := itCall(t, h, creds, "/nodes", "", 200)
		arr, _ := v.([]any)
		ok(len(arr) > 0, "nodes empty")
		data, _ := jsonx.At(arr[0], "data").(bool)
		ok(data, "node should be a data node: %s", jsonx.String(arr[0]))
		ok(itHas(itCall(t, h, creds, "/commons/indices", "", 200), "cerebro-it-logs"), "commons/indices")
		itCall(t, h, creds, "/commons/nodes", "", 200)
		itCall(t, h, creds, "/commons/get_index_settings", `"index":"cerebro-it-logs"`, 200)
		itCall(t, h, creds, "/commons/get_index_mapping", `"index":"cerebro-it-logs"`, 200)
		itCall(t, h, creds, "/commons/get_index_stats", `"index":"cerebro-it-logs"`, 200)
		itCall(t, h, creds, "/commons/get_node_stats", fmt.Sprintf(`"node":%q`, nodeID), 200)
		itCall(t, h, creds, "/cluster_changes", "", 200)
	})

	t.Run("aliases", func(t *testing.T) {
		v := itCall(t, h, creds, "/aliases/get_aliases", "", 200)
		found := false
		for _, a := range v.([]any) {
			if jsonx.At(a, "alias") == "cerebro-it-alias" && jsonx.At(a, "filter") != nil {
				found = true
			}
		}
		ok(found, "alias with filter missing")
		itCall(t, h, creds, "/aliases/update_aliases", `"changes":[{"add":{"index":"cerebro-it-products","alias":"cerebro-it-tmp"}}]`, 200)
		itCall(t, h, creds, "/aliases/update_aliases", `"changes":[{"remove":{"index":"cerebro-it-products","alias":"cerebro-it-tmp"}}]`, 200)
	})

	t.Run("rest", func(t *testing.T) {
		v := itCall(t, h, creds, "/rest", "", 200)
		ok(itHas(jsonx.At(v, "indices"), "cerebro-it-alias"), "rest autocomplete")
		itCall(t, h, creds, "/rest/request", `"method":"GET","path":"cerebro-it-logs/_search","data":{"query":{"match_all":{}}}`, 200)
		itCall(t, h, creds, "/rest/request", `"method":"GET","path":"_cluster/health","data":{}`, 200)
		itCall(t, h, creds, "/rest/request", `"method":"POST","path":"cerebro-it-products/_bulk?refresh=true","data":"{\"index\":{}}\n{\"name\":\"cup\"}\n"`, 200)
		itCall(t, h, creds, "/rest/request", `"method":"GET","path":"cerebro-it-missing/_search"`, 404)
		hist := itCall(t, h, creds, "/rest/history", "", 200)
		ok(len(hist.([]any)) >= 2, "history: %s", jsonx.String(hist))
	})

	t.Run("analysis", func(t *testing.T) {
		ok(itHas(itCall(t, h, creds, "/analysis/indices", "", 200), "cerebro-it-logs"), "analysis/indices")
		ok(itHas(itCall(t, h, creds, "/analysis/analyzers", `"index":"cerebro-it-logs"`, 200), "it_analyzer"), "analyzers")
		fields := itCall(t, h, creds, "/analysis/fields", `"index":"cerebro-it-logs"`, 200)
		ok(itHas(fields, "title") && itHas(fields, "msg") && itHas(fields, "user.name"), "fields: %s", jsonx.String(fields))
		tokens := itCall(t, h, creds, "/analysis/analyze/field", `"index":"cerebro-it-logs","field":"title","text":"A b"`, 200)
		ok(len(tokens.([]any)) == 2, "tokens: %s", jsonx.String(tokens))
		itCall(t, h, creds, "/analysis/analyze/analyzer", `"index":"cerebro-it-logs","analyzer":"it_analyzer","text":"A b"`, 200)
	})

	t.Run("create index from metadata", func(t *testing.T) {
		meta := itCall(t, h, creds, "/create_index/get_index_metadata", `"index":"cerebro-it-logs"`, 200)
		itCall(t, h, creds, "/create_index/create", `"index":"cerebro-it-clone","metadata":`+jsonx.String(meta), 200)
	})

	t.Run("templates", func(t *testing.T) {
		v := itCall(t, h, creds, "/templates", "", 200)
		found := false
		for _, tpl := range v.([]any) {
			found = found || jsonx.At(tpl, "name") == "cerebro-it-legacy"
		}
		ok(found, "legacy template missing")
		itCall(t, h, creds, "/templates/create", `"name":"cerebro-it-tmp","template":{"index_patterns":["cerebro-it-tmp-*"]}`, 200)
		itCall(t, h, creds, "/templates/delete", `"name":"cerebro-it-tmp"`, 200)
	})

	t.Run("settings", func(t *testing.T) {
		itCall(t, h, creds, "/cluster_settings", "", 200)
		itCall(t, h, creds, "/cluster_settings/save", `"settings":{"transient":{"cluster.routing.allocation.node_concurrent_recoveries":null}}`, 200)
		itCall(t, h, creds, "/index_settings", `"index":"cerebro-it-logs"`, 200)
		itCall(t, h, creds, "/index_settings/update", `"index":"cerebro-it-products","settings":{"index":{"refresh_interval":"5s"}}`, 200)
	})

	t.Run("index operations", func(t *testing.T) {
		for _, p := range []string{"/overview/refresh_indices", "/overview/flush_indices", "/overview/force_merge", "/overview/clear_indices_cache", "/overview/close_indices", "/overview/open_indices"} {
			itCall(t, h, creds, p, `"indices":"cerebro-it-products"`, 200)
		}
		itCall(t, h, creds, "/overview/disable_shard_allocation", `"kind":"primaries"`, 200)
		v := itCall(t, h, creds, "/overview", "", 200)
		ok(jsonx.At(v, "shard_allocation") == false, "allocation should be disabled")
		itCall(t, h, creds, "/overview/enable_shard_allocation", "", 200)
		itCall(t, h, creds, "/overview/get_shard_stats", fmt.Sprintf(`"index":"cerebro-it-logs","shard":0,"node":%q`, nodeID), 200)
		itCall(t, h, creds, "/overview/delete_indices", `"indices":"cerebro-it-clone"`, 200)
	})

	t.Run("repositories and snapshots", func(t *testing.T) {
		v := itCall(t, h, creds, "/repositories", "", 200)
		found := false
		for _, r := range v.([]any) {
			found = found || jsonx.At(r, "name") == "cerebro-it-repo"
		}
		ok(found, "repository missing")
		itCall(t, h, creds, "/snapshots", "", 200)
		itCall(t, h, creds, "/snapshots/create", `"repository":"cerebro-it-repo","snapshot":"cerebro-it-snap","ignoreUnavailable":true,"includeGlobalState":false,"indices":["cerebro-it-products"]`, 200)
		deadline := time.Now().Add(time.Minute)
		for {
			snaps := itCall(t, h, creds, "/snapshots/load", `"repository":"cerebro-it-repo"`, 200)
			arr, _ := snaps.([]any)
			if len(arr) == 1 && jsonx.At(arr[0], "state") == "SUCCESS" {
				ok(jsonx.At(arr[0], "include_global_state") == false, "include_global_state should be passed to ES")
				break
			}
			if time.Now().After(deadline) {
				t.Fatalf("snapshot not finished: %s", jsonx.String(snaps))
			}
			time.Sleep(time.Second)
		}
		itCall(t, h, creds, "/snapshots/restore", `"repository":"cerebro-it-repo","snapshot":"cerebro-it-snap","renamePattern":"(.+)","renameReplacement":"$1-restored","ignoreUnavailable":true,"includeAliases":false,"includeGlobalState":false,"indices":["cerebro-it-products"]`, 200)
		// 恢复结束后 ES 才允许删除快照，期间返回 503
		deadline = time.Now().Add(time.Minute)
		for {
			status, body := call(t, h, "/snapshots/delete", "{"+creds+`,"repository":"cerebro-it-repo","snapshot":"cerebro-it-snap"}`)
			if status == 200 {
				break
			}
			if status != 503 || time.Now().After(deadline) {
				t.Fatalf("/snapshots/delete: %d %s", status, jsonx.String(body))
			}
			time.Sleep(time.Second)
		}
	})

	t.Run("cat", func(t *testing.T) {
		for _, api := range []string{"indices", "shards", "nodes", "health", "thread_pool"} {
			v := itCall(t, h, creds, "/cat", fmt.Sprintf(`"api":%q`, api), 200)
			_, isList := v.([]any)
			ok(isList, "cat %s: %s", api, jsonx.String(v))
		}
	})

	t.Run("phase 3 features", func(t *testing.T) {
		itCall(t, h, creds, "/component_templates/create", `"name":"cerebro-it-component","template":{"template":{"settings":{"number_of_replicas":0}}}`, 200)
		itCall(t, h, creds, "/index_templates/create", `"name":"cerebro-it-composable","template":{"index_patterns":["cerebro-it-ds-*"],"data_stream":{},"priority":500,"composed_of":["cerebro-it-component"]}`, 200)
		c.must("POST", "/cerebro-it-ds-web/_doc?refresh=true", `{"@timestamp":"2026-01-01T00:00:00Z","message":"hi"}`)
		var ds any
		for _, p := range []string{"/index_templates", "/component_templates", "/data_streams", "/ilm/policies", "/slm/policies"} {
			v := itCall(t, h, creds, p, "", 200)
			_, isList := v.([]any)
			ok(isList, "%s: %s", p, jsonx.String(v))
			if p == "/data_streams" {
				ds = v
			}
		}
		found := false
		for _, s := range ds.([]any) {
			found = found || jsonx.At(s, "name") == "cerebro-it-ds-web"
		}
		ok(found, "data stream missing: %s", jsonx.String(ds))
		itCall(t, h, creds, "/index_templates/simulate", `"name":"cerebro-it-composable"`, 200)
		itCall(t, h, creds, "/data_streams/rollover", `"name":"cerebro-it-ds-web"`, 200)
		itCall(t, h, creds, "/data_streams/delete", `"name":"cerebro-it-ds-web"`, 200)
		itCall(t, h, creds, "/index_templates/delete", `"name":"cerebro-it-composable"`, 200)
		itCall(t, h, creds, "/component_templates/delete", `"name":"cerebro-it-component"`, 200)
		itCall(t, h, creds, "/ilm/policies/save", `"name":"cerebro-it-policy","policy":{"phases":{"delete":{"min_age":"30d","actions":{"delete":{}}}}}`, 200)
		itCall(t, h, creds, "/ilm/policies/delete", `"name":"cerebro-it-policy"`, 200)
		itCall(t, h, creds, "/ilm/explain", `"index":"cerebro-it-logs"`, 200)
		itCall(t, h, creds, "/overview/shards", `"indices":"cerebro-it-logs"`, 200)
		itCall(t, h, creds, "/overview/recovery", "", 200)
		// 单节点上副本没法分配，allocation explain 能说明原因
		v := itCall(t, h, creds, "/overview/allocation_explain", `"index":"cerebro-it-logs","shard":0,"primary":false`, 200)
		ok(jsonx.At(v, "can_allocate") != nil, "allocation explain: %s", jsonx.String(v))
	})
}
