package models

import "github.com/RitterHou/cerebro/internal/jsonx"

// 第三阶段新页面用到的数据加工。

// NamedList 把 {"<key>": [{"name": ..., ...}]} 里的数组取出来，缺失时返回空数组。
func NamedList(data any, key string) any {
	if arr, ok := jsonx.ArrayAt(data, key); ok {
		return arr
	}
	return []any{}
}

// ObjectToList 把 {name: {...}} 展开成 [{"name": name, ...原有字段}]，用于 ILM/SLM 策略。
func ObjectToList(data any) (out any, err error) {
	defer recoverFormat(&err)
	obj, ok := data.(*jsonx.Object)
	if !ok {
		fail([]string{"$"})
	}
	result := make([]any, 0, obj.Len())
	for _, name := range obj.Keys() {
		v, _ := obj.Get(name)
		item := jsonx.Obj("name", name)
		for _, k := range jsonx.ObjectAt(v).Keys() {
			val, _ := jsonx.ObjectAt(v).Get(k)
			item.Set(k, val)
		}
		result = append(result, item)
	}
	return result, nil
}

// DataStreams 合并 _data_stream 和 _data_stream/_stats，每个 data stream 一行。
func DataStreams(streams, stats any) (out any, err error) {
	defer recoverFormat(&err)
	sizes := map[string]any{}
	maxTS := map[string]any{}
	statsArr, _ := jsonx.ArrayAt(stats, "data_streams")
	for _, s := range statsArr {
		name, _ := jsonx.StringAt(s, "data_stream")
		sizes[name] = jsonx.At(s, "store_size_bytes")
		maxTS[name] = jsonx.At(s, "maximum_timestamp")
	}
	arr := mustArr(streams, "data_streams")
	result := make([]any, 0, len(arr))
	for _, ds := range arr {
		name := mustStr(ds, "name")
		indices, _ := jsonx.ArrayAt(ds, "indices")
		indexNames := make([]any, 0, len(indices))
		for _, idx := range indices {
			indexNames = append(indexNames, jsonx.At(idx, "index_name"))
		}
		result = append(result, jsonx.Obj(
			"name", name,
			"status", optOrNull(ds, "status"),
			"template", optOrNull(ds, "template"),
			"ilm_policy", optOrNull(ds, "ilm_policy"),
			"generation", optOrNull(ds, "generation"),
			"indices", indexNames,
			"timestamp_field", optOrNull(ds, "timestamp_field", "name"),
			"hidden", jsonx.At(ds, "hidden") == true,
			"system", jsonx.At(ds, "system") == true,
			"store_size_bytes", sizes[name],
			"maximum_timestamp", maxTS[name],
		))
	}
	return result, nil
}
