package models

import (
	"github.com/RitterHou/cerebro/internal/jsonx"
)

// OpenIndices 对应 analysis.OpenIndices：_cat/indices 中状态为 open 的索引名。
func OpenIndices(data any) (out any, err error) {
	defer recoverFormat(&err)
	arr, ok := data.([]any)
	if !ok {
		fail([]string{"$"})
	}
	result := []any{}
	for _, idx := range arr {
		if mustStr(idx, "status") == "open" {
			result = append(result, mustStr(idx, "index"))
		}
	}
	return result, nil
}

// Tokens 对应 analysis.Tokens。
func Tokens(data any) (out any, err error) {
	defer recoverFormat(&err)
	return must(data, "tokens"), nil
}

// IndexAnalyzers 对应 analysis.IndexAnalyzers：索引里自定义的分析器名。
func IndexAnalyzers(index string, settings any) any {
	return keysAsArray(objOrEmpty(settings, index, "settings", "index", "analysis", "analyzer"))
}

// 可做分析的字段类型。原实现只有 text（和 ES 2.x 的 string）；7.x 起的这几种同样走分析器。
var analyzableTypes = map[string]bool{"text": true, "match_only_text": true, "search_as_you_type": true, "annotated_text": true}

func analyzable(v any, keys ...string) bool {
	t, ok := jsonx.StringAt(v, keys...)
	return ok && analyzableTypes[t]
}

// IndexFields 对应 analysis.IndexFields：7.x 起 mapping 没有 type 层，直接读 mappings.properties。
func IndexFields(index string, mapping any) (out any, err error) {
	defer recoverFormat(&err)
	mustObj(mapping, index, "mappings")
	fields := extractProperties(jsonx.At(mapping, index, "mappings", "properties"))
	result := make([]any, 0, len(fields))
	for _, f := range fields {
		result = append(result, f)
	}
	return result, nil
}

func extractProperties(data any) []string {
	obj, ok := data.(*jsonx.Object)
	if !ok {
		return nil
	}
	var out []string
	for _, p := range obj.Keys() {
		prop, _ := obj.Get(p)
		switch {
		case jsonx.ObjectAt(prop, "properties") != nil:
			for _, sub := range extractProperties(jsonx.At(prop, "properties")) {
				out = append(out, p+"."+sub)
			}
		case jsonx.ObjectAt(prop, "fields") != nil:
			fields := jsonx.ObjectAt(prop, "fields")
			for _, f := range fields.Keys() {
				if analyzable(fields, f, "type") {
					out = append(out, p+"."+f)
				}
			}
			if analyzable(prop, "type") {
				out = append(out, p)
			}
		case analyzable(prop, "type"):
			out = append(out, p)
		}
	}
	return out
}
