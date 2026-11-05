// Package store 保存 REST 页面的请求历史，兼容 Scala 版的 rest_requests 表。
package store

import (
	"context"
	"crypto/md5" //nolint:gosec // 只用来去重，兼容旧库里的 md5 列
	"database/sql"
	"encoding/hex"
	"fmt"
	"os"
	"path/filepath"
	"time"

	_ "modernc.org/sqlite" // 纯 Go 的 SQLite 驱动
)

// Request 是一条历史请求。
type Request struct {
	Path      string
	Method    string
	Body      string
	Username  string
	CreatedAt time.Time
}

// MD5 与 Scala 版一致：md5(path + method + body + username) 的十六进制。
func (r Request) MD5() string {
	sum := md5.Sum([]byte(r.Path + r.Method + r.Body + r.Username)) //nolint:gosec
	return hex.EncodeToString(sum[:])
}

// History 是请求历史的存取接口。
type History interface {
	All(ctx context.Context, username string) ([]Request, error)
	Save(ctx context.Context, r Request) error
	Close() error
}

// Noop 不保存任何东西，用于无状态部署。
type Noop struct{}

func (Noop) All(context.Context, string) ([]Request, error) { return []Request{}, nil }
func (Noop) Save(context.Context, Request) error            { return nil }
func (Noop) Close() error                                   { return nil }

// SQLite 是基于 SQLite 的实现。
type SQLite struct {
	db  *sql.DB
	max int
}

const schema = `
CREATE TABLE IF NOT EXISTS rest_requests (
    id INTEGER PRIMARY KEY,
    username TEXT,
    path TEXT NOT NULL,
    method TEXT NOT NULL,
    body TEXT NOT NULL,
    md5 TEXT NOT NULL,
    created_at INTEGER
);
CREATE INDEX IF NOT EXISTS username_idx ON rest_requests(username);
CREATE UNIQUE INDEX IF NOT EXISTS md5_idx ON rest_requests(md5);
`

// Open 打开（必要时创建）数据库文件，max 是每个用户保留的条数。
func Open(path string, max int) (*SQLite, error) {
	if max <= 0 {
		max = 50
	}
	if dir := filepath.Dir(path); dir != "" {
		if err := os.MkdirAll(dir, 0o750); err != nil {
			return nil, fmt.Errorf("create data dir: %w", err)
		}
	}
	// 新建的库只有当前用户可读写：历史里可能有请求体
	if f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_EXCL, 0o600); err == nil { //nolint:gosec // 路径来自配置
		_ = f.Close()
	}
	dsn := "file:" + path + "?_pragma=busy_timeout(5000)"
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(1) // SQLite 单写者，串行化最简单
	if _, err := db.ExecContext(context.Background(), schema); err != nil {
		_ = db.Close()
		return nil, fmt.Errorf("init schema in %s: %w", path, err)
	}
	return &SQLite{db: db, max: max}, nil
}

// All 返回用户的历史，新的在前。
func (s *SQLite) All(ctx context.Context, username string) ([]Request, error) {
	rows, err := s.db.QueryContext(ctx,
		`SELECT path, method, body, COALESCE(username, ''), COALESCE(created_at, 0)
		 FROM rest_requests WHERE username = ? ORDER BY created_at DESC`, username)
	if err != nil {
		return nil, fmt.Errorf("error loading requests for [%s]: %w", username, err)
	}
	defer rows.Close()
	out := []Request{}
	for rows.Next() {
		var r Request
		var ms int64
		if err := rows.Scan(&r.Path, &r.Method, &r.Body, &r.Username, &ms); err != nil {
			return nil, err
		}
		r.CreatedAt = time.UnixMilli(ms)
		out = append(out, r)
	}
	return out, rows.Err()
}

// Save 保存请求：相同请求只更新时间，新请求插入后裁剪到上限。
func (s *SQLite) Save(ctx context.Context, r Request) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer func() { _ = tx.Rollback() }()
	res, err := tx.ExecContext(ctx, `UPDATE rest_requests SET created_at = ? WHERE md5 = ?`, r.CreatedAt.UnixMilli(), r.MD5())
	if err != nil {
		return fmt.Errorf("error while updating request: %w", err)
	}
	if n, _ := res.RowsAffected(); n == 0 {
		if _, err := tx.ExecContext(ctx,
			`INSERT INTO rest_requests (username, path, method, body, md5, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
			r.Username, r.Path, r.Method, r.Body, r.MD5(), r.CreatedAt.UnixMilli()); err != nil {
			return fmt.Errorf("error while storing request: %w", err)
		}
		if _, err := tx.ExecContext(ctx,
			`DELETE FROM rest_requests WHERE id IN (
			   SELECT id FROM rest_requests WHERE username = ? ORDER BY created_at DESC LIMIT -1 OFFSET ?)`,
			r.Username, s.max); err != nil {
			return fmt.Errorf("error while trimming history for [%s]: %w", r.Username, err)
		}
	}
	return tx.Commit()
}

// Close 关闭数据库。
func (s *SQLite) Close() error { return s.db.Close() }

// Ping 用于健康检查。
func (s *SQLite) Ping(ctx context.Context) error { return s.db.PingContext(ctx) }

// Clear 删除用户的全部历史，返回删除条数。
func (s *SQLite) Clear(ctx context.Context, username string) (int64, error) {
	res, err := s.db.ExecContext(ctx, `DELETE FROM rest_requests WHERE username = ?`, username)
	if err != nil {
		return 0, fmt.Errorf("error clearing all requests for [%s]: %w", username, err)
	}
	return res.RowsAffected()
}
