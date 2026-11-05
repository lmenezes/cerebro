// Package jsonx 提供保持对象键顺序的 JSON 值，语义对齐 Play JSON。
//
// 值类型：nil、bool、json.Number、string、[]any、*Object。
package jsonx

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"unicode/utf8"
)

// Object 是保持插入顺序的 JSON 对象。
type Object struct {
	keys []string
	m    map[string]any
}

// NewObject 创建空对象。
func NewObject() *Object { return &Object{m: map[string]any{}} }

// Obj 按 key, value 交替的参数构造对象。
func Obj(kv ...any) *Object {
	o := &Object{m: make(map[string]any, len(kv)/2)}
	for i := 0; i+1 < len(kv); i += 2 {
		o.Set(kv[i].(string), kv[i+1])
	}
	return o
}

// Set 设置键值，新键追加到末尾，已有键原位替换。
func (o *Object) Set(k string, v any) *Object {
	if _, ok := o.m[k]; !ok {
		o.keys = append(o.keys, k)
	}
	o.m[k] = v
	return o
}

// Get 取值，第二个返回值表示键是否存在。
func (o *Object) Get(k string) (any, bool) {
	if o == nil {
		return nil, false
	}
	v, ok := o.m[k]
	return v, ok
}

// Has 判断键是否存在。
func (o *Object) Has(k string) bool { _, ok := o.Get(k); return ok }

// Keys 返回按顺序排列的键。
func (o *Object) Keys() []string {
	if o == nil {
		return nil
	}
	return o.keys
}

// Len 返回键数量。
func (o *Object) Len() int {
	if o == nil {
		return 0
	}
	return len(o.keys)
}

// Delete 删除键。
func (o *Object) Delete(k string) {
	if _, ok := o.m[k]; !ok {
		return
	}
	delete(o.m, k)
	for i, key := range o.keys {
		if key == k {
			o.keys = append(o.keys[:i:i], o.keys[i+1:]...)
			break
		}
	}
}

// MarshalJSON 按键顺序输出，不转义 HTML 字符。
func (o *Object) MarshalJSON() ([]byte, error) {
	var buf bytes.Buffer
	if err := writeValue(&buf, o); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

// Marshal 把值编码为 JSON，不转义 HTML 字符。
func Marshal(v any) ([]byte, error) {
	var buf bytes.Buffer
	if err := writeValue(&buf, v); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

// String 返回紧凑的 JSON 文本，等价于 Play 的 toString。
func String(v any) string {
	b, err := Marshal(v)
	if err != nil {
		return ""
	}
	return string(b)
}

func writeValue(buf *bytes.Buffer, v any) error {
	switch t := v.(type) {
	case nil:
		buf.WriteString("null")
	case *Object:
		if t == nil {
			buf.WriteString("null")
			return nil
		}
		buf.WriteByte('{')
		for i, k := range t.keys {
			if i > 0 {
				buf.WriteByte(',')
			}
			writeString(buf, k)
			buf.WriteByte(':')
			if err := writeValue(buf, t.m[k]); err != nil {
				return err
			}
		}
		buf.WriteByte('}')
	case []any:
		buf.WriteByte('[')
		for i, e := range t {
			if i > 0 {
				buf.WriteByte(',')
			}
			if err := writeValue(buf, e); err != nil {
				return err
			}
		}
		buf.WriteByte(']')
	case string:
		writeString(buf, t)
	case bool:
		if t {
			buf.WriteString("true")
		} else {
			buf.WriteString("false")
		}
	case json.Number:
		buf.WriteString(string(t))
	case json.RawMessage:
		if len(t) == 0 {
			buf.WriteString("null")
			return nil
		}
		if err := json.Compact(buf, t); err != nil {
			return err
		}
	default:
		enc := json.NewEncoder(buf)
		enc.SetEscapeHTML(false)
		if err := enc.Encode(v); err != nil {
			return err
		}
		buf.Truncate(buf.Len() - 1) // 去掉 Encode 追加的换行
	}
	return nil
}

const hexDigits = "0123456789abcdef"

func writeString(buf *bytes.Buffer, s string) {
	buf.WriteByte('"')
	start := 0
	for i := 0; i < len(s); {
		c := s[i]
		if c < utf8.RuneSelf {
			if c >= 0x20 && c != '"' && c != '\\' {
				i++
				continue
			}
			buf.WriteString(s[start:i])
			switch c {
			case '"', '\\':
				buf.WriteByte('\\')
				buf.WriteByte(c)
			case '\n':
				buf.WriteString(`\n`)
			case '\r':
				buf.WriteString(`\r`)
			case '\t':
				buf.WriteString(`\t`)
			default:
				buf.WriteString(`\u00`)
				buf.WriteByte(hexDigits[c>>4])
				buf.WriteByte(hexDigits[c&0xf])
			}
			i++
			start = i
			continue
		}
		r, size := utf8.DecodeRuneInString(s[i:])
		if r == utf8.RuneError && size == 1 {
			buf.WriteString(s[start:i])
			buf.WriteString(`�`)
			i += size
			start = i
			continue
		}
		if r == ' ' || r == ' ' {
			buf.WriteString(s[start:i])
			buf.WriteString(`\u202`)
			buf.WriteByte(hexDigits[r&0xf])
			i += size
			start = i
			continue
		}
		i += size
	}
	buf.WriteString(s[start:])
	buf.WriteByte('"')
}

// ErrSyntax 表示 JSON 语法错误。
var ErrSyntax = errors.New("invalid JSON")

// Parse 解析 JSON，对象保持键顺序，数字保留原文。
func Parse(data []byte) (any, error) {
	p := parser{data: data}
	p.skipWS()
	v, err := p.value(0)
	if err != nil {
		return nil, err
	}
	p.skipWS()
	if p.pos != len(p.data) {
		return nil, p.errorf("unexpected trailing data")
	}
	return v, nil
}

// MustParse 用于测试和常量，解析失败直接 panic。
func MustParse(s string) any {
	v, err := Parse([]byte(s))
	if err != nil {
		panic(err)
	}
	return v
}

const maxDepth = 10000

type parser struct {
	data []byte
	pos  int
}

func (p *parser) errorf(format string, args ...any) error {
	return fmt.Errorf("%w at offset %d: %s", ErrSyntax, p.pos, fmt.Sprintf(format, args...))
}

func (p *parser) skipWS() {
	for p.pos < len(p.data) {
		switch p.data[p.pos] {
		case ' ', '\t', '\n', '\r':
			p.pos++
		default:
			return
		}
	}
}

func (p *parser) value(depth int) (any, error) {
	if depth > maxDepth {
		return nil, p.errorf("nesting too deep")
	}
	if p.pos >= len(p.data) {
		return nil, p.errorf("unexpected end of input")
	}
	switch c := p.data[p.pos]; {
	case c == '{':
		return p.object(depth)
	case c == '[':
		return p.array(depth)
	case c == '"':
		return p.string()
	case c == 't':
		return p.literal("true", true)
	case c == 'f':
		return p.literal("false", false)
	case c == 'n':
		return p.literal("null", nil)
	case c == '-' || (c >= '0' && c <= '9'):
		return p.number()
	default:
		return nil, p.errorf("unexpected character %q", c)
	}
}

func (p *parser) literal(lit string, v any) (any, error) {
	if !bytes.HasPrefix(p.data[p.pos:], []byte(lit)) {
		return nil, p.errorf("invalid literal")
	}
	p.pos += len(lit)
	return v, nil
}

func (p *parser) object(depth int) (any, error) {
	p.pos++ // {
	o := NewObject()
	p.skipWS()
	if p.pos < len(p.data) && p.data[p.pos] == '}' {
		p.pos++
		return o, nil
	}
	for {
		p.skipWS()
		if p.pos >= len(p.data) || p.data[p.pos] != '"' {
			return nil, p.errorf("expected object key")
		}
		k, err := p.string()
		if err != nil {
			return nil, err
		}
		p.skipWS()
		if p.pos >= len(p.data) || p.data[p.pos] != ':' {
			return nil, p.errorf("expected ':'")
		}
		p.pos++
		p.skipWS()
		v, err := p.value(depth + 1)
		if err != nil {
			return nil, err
		}
		o.Set(k, v)
		p.skipWS()
		if p.pos >= len(p.data) {
			return nil, p.errorf("unexpected end of object")
		}
		switch p.data[p.pos] {
		case ',':
			p.pos++
		case '}':
			p.pos++
			return o, nil
		default:
			return nil, p.errorf("expected ',' or '}'")
		}
	}
}

func (p *parser) array(depth int) (any, error) {
	p.pos++ // [
	arr := []any{}
	p.skipWS()
	if p.pos < len(p.data) && p.data[p.pos] == ']' {
		p.pos++
		return arr, nil
	}
	for {
		p.skipWS()
		v, err := p.value(depth + 1)
		if err != nil {
			return nil, err
		}
		arr = append(arr, v)
		p.skipWS()
		if p.pos >= len(p.data) {
			return nil, p.errorf("unexpected end of array")
		}
		switch p.data[p.pos] {
		case ',':
			p.pos++
		case ']':
			p.pos++
			return arr, nil
		default:
			return nil, p.errorf("expected ',' or ']'")
		}
	}
}

func (p *parser) string() (string, error) {
	start := p.pos
	p.pos++ // "
	escaped := false
	for p.pos < len(p.data) {
		c := p.data[p.pos]
		switch {
		case c == '"':
			p.pos++
			raw := p.data[start:p.pos]
			if !escaped {
				if !utf8.Valid(raw) {
					return string(bytes.ToValidUTF8(raw[1:len(raw)-1], []byte("�"))), nil
				}
				return string(raw[1 : len(raw)-1]), nil
			}
			var s string
			if err := json.Unmarshal(raw, &s); err != nil {
				return "", p.errorf("invalid string: %v", err)
			}
			return s, nil
		case c == '\\':
			escaped = true
			p.pos += 2
		case c < 0x20:
			return "", p.errorf("control character in string")
		default:
			p.pos++
		}
	}
	return "", p.errorf("unterminated string")
}

func (p *parser) number() (any, error) {
	start := p.pos
	if p.data[p.pos] == '-' {
		p.pos++
	}
	digits := func() int {
		n := 0
		for p.pos < len(p.data) && p.data[p.pos] >= '0' && p.data[p.pos] <= '9' {
			p.pos++
			n++
		}
		return n
	}
	if p.pos < len(p.data) && p.data[p.pos] == '0' {
		p.pos++
	} else if digits() == 0 {
		return nil, p.errorf("invalid number")
	}
	if p.pos < len(p.data) && p.data[p.pos] == '.' {
		p.pos++
		if digits() == 0 {
			return nil, p.errorf("invalid number")
		}
	}
	if p.pos < len(p.data) && (p.data[p.pos] == 'e' || p.data[p.pos] == 'E') {
		p.pos++
		if p.pos < len(p.data) && (p.data[p.pos] == '+' || p.data[p.pos] == '-') {
			p.pos++
		}
		if digits() == 0 {
			return nil, p.errorf("invalid number")
		}
	}
	return json.Number(p.data[start:p.pos]), nil
}

// Path 依次按键取值，任一层不存在或不是对象都返回 (nil, false)。
func Path(v any, keys ...string) (any, bool) {
	cur := v
	for _, k := range keys {
		o, ok := cur.(*Object)
		if !ok {
			return nil, false
		}
		cur, ok = o.Get(k)
		if !ok {
			return nil, false
		}
	}
	return cur, true
}

// At 同 Path，但只返回值。
func At(v any, keys ...string) any {
	r, _ := Path(v, keys...)
	return r
}

// ObjectAt 取对象，不是对象返回 nil。
func ObjectAt(v any, keys ...string) *Object {
	o, _ := At(v, keys...).(*Object)
	return o
}

// ArrayAt 取数组。
func ArrayAt(v any, keys ...string) ([]any, bool) {
	a, ok := At(v, keys...).([]any)
	return a, ok
}

// StringAt 取字符串。
func StringAt(v any, keys ...string) (string, bool) {
	s, ok := At(v, keys...).(string)
	return s, ok
}

// NumberAt 取数字。
func NumberAt(v any, keys ...string) (json.Number, bool) {
	n, ok := At(v, keys...).(json.Number)
	return n, ok
}

// Int64 把数字转为 int64，非整数或越界返回 false。
func Int64(v any) (int64, bool) {
	n, ok := v.(json.Number)
	if !ok {
		return 0, false
	}
	i, err := strconv.ParseInt(string(n), 10, 64)
	if err != nil {
		f, ferr := strconv.ParseFloat(string(n), 64)
		if ferr != nil || f != float64(int64(f)) {
			return 0, false
		}
		return int64(f), true
	}
	return i, true
}

// Float64 把数字转为 float64。
func Float64(v any) (float64, bool) {
	n, ok := v.(json.Number)
	if !ok {
		return 0, false
	}
	f, err := strconv.ParseFloat(string(n), 64)
	return f, err == nil
}

// Num 由 int64 构造数字。
func Num(i int64) json.Number { return json.Number(strconv.FormatInt(i, 10)) }

// FindAll 递归查找所有名为 key 的字段值，顺序与 Play 的 \\ 一致（深度优先、先序）。
func FindAll(v any, key string) []any {
	out := []any{}
	findAll(v, key, &out)
	return out
}

func findAll(v any, key string, out *[]any) {
	switch t := v.(type) {
	case *Object:
		for _, k := range t.keys {
			val := t.m[k]
			if k == key {
				*out = append(*out, val)
			}
			findAll(val, key, out)
		}
	case []any:
		for _, e := range t {
			findAll(e, key, out)
		}
	}
}

// Equal 按 Play 的语义比较：对象无序、数组有序、数字按数值比较。
func Equal(a, b any) bool {
	switch x := a.(type) {
	case *Object:
		y, ok := b.(*Object)
		if !ok || x.Len() != y.Len() {
			return false
		}
		for _, k := range x.keys {
			yv, ok := y.Get(k)
			if !ok || !Equal(x.m[k], yv) {
				return false
			}
		}
		return true
	case []any:
		y, ok := b.([]any)
		if !ok || len(x) != len(y) {
			return false
		}
		for i := range x {
			if !Equal(x[i], y[i]) {
				return false
			}
		}
		return true
	case json.Number:
		y, ok := b.(json.Number)
		if !ok {
			return false
		}
		if x == y {
			return true
		}
		fx, e1 := strconv.ParseFloat(string(x), 64)
		fy, e2 := strconv.ParseFloat(string(y), 64)
		return e1 == nil && e2 == nil && fx == fy
	default:
		return a == b
	}
}
