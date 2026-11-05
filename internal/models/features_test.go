package models

import (
	"testing"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

func TestDataStreams(t *testing.T) {
	streams := jsonx.MustParse(`{"data_streams":[{"name":"logs-app-default","timestamp_field":{"name":"@timestamp"},
	  "indices":[{"index_name":".ds-logs-app-default-2026.11.05-000001","index_uuid":"u"}],"generation":1,
	  "status":"GREEN","template":"logs","ilm_policy":"logs","hidden":false,"system":false}]}`)
	stats := jsonx.MustParse(`{"data_streams":[{"data_stream":"logs-app-default","backing_indices":1,"store_size_bytes":12345,"maximum_timestamp":1700000000000}]}`)
	got, err := DataStreams(streams, stats)
	if err != nil {
		t.Fatal(err)
	}
	want := jsonx.MustParse(`[{"name":"logs-app-default","status":"GREEN","template":"logs","ilm_policy":"logs","generation":1,
	  "indices":[".ds-logs-app-default-2026.11.05-000001"],"timestamp_field":"@timestamp","hidden":false,"system":false,
	  "store_size_bytes":12345,"maximum_timestamp":1700000000000}]`)
	if !jsonx.Equal(got, want) {
		t.Fatalf("got %s", jsonx.String(got))
	}
	if _, err := DataStreams(jsonx.MustParse(`{}`), nil); err == nil {
		t.Fatal("missing data_streams should fail")
	}
}

func TestObjectToList(t *testing.T) {
	got, err := ObjectToList(jsonx.MustParse(`{"b":{"version":1,"policy":{"phases":{}}},"a":{"version":2}}`))
	if err != nil {
		t.Fatal(err)
	}
	if jsonx.String(got) != `[{"name":"b","version":1,"policy":{"phases":{}}},{"name":"a","version":2}]` {
		t.Fatalf("got %s", jsonx.String(got))
	}
	if NamedList(jsonx.MustParse(`{}`), "x") == nil {
		t.Fatal("NamedList should return empty array")
	}
}
