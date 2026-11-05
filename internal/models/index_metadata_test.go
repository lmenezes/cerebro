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
	// 同时去掉 _doc 类型层，7.x 起建索引不接受
	assertSpecJSON(t, got, jsonx.MustParse(`{
  "mappings": {"properties": {"title": {"type": "text"}}},
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

// 去掉 ES 生成、不能显式设置的索引设置，其余原样保留。
func TestIndexMetadataStripsPrivateSettings(t *testing.T) {
	data := jsonx.MustParse(`{"metadata": {"indices": {"idx": {
  "settings": {"index": {"routing": {"allocation": {"include": {"_tier_preference": "data_content"}}},
    "number_of_shards": "3", "provided_name": "idx", "creation_date": "1", "creation_date_string": "x",
    "analysis": {"analyzer": {"a": {"type": "custom", "tokenizer": "standard"}}},
    "number_of_replicas": "1", "uuid": "u", "version": {"created": "9060000", "created_string": "9.3.2"},
    "history": {"uuid": "h"}, "resize": {"source": {"name": "s"}}}},
  "mappings": {"_doc": {"dynamic": "strict", "properties": {"t": {"type": "text"}}}}}}}}`)
	got, err := IndexMetadata("idx", data)
	if err != nil {
		t.Fatal(err)
	}
	assertSpecJSON(t, got, jsonx.MustParse(`{
  "mappings": {"dynamic": "strict", "properties": {"t": {"type": "text"}}},
  "settings": {"index": {"routing": {"allocation": {"include": {"_tier_preference": "data_content"}}},
    "number_of_shards": "3", "analysis": {"analyzer": {"a": {"type": "custom", "tokenizer": "standard"}}},
    "number_of_replicas": "1"}}
}`))
}
