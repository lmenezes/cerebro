package models

import (
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/models/repository/RepositoriesSpec.scala。
func TestRepositories(t *testing.T) {
	cases := []struct {
		name string
		data string
		want any
	}{
		{"parse all repository info", `
{
  "some_repo_with_settings": {
    "type": "s3",
    "settings": {
      "bucket": "bucket_name",
      "region": "us"
    }
  }
}`, []any{jsonx.Obj(
			"name", "some_repo_with_settings",
			"type", "s3",
			"settings", jsonx.Obj(
				"bucket", "bucket_name",
				"region", "us",
			),
		)}},
		{"tolerate missing settings for repository", `
{
  "some_repo_with_settings": {
    "type": "s3"
  }
}`, []any{jsonx.Obj(
			"name", "some_repo_with_settings",
			"type", "s3",
			"settings", jsonx.NewObject(),
		)}},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got, err := Repositories(jsonx.MustParse(c.data))
			if err != nil {
				t.Fatal(err)
			}
			assertSpecJSON(t, got, c.want)
		})
	}

	// 不是对象时报格式错误（对应 Scala 的 UnexpectedResponseFormatException）
	if _, err := Repositories(jsonx.MustParse(`[]`)); err == nil {
		t.Error("数组输入应返回错误")
	}
}
