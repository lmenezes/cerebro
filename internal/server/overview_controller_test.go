package server

import (
	"strings"
	"testing"
)

// 对应 test/controllers/OverviewControllerSpec.scala。

const (
	overviewAcknowledged = `{"acknowledged": true}`
	overviewShards       = `{"_shards": {"total": 10, "successful": 5, "failed": 0}}`
)

// 对 indices 参数做操作的 7 个接口：成功时透传 ES 响应，缺 indices 时返回 400 且不访问 ES。
func TestOverviewControllerIndicesActions(t *testing.T) {
	cases := []struct {
		name  string // Scala 用例名
		path  string
		esKey string // 假 ES 上的 "METHOD /uri"
		ct    string // 期望发给 ES 的 Content-Type（Scala 对这些 POST 也带 application/json）
		reply string
	}{
		// "a,b,c" 按 URLEncoder 编码成 a%2Cb%2Cc，与 Scala 的 encoded() 一致
		{"should correctly delete index", "/overview/delete_indices", "DELETE /a%2Cb%2Cc", noContentType, overviewAcknowledged},
		{"should correctly refresh index", "/overview/refresh_indices", "POST /a%2Cb%2Cc/_refresh", jsonContentType, overviewShards},
		{"should correctly flush index", "/overview/flush_indices", "POST /a%2Cb%2Cc/_flush", jsonContentType, overviewShards},
		{"should correctly clear index cache", "/overview/clear_indices_cache", "POST /a%2Cb%2Cc/_cache/clear", jsonContentType, overviewShards},
		{"should correctly force index merge", "/overview/force_merge", "POST /a%2Cb%2Cc/_forcemerge", jsonContentType, overviewShards},
		{"should correctly open indices", "/overview/open_indices", "POST /a%2Cb%2Cc/_open", jsonContentType, overviewAcknowledged},
		{"should correctly close indices", "/overview/close_indices", "POST /a%2Cb%2Cc/_close", jsonContentType, overviewAcknowledged},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			f := newFakeES(t).on(c.esKey, 200, c.reply)
			h := testServer(t, nil).Handler()
			ensure(t, h, c.path, hostBody(f.url(), `"indices":"a,b,c"`), 200, c.reply)
			method, uri, _ := strings.Cut(c.esKey, " ")
			assertESCall(t, f, method, uri, "", c.ct)
			assertESCallCount(t, f, 1)
		})
		t.Run("should validate existence of index parameter "+c.path, func(t *testing.T) {
			f := newFakeES(t)
			h := testServer(t, nil).Handler()
			ensure(t, h, c.path, hostBody(f.url(), ""), 400, `{"error":"Missing required parameter indices"}`)
			assertNoESCalls(t, f)
		})
	}
}

func TestOverviewControllerShardStats(t *testing.T) {
	t.Run("should correctly retrieve shard stats", func(t *testing.T) {
		f := newFakeES(t).
			on("GET /someIndex/_stats?level=shards&human=true", 200, fixture(t, "overview/index_shard_stats.json")).
			on("GET /someIndex/_recovery?active_only=true&human=true", 200, `{}`)
		h := testServer(t, nil).Handler()
		body := hostBody(f.url(), `"index":"someIndex","node":"MCGlWc6ERF2N9pO0uh7-tA","shard":1`)
		ensure(t, h, "/overview/get_shard_stats", body, 200, fixture(t, "overview/shard_stats_expected.json"))
		assertESCall(t, f, "GET", "/someIndex/_stats?level=shards&human=true", "", noContentType)
		assertESCall(t, f, "GET", "/someIndex/_recovery?active_only=true&human=true", "", noContentType)
	})

	missing := []struct {
		name, extra, param string
	}{
		{"should validate existence of index parameter", ``, "index"},
		{"should validate existence of shard parameter", `"index":"foo"`, "shard"},
		{"should validate existence of node parameter", `"index":"foo","shard":1`, "node"},
	}
	for _, c := range missing {
		t.Run(c.name, func(t *testing.T) {
			f := newFakeES(t)
			h := testServer(t, nil).Handler()
			ensure(t, h, "/overview/get_shard_stats", hostBody(f.url(), c.extra), 400,
				`{"error":"Missing required parameter `+c.param+`"}`)
			assertNoESCalls(t, f)
		})
	}
}

// Scala 里这两个用例都叫 "should correctly clear index cache"（复制粘贴的笔误），实际测的是开关分片分配。
func TestOverviewControllerShardAllocation(t *testing.T) {
	allocation := func(v string) string {
		return `{"transient":{"cluster":{"routing":{"allocation":{"enable":"` + v + `"}}}}}`
	}
	reply := func(v string) string {
		return `{"acknowledged": true, "persistent": {}, "transient": {"cluster": {"routing": {"allocation": {"enable": "` + v + `"}}}}}`
	}

	t.Run("should correctly clear index cache (enableShardAllocation)", func(t *testing.T) {
		f := newFakeES(t).on("PUT /_cluster/settings", 200, reply("all"))
		h := testServer(t, nil).Handler()
		ensure(t, h, "/overview/enable_shard_allocation", hostBody(f.url(), `"indices":"a,b,c"`), 200, reply("all"))
		assertESCall(t, f, "PUT", "/_cluster/settings", allocation("all"), jsonContentType)
	})

	t.Run("should correctly clear index cache (disableShardAllocation)", func(t *testing.T) {
		f := newFakeES(t).on("PUT /_cluster/settings", 200, reply("none"))
		h := testServer(t, nil).Handler()
		ensure(t, h, "/overview/disable_shard_allocation", hostBody(f.url(), `"kind":"none"`), 200, reply("none"))
		assertESCall(t, f, "PUT", "/_cluster/settings", allocation("none"), jsonContentType)
	})
}
