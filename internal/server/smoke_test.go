package server

import "testing"

func TestHarnessNavbar(t *testing.T) {
	f := newFakeES(t).on("GET /_cluster/health", 200, `{"cluster_name":"es","status":"green"}`)
	h := testServer(t, nil).Handler()
	status, body := call(t, h, "/navbar", hostBody(f.url(), ""))
	if status != 200 {
		t.Fatal(status)
	}
	assertJSON(t, body, `{"cluster_name":"es","status":"green"}`)
}
