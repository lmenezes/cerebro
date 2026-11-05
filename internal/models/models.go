// Package models 把 ES 的原始响应加工成前端需要的结构，逐一对应 Scala 版 app/models。
package models

import (
	"encoding/json"
	"math"
	"strings"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

// FormatError 表示 ES 响应缺少必需字段或类型不符，等价于 Play 的 JsResultException。
type FormatError struct{ Path string }

func (e *FormatError) Error() string { return "unexpected response format at [" + e.Path + "]" }

// recoverFormat 把内部 panic(*FormatError) 转成返回值。
func recoverFormat(err *error) {
	if r := recover(); r != nil {
		fe, ok := r.(*FormatError)
		if !ok {
			panic(r)
		}
		*err = fe
	}
}

func fail(keys []string) { panic(&FormatError{Path: strings.Join(keys, ".")}) }

// must 取必需字段（等价 .as[JsValue]）。
func must(v any, keys ...string) any {
	r, ok := jsonx.Path(v, keys...)
	if !ok {
		fail(keys)
	}
	return r
}

func mustObj(v any, keys ...string) *jsonx.Object {
	o, ok := must(v, keys...).(*jsonx.Object)
	if !ok {
		fail(keys)
	}
	return o
}

func mustArr(v any, keys ...string) []any {
	a, ok := must(v, keys...).([]any)
	if !ok {
		fail(keys)
	}
	return a
}

func mustStr(v any, keys ...string) string {
	s, ok := must(v, keys...).(string)
	if !ok {
		fail(keys)
	}
	return s
}

func mustNum(v any, keys ...string) json.Number {
	n, ok := must(v, keys...).(json.Number)
	if !ok {
		fail(keys)
	}
	return n
}

// optStrOrNull 取字符串，缺失或类型不符时返回 null。
func optStrOrNull(v any, keys ...string) any {
	if s, ok := jsonx.StringAt(v, keys...); ok {
		return s
	}
	return nil
}

// optOrNull 取任意值，缺失时返回 null（等价 asOpt[JsValue]）。
func optOrNull(v any, keys ...string) any {
	return jsonx.At(v, keys...)
}

func numOrZero(v any, keys ...string) json.Number {
	if n, ok := jsonx.NumberAt(v, keys...); ok {
		return n
	}
	return json.Number("0")
}

func objOrEmpty(v any, keys ...string) *jsonx.Object {
	if o := jsonx.ObjectAt(v, keys...); o != nil {
		return o
	}
	return jsonx.NewObject()
}

func keysAsArray(o *jsonx.Object) []any {
	out := make([]any, 0, o.Len())
	for _, k := range o.Keys() {
		out = append(out, k)
	}
	return out
}

// float32 截断取整，NaN 为 0，越界饱和，同 JVM 的 Float.toInt。
func f32ToInt(f float32) int64 {
	switch {
	case f != f:
		return 0
	case f >= math.MaxInt32:
		return math.MaxInt32
	case f <= math.MinInt32:
		return math.MinInt32
	}
	return int64(f)
}

// Math.round(float)：floor(x+0.5)，NaN 为 0，越界饱和。
func roundF32(f float32) int64 {
	if f != f {
		return 0
	}
	return f32ToInt(float32(math.Floor(float64(f) + 0.5)))
}

func int64At(v any, keys ...string) (int64, bool) {
	return jsonx.Int64(jsonx.At(v, keys...))
}
