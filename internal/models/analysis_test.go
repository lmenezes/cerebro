package models

import (
	"strings"
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// 对应 test/models/analysis/OpenIndicesSpec.scala（原 spec 描述误写成 IndexAnalyzers）。
func TestOpenIndices(t *testing.T) {
	data := jsonx.MustParse(`
[
  {
    "health": "yellow",
    "status": "open",
    "index": "some_index",
    "pri": "5",
    "rep": "1",
    "docs.count": "0",
    "docs.deleted": "0",
    "store.size": "795b",
    "pri.store.size": "795b"
  },
  {
    "health": null,
    "status": "close",
    "index": "some_other_index",
    "pri": null,
    "rep": null,
    "docs.count": null,
    "docs.deleted": null,
    "store.size": null,
    "pri.store.size": null
  }
]`)
	got, err := OpenIndices(data)
	if err != nil {
		t.Fatal(err)
	}
	assertSpecJSON(t, got, []any{"some_index"})
}

// 对应 test/models/analysis/TokensSpec.scala：returns tokens as an array。
func TestTokens(t *testing.T) {
	data := jsonx.MustParse(`
{
  "tokens": [
    {
       "token": "foo",
       "position": 0,
       "start_offset": 0,
       "end_offset": 3
    }
  ]
}`)
	got, err := Tokens(data)
	if err != nil {
		t.Fatal(err)
	}
	want := []any{jsonx.Obj(
		"token", "foo",
		"position", jsonx.Num(0),
		"start_offset", jsonx.Num(0),
		"end_offset", jsonx.Num(3),
	)}
	assertSpecJSON(t, got, want)
}

// 对应 test/models/analysis/IndexAnalyzersSpec.scala：should return all analyzers。
func TestIndexAnalyzers(t *testing.T) {
	data := jsonx.MustParse(`
{
  "index_name": {
    "settings": {
      "index": {
        "analysis": {
          "filter": {},
          "analyzer": {
            "some_analyzer": {
              "filter": [
                "lowercase"
              ],
              "tokenizer": "whitespace"
            },
            "other_analyzer": {
              "filter": [
                "lowercase"
              ],
              "tokenizer": "keyword"
            }
          }
        }
      }
    }
  }
}`)
	assertSpecJSON(t, IndexAnalyzers("index_name", data), []any{"some_analyzer", "other_analyzer"})
	// 没有自定义分析器时返回空数组
	assertSpecJSON(t, IndexAnalyzers("index_name", jsonx.MustParse(`{"index_name": {"settings": {"index": {}}}}`)), []any{})
}

// 以下 IndexFields 夹具逐字取自 test/models/analysis/IndexFieldsSpec.scala（字段类型是 ES 2.x 的 string）。
const (
	indexFieldsRegular = `
{
  "index_name": {
    "mappings": {
      "properties": {
        "regular_field": {
          "type": "string"
        },
        "regular_field_2": {
          "type": "string",
          "analyzer": "standard"
        },
        "ignored_field": {
          "type": "integer"
        }
      }
    }
  }
}`
	indexFieldsMultipleTypes = `
{
  "index_name": {
    "mappings": {
      "type_1": {
        "properties": {
          "regular_field": {
            "type": "string"
          }
        }
      },
      "type_2": {
        "properties": {
          "regular_field_2": {
            "type": "string",
            "analyzer": "standard"
          }
        }
      }
    }
  }
}`
	indexFieldsMultiFields = `
{
  "index_name": {
    "mappings": {
      "properties": {
        "multi_field": {
          "type": "string",
          "fields": {
            "sub_field": {
              "type": "string"
            },
            "ignored_sub_field": {
              "type": "integer"
            }
          }
        }
      }
    }
  }
}`
	indexFieldsObjects = `
{
  "index_name": {
    "mappings": {
      "properties": {
        "object_type": {
          "properties": {
            "first_level_property": {
              "properties": {
                "second_level_property": {
                  "type": "string"
                }
              }
            },
            "first_level_property_2": {
              "properties": {
                "second_level_property": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  }
}`
	// 新增：7.x 起 mappings 里 properties 旁边常见 dynamic/_source/_meta/dynamic_templates，Scala 版会把它们当 doc type 而抛异常。
	indexFieldsMappingSiblings = `
{
  "index_name": {
    "mappings": {
      "dynamic": "strict",
      "_source": {
        "enabled": false
      },
      "_meta": {
        "owner": "team"
      },
      "dynamic_templates": [
        {
          "strings": {
            "match_mapping_type": "string",
            "mapping": {
              "type": "keyword"
            }
          }
        }
      ],
      "properties": {
        "title": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "tag": {
          "type": "keyword"
        }
      }
    }
  }
}`
)

// textTypes 把 2.x 的 string 换成 7.x 起的 text，用来在新版本格式下验证原 spec 的期望。
func textTypes(s string) string {
	return strings.ReplaceAll(s, `"type": "string"`, `"type": "text"`)
}

// 对应 test/models/analysis/IndexFieldsSpec.scala。
func TestIndexFields(t *testing.T) {
	cases := []struct {
		name    string
		mapping string
		want    []any
		wantErr bool
	}{
		// should return only string fields：Go 版只认 text，换成 text 后期望不变
		{"regularFields", textTypes(indexFieldsRegular), []any{"regular_field", "regular_field_2"}, false},
		// 去掉了 ES 2.x 的 string 类型：原样夹具不再有可分析字段
		{"regularFields 原样 2.x string", indexFieldsRegular, []any{}, false},
		// should return fields from all types（FIXME < 7）：不再读 doc type 层，7.x 以下格式得到空数组
		{"multipleTypes 不再支持", textTypes(indexFieldsMultipleTypes), []any{}, false},
		// should return sub fields on multi fields fields：换成 text 后期望不变
		{"multiFields", textTypes(indexFieldsMultiFields), []any{"multi_field.sub_field", "multi_field"}, false},
		// should return properties of object fields：换成 text 后期望不变
		{"objects", textTypes(indexFieldsObjects), []any{
			"object_type.first_level_property.second_level_property",
			"object_type.first_level_property_2.second_level_property",
		}, false},
		// 新增：忽略 properties 的兄弟键
		{"忽略 dynamic/_source 等兄弟键", indexFieldsMappingSiblings, []any{"title"}, false},
		// 新增：空索引的 mappings 没有 properties
		{"空 mappings", `{"index_name": {"mappings": {}}}`, []any{}, false},
		// 新增：缺少 mappings 时报格式错误（与 Scala 的 .as[JsObject] 一致）
		{"缺少 mappings", `{"index_name": {}}`, nil, true},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got, err := IndexFields("index_name", jsonx.MustParse(c.mapping))
			if c.wantErr {
				if err == nil {
					t.Fatalf("期望错误，得到 %s", jsonx.String(got))
				}
				return
			}
			if err != nil {
				t.Fatal(err)
			}
			assertSpecJSON(t, got, c.want)
		})
	}
}

// 7.x 起的 match_only_text、search_as_you_type 等字段同样可以分析。
func TestIndexFieldsNewTextTypes(t *testing.T) {
	data := jsonx.MustParse(`{"idx":{"mappings":{"properties":{
	  "msg":{"type":"match_only_text"},"title":{"type":"search_as_you_type"},"k":{"type":"keyword"},
	  "body":{"type":"keyword","fields":{"txt":{"type":"match_only_text"}}}}}}}`)
	got, err := IndexFields("idx", data)
	if err != nil {
		t.Fatal(err)
	}
	if jsonx.String(got) != `["msg","title","body.txt"]` {
		t.Fatalf("got %s", jsonx.String(got))
	}
}
