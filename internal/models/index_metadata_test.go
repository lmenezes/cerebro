package models

import (
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/models/IndexMetadataSpec.scala：should extract mappings and settings from metadata。
// Go 版 IndexMetadata 多了第一个参数 index，直接读 metadata.indices.<index>。
func TestIndexMetadata(t *testing.T) {
	data := jsonx.MustParse(`
{
  "cluster_name": "elasticsearch",
  "metadata": {
    "cluster_uuid": "_na_",
    "templates": {},
    "indices": {
      "index_name": {
        "state": "open",
        "settings": {
          "some_settings": {

          }
        },
        "mappings": {
          "some_mappings": {

          }
        },
        "aliases": [
          "alias_1",
          "alias_2"
        ]
      }
    }
  }
}`)
	got, err := IndexMetadata("index_name", data)
	if err != nil {
		t.Fatal(err)
	}
	assertSpecJSON(t, got, jsonx.Obj(
		"mappings", jsonx.Obj("some_mappings", jsonx.NewObject()),
		"settings", jsonx.Obj("some_settings", jsonx.NewObject()),
	))
}

// 新行为：metadata.templates 里的旧版模板自带 settings/mappings 且排在 indices 之前时，
// Scala 版（递归取第一个 mappings/settings）会拿到模板的，Go 版取 metadata.indices.<index>。
func TestIndexMetadataIgnoresTemplates(t *testing.T) {
	data := jsonx.MustParse(`
{
  "cluster_name": "elasticsearch",
  "metadata": {
    "cluster_uuid": "abc",
    "templates": {
      "legacy_template": {
        "order": 0,
        "index_patterns": ["index_*"],
        "settings": {
          "index": {"number_of_shards": "3"}
        },
        "mappings": {
          "_doc": {"properties": {"from_template": {"type": "keyword"}}}
        },
        "aliases": {}
      }
    },
    "indices": {
      "other_index": {
        "state": "open",
        "settings": {"index": {"number_of_shards": "5"}},
        "mappings": {"_doc": {"properties": {"other": {"type": "long"}}}}
      },
      "index_name": {
        "state": "open",
        "settings": {"index": {"number_of_shards": "1"}},
        "mappings": {"_doc": {"properties": {"title": {"type": "text"}}}},
        "aliases": []
      }
    }
  }
}`)
	got, err := IndexMetadata("index_name", data)
	if err != nil {
		t.Fatal(err)
	}
	assertSpecJSON(t, got, jsonx.MustParse(`{
  "mappings": {"_doc": {"properties": {"title": {"type": "text"}}}},
  "settings": {"index": {"number_of_shards": "1"}}
}`))

	// 请求的是别名时 ES 返回的是实际索引名，此时取 indices 里的第一个
	alias, err := IndexMetadata("some_alias", data)
	if err != nil {
		t.Fatal(err)
	}
	assertSpecJSON(t, jsonx.At(alias, "settings"), jsonx.MustParse(`{"index": {"number_of_shards": "5"}}`))

	// indices 为空时报格式错误
	empty := jsonx.MustParse(`{"metadata": {"templates": {}, "indices": {}}}`)
	if _, err := IndexMetadata("index_name", empty); err == nil {
		t.Error("indices 为空时应返回错误")
	}
}
