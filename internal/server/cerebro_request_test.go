package server

import (
	"net/http"
	"testing"

	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/models/CerebroRequestSpec.scala。

func TestCerebroRequest(t *testing.T) {
	t.Run("should forward whitelisted headers", func(t *testing.T) {
		f := newFakeES(t).on("GET /_cluster/health", 200, `{"cluster_name":"es"}`)
		h := testServer(t, func(c *config.Config) {
			c.Hosts = []config.HostConfig{{Name: "host1", Host: f.url(), HeadersWhitelist: []string{"a-header"}}}
		}).Handler()
		hdr := http.Header{}
		hdr.Set("a-header", "content")
		hdr.Set("b-header", "not-whitelisted") // 不在白名单里，不应转发
		status, body := callWithHeaders(t, h, "/navbar", `{"host":"host1"}`, hdr)
		if status != 200 {
			t.Fatalf("status = %d, body: %s", status, jsonx.String(body))
		}
		r := assertESCall(t, f, "GET", "/_cluster/health", "", noContentType) // 同时断言没有认证头
		if got := r.Header.Values("A-Header"); len(got) != 1 || got[0] != "content" {
			t.Fatalf("A-Header = %q, want [content]", got)
		}
		if got := r.Header.Get("B-Header"); got != "" {
			t.Fatalf("B-Header should not be forwarded, got %q", got)
		}
	})

	// 有意差异：缺 host 时 Scala 抛 MissingTargetHostException 返回 500，Go 返回 400
	t.Run("missing host", func(t *testing.T) {
		h := testServer(t, nil).Handler()
		ensure(t, h, "/navbar", `{}`, 400, `{"error":"Missing required parameter host"}`)
	})
}
