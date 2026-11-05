package jsonx

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestParseKeepsOrderAndRoundTrips(t *testing.T) {
	in := `{"b":1,"a":[true,false,null,"x\"yé<>&"],"c":{"z":1.50,"y":-2e10},"d":""}`
	v, err := Parse([]byte(in))
	if err != nil {
		t.Fatal(err)
	}
	if got := ObjectAt(v).Keys(); len(got) != 4 || got[0] != "b" || got[1] != "a" || got[3] != "d" {
		t.Fatalf("keys order lost: %v", got)
	}
	out := String(v)
	want := `{"b":1,"a":[true,false,null,"x\"yé<>&"],"c":{"z":1.50,"y":-2e10},"d":""}`
	if out != want {
		t.Fatalf("got %s\nwant %s", out, want)
	}
}

func TestParseErrors(t *testing.T) {
	for _, s := range []string{``, `{`, `{"a"}`, `[1,]`, `01`, `"abc`, `tru`, `{"a":1}x`, "\"a\x01\"", `-`, `1.`, `1e`} {
		if _, err := Parse([]byte(s)); err == nil {
			t.Errorf("expected error for %q", s)
		}
	}
}

func TestParseMatchesStdlib(t *testing.T) {
	for _, s := range []string{`"😀 \n\t\\ \/"`, `[0,-0.5,1E+3,123456789012345678901234567890]`, `{"":{"":[]}}`} {
		v, err := Parse([]byte(s))
		if err != nil {
			t.Fatal(err)
		}
		var std any
		dec := json.NewDecoder(strings.NewReader(s))
		dec.UseNumber()
		if err := dec.Decode(&std); err != nil {
			t.Fatal(err)
		}
		a, _ := json.Marshal(std)
		b, _ := json.Marshal(normalize(v))
		if string(a) != string(b) {
			t.Errorf("%s: got %s want %s", s, b, a)
		}
	}
}

func normalize(v any) any {
	switch t := v.(type) {
	case *Object:
		m := map[string]any{}
		for _, k := range t.Keys() {
			m[k] = normalize(t.m[k])
		}
		return m
	case []any:
		out := make([]any, len(t))
		for i := range t {
			out[i] = normalize(t[i])
		}
		return out
	}
	return v
}

func TestFindAllOrder(t *testing.T) {
	v := MustParse(`{"name":"a","x":{"name":"b","y":[{"name":"c"}]},"z":{"name":{"name":"d"}}}`)
	got := String(FindAll(v, "name"))
	want := `["a","b","c",{"name":"d"},"d"]`
	if got != want {
		t.Fatalf("got %s want %s", got, want)
	}
}

func TestEqual(t *testing.T) {
	a := MustParse(`{"a":1,"b":[1,2]}`)
	b := MustParse(`{"b":[1.0,2],"a":1}`)
	if !Equal(a, b) {
		t.Fatal("should be equal")
	}
	if Equal(MustParse(`[1,2]`), MustParse(`[2,1]`)) {
		t.Fatal("arrays are ordered")
	}
}

func TestObjectOps(t *testing.T) {
	o := Obj("a", 1, "b", 2, "c", 3)
	o.Delete("b")
	o.Set("a", 4)
	if String(o) != `{"a":4,"c":3}` {
		t.Fatal(String(o))
	}
	if n, ok := Int64(json.Number("3.0")); !ok || n != 3 {
		t.Fatal("Int64 3.0")
	}
	if _, ok := Int64(json.Number("3.5")); ok {
		t.Fatal("Int64 3.5")
	}
}
