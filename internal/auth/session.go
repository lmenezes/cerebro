// Package auth 实现 Cerebro 自身的登录：签名会话 cookie、Basic（bcrypt）和 LDAP。
package auth

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

const (
	CookieName = "CEREBRO_SESSION"
	keyFile    = "session.key"
)

// Session 是 cookie 里的会话内容。
type Session struct {
	User     string `json:"u,omitempty"`
	Redirect string `json:"r,omitempty"`
	Flash    string `json:"f,omitempty"`
	State    string `json:"s,omitempty"` // OIDC 登录过程中的 state
	Nonce    string `json:"n,omitempty"` // OIDC 登录过程中的 nonce
	Verifier string `json:"v,omitempty"` // OIDC 登录过程中的 PKCE code_verifier
	Expires  int64  `json:"e"`
}

// Sessions 负责签名和校验会话 cookie。
type Sessions struct {
	key    []byte
	maxAge time.Duration
	path   string
	secure *bool
	now    func() time.Time
}

// NewSessions 创建会话管理器，path 是 cookie 的 Path（即 basePath）。
func NewSessions(key []byte, maxAge time.Duration, path string, secure *bool) *Sessions {
	return &Sessions{key: key, maxAge: maxAge, path: path, secure: secure, now: time.Now}
}

// LoadOrCreateKey 读取 dataDir/session.key，不存在就随机生成；secret 非空时直接用它。
// 返回的 bool 表示密钥是否只在内存里（重启后会话失效）。
func LoadOrCreateKey(secret, dataDir string) ([]byte, bool, error) {
	if secret != "" {
		sum := sha256.Sum256([]byte(secret))
		return sum[:], false, nil
	}
	path := filepath.Join(dataDir, keyFile)
	if data, err := os.ReadFile(path); err == nil { //nolint:gosec // 路径来自配置
		key, err := hex.DecodeString(strings.TrimSpace(string(data)))
		if err != nil || len(key) < 32 {
			return nil, false, fmt.Errorf("invalid session key in %s, delete it to regenerate", path)
		}
		return key, false, nil
	} else if !errors.Is(err, os.ErrNotExist) {
		return nil, false, fmt.Errorf("read session key: %w", err)
	}
	key := make([]byte, 32)
	if _, err := rand.Read(key); err != nil {
		return nil, false, err
	}
	if err := os.MkdirAll(dataDir, 0o750); err == nil {
		if err := os.WriteFile(path, []byte(hex.EncodeToString(key)+"\n"), 0o600); err == nil {
			return key, false, nil
		}
	}
	slog.Warn("cannot persist session key, sessions will not survive a restart", "path", path)
	return key, true, nil
}

func (s *Sessions) sign(payload []byte) string {
	mac := hmac.New(sha256.New, s.key)
	mac.Write(payload)
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

// Get 读取并校验会话，无效时返回空会话。
func (s *Sessions) Get(r *http.Request) Session {
	c, err := r.Cookie(CookieName)
	if err != nil {
		return Session{}
	}
	payload, sig, ok := strings.Cut(c.Value, ".")
	if !ok {
		return Session{}
	}
	raw, err := base64.RawURLEncoding.DecodeString(payload)
	if err != nil || !hmac.Equal([]byte(s.sign(raw)), []byte(sig)) {
		return Session{}
	}
	var sess Session
	if json.Unmarshal(raw, &sess) != nil || s.now().Unix() > sess.Expires {
		return Session{}
	}
	return sess
}

// Save 写入会话；会话为空时清除 cookie。
func (s *Sessions) Save(w http.ResponseWriter, r *http.Request, sess Session) {
	cookie := &http.Cookie{ //nolint:gosec // Secure 按 HTTPS 或配置决定，HttpOnly 和 SameSite 已设置
		Name:     CookieName,
		Path:     s.path,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Secure:   s.isSecure(r),
	}
	if sess.User == "" && sess.Redirect == "" && sess.Flash == "" && sess.State == "" {
		cookie.MaxAge = -1
		http.SetCookie(w, cookie)
		return
	}
	sess.Expires = s.now().Add(s.maxAge).Unix()
	raw, _ := json.Marshal(sess)
	cookie.Value = base64.RawURLEncoding.EncodeToString(raw) + "." + s.sign(raw)
	http.SetCookie(w, cookie)
}

func (s *Sessions) isSecure(r *http.Request) bool {
	if s.secure != nil {
		return *s.secure
	}
	return r.TLS != nil || strings.EqualFold(r.Header.Get("X-Forwarded-Proto"), "https")
}
