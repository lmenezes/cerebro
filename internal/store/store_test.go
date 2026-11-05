package store

import (
	"context"
	"database/sql"
	"path/filepath"
	"testing"
	"time"
)

// 对应 test/dao/RestRequestDAOSpec.scala
func TestHistory(t *testing.T) {
	ctx := context.Background()
	s, err := Open(filepath.Join(t.TempDir(), "sub", "cerebro.db"), 3)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()

	// create a new entry：md5 与 Scala 版一致
	entry := Request{Path: "somePath", Method: "someMethod", Body: "theBody", Username: "admin", CreatedAt: time.UnixMilli(123)}
	if got := entry.MD5(); got != "f909cacf3de2c117ca3c08e472bd1d88" {
		t.Fatalf("md5 = %s", got)
	}
	if err := s.Save(ctx, entry); err != nil {
		t.Fatal(err)
	}

	// update an existing entry
	now := time.Now()
	other := Request{Path: "otherPath", Method: "otherMethod", Body: "otherBody", Username: "admin", CreatedAt: now}
	if other.MD5() != "fad24b7447043f5412c89b12e2b7697c" {
		t.Fatalf("md5 = %s", other.MD5())
	}
	if err := s.Save(ctx, other); err != nil {
		t.Fatal(err)
	}
	other.CreatedAt = now.Add(time.Millisecond)
	if err := s.Save(ctx, other); err != nil {
		t.Fatal(err)
	}
	all, _ := s.All(ctx, "admin")
	if len(all) != 2 || all[0].CreatedAt.UnixMilli() != other.CreatedAt.UnixMilli() {
		t.Fatalf("update failed: %+v", all)
	}

	// ensures history has max size
	base := time.Now().Add(time.Hour)
	for i, p := range []string{"request1", "request2", "request3"} {
		if err := s.Save(ctx, Request{Path: p, Method: "GET", Body: "{}", Username: "admin", CreatedAt: base.Add(time.Duration(i) * time.Millisecond)}); err != nil {
			t.Fatal(err)
		}
	}
	all, err = s.All(ctx, "admin")
	if err != nil {
		t.Fatal(err)
	}
	if len(all) != 3 || all[0].Path != "request3" || all[1].Path != "request2" || all[2].Path != "request1" {
		t.Fatalf("unexpected history: %+v", all)
	}
	if all[2].CreatedAt.UnixMilli() != base.UnixMilli() {
		t.Fatalf("created_at mismatch")
	}

	// 其他用户互不影响
	if err := s.Save(ctx, Request{Path: "x", Method: "GET", Body: "{}", Username: "bob", CreatedAt: base}); err != nil {
		t.Fatal(err)
	}

	// clear all entries for given user
	n, err := s.Clear(ctx, "admin")
	if err != nil || n != 3 {
		t.Fatalf("clear = %d, %v", n, err)
	}
	if bob, _ := s.All(ctx, "bob"); len(bob) != 1 {
		t.Fatalf("bob history = %+v", bob)
	}
}

// 旧版 Play evolutions 建的库（带 play_evolutions 表、无 IF NOT EXISTS）要能直接用。
func TestOpenLegacyDatabase(t *testing.T) {
	path := filepath.Join(t.TempDir(), "cerebro.db")
	db, err := sql.Open("sqlite", "file:"+path)
	if err != nil {
		t.Fatal(err)
	}
	stmts := []string{
		`CREATE TABLE play_evolutions (id int not null primary key, hash varchar(255) not null, applied_at timestamp not null, apply_script text, revert_script text, state varchar(255), last_problem text)`,
		`CREATE TABLE rest_requests (id INTEGER PRIMARY KEY, username TEXT, path TEXT NOT NULL, method TEXT NOT NULL, body TEXT NOT NULL, md5 TEXT NOT NULL, created_at INTEGER)`,
		`CREATE INDEX username_idx ON rest_requests(username)`,
		`CREATE UNIQUE INDEX md5_idx ON rest_requests(md5)`,
		`INSERT INTO rest_requests (username, path, method, body, md5, created_at) VALUES ('', '_search', 'GET', '{}', 'abc', 1600000000000)`,
	}
	for _, q := range stmts {
		if _, err := db.Exec(q); err != nil {
			t.Fatal(err)
		}
	}
	_ = db.Close()

	s, err := Open(path, 50)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()
	all, err := s.All(context.Background(), "")
	if err != nil || len(all) != 1 || all[0].Path != "_search" || all[0].CreatedAt.UnixMilli() != 1600000000000 {
		t.Fatalf("legacy rows = %+v, %v", all, err)
	}
}
