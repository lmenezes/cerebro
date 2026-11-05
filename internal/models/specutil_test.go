package models

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// readSpecFixture 读取 testdata 下的 JSON 夹具（保持键顺序）。
func readSpecFixture(t *testing.T, rel string) any {
	t.Helper()
	b, err := os.ReadFile(filepath.Join("testdata", rel))
	if err != nil {
		t.Fatal(err)
	}
	v, err := jsonx.Parse(b)
	if err != nil {
		t.Fatalf("解析 %s 失败: %v", rel, err)
	}
	return v
}

// assertSpecJSON 按 Play JsValue 语义比较（对象无序、数组有序），失败时打印两边。
func assertSpecJSON(t *testing.T, got, want any) {
	t.Helper()
	if !jsonx.Equal(got, want) {
		t.Errorf("JSON 不相等\n got: %s\nwant: %s", jsonx.String(got), jsonx.String(want))
	}
}
