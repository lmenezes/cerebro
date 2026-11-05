package auth

import (
	"bytes"
	"crypto/sha256"
	"crypto/tls"
	"encoding/base64"
	"encoding/hex"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

var testKey = []byte("0123456789abcdef0123456789abcdef")

// saveCookie 保存会话并取出 cookie。
func saveCookie(t *testing.T, s *Sessions, r *http.Request, sess Session) *http.Cookie {
	t.Helper()
	if r == nil {
		r = httptest.NewRequest(http.MethodGet, "/", nil)
	}
	rec := httptest.NewRecorder()
	s.Save(rec, r, sess)
	cs := rec.Result().Cookies()
	if len(cs) != 1 || cs[0].Name != CookieName {
		t.Fatalf("want one %s cookie, got %v", CookieName, cs)
	}
	return cs[0]
}

func getWith(s *Sessions, c *http.Cookie) Session {
	r := httptest.NewRequest(http.MethodGet, "/", nil)
	if c != nil {
		r.AddCookie(c)
	}
	return s.Get(r)
}

func TestSessionRoundTrip(t *testing.T) {
	s := NewSessions(testKey, time.Hour, "/cerebro/", nil)
	c := saveCookie(t, s, nil, Session{User: "alice", Redirect: "/cerebro/?a=1"})
	if c.Path != "/cerebro/" || !c.HttpOnly || c.SameSite != http.SameSiteLaxMode {
		t.Fatalf("cookie attrs: %+v", c)
	}
	got := getWith(s, c)
	if got.User != "alice" || got.Redirect != "/cerebro/?a=1" {
		t.Fatalf("got %+v", got)
	}
	if got := getWith(s, nil); got.User != "" {
		t.Fatalf("no cookie: %+v", got)
	}
}

func TestSessionTampered(t *testing.T) {
	s := NewSessions(testKey, time.Hour, "/", nil)
	c := saveCookie(t, s, nil, Session{User: "alice"})
	payload, sig, _ := strings.Cut(c.Value, ".")
	raw, _ := base64.RawURLEncoding.DecodeString(payload)
	forged := base64.RawURLEncoding.EncodeToString(bytes.Replace(raw, []byte("alice"), []byte("admin"), 1))
	for name, v := range map[string]string{
		"改 payload": forged + "." + sig,
		"改签名":       payload + "." + strings.Repeat("A", len(sig)),
		"无签名":       payload,
		"空签名":       payload + ".",
		"非 base64":  "!!!." + sig,
	} {
		if got := getWith(s, &http.Cookie{Name: CookieName, Value: v}); got.User != "" {
			t.Errorf("%s: accepted %+v", name, got)
		}
	}
}

func TestSessionOtherKeyRejected(t *testing.T) {
	other := NewSessions([]byte("another-key-another-key-another!!"), time.Hour, "/", nil)
	c := saveCookie(t, other, nil, Session{User: "admin"})
	s := NewSessions(testKey, time.Hour, "/", nil)
	if got := getWith(s, c); got.User != "" {
		t.Fatalf("cookie signed with another key accepted: %+v", got)
	}
}

func TestSessionExpired(t *testing.T) {
	now := time.Unix(1_700_000_000, 0)
	s := NewSessions(testKey, time.Hour, "/", nil)
	s.now = func() time.Time { return now }
	c := saveCookie(t, s, nil, Session{User: "alice"})
	now = now.Add(59 * time.Minute)
	if getWith(s, c).User != "alice" {
		t.Fatal("session should still be valid")
	}
	now = now.Add(2 * time.Minute)
	if got := getWith(s, c); got.User != "" {
		t.Fatalf("expired session accepted: %+v", got)
	}
}

func TestSessionEmptyClearsCookie(t *testing.T) {
	s := NewSessions(testKey, time.Hour, "/x/", nil)
	c := saveCookie(t, s, nil, Session{})
	if c.MaxAge >= 0 || c.Value != "" || c.Path != "/x/" {
		t.Fatalf("want deletion cookie, got %+v", c)
	}
}

func TestSessionSecureFlag(t *testing.T) {
	plain := httptest.NewRequest(http.MethodGet, "/", nil)
	viaTLS := httptest.NewRequest(http.MethodGet, "/", nil)
	viaTLS.TLS = &tls.ConnectionState{}
	proxied := httptest.NewRequest(http.MethodGet, "/", nil)
	proxied.Header.Set("X-Forwarded-Proto", "https")
	yes, no := true, false
	cases := []struct {
		name   string
		secure *bool
		r      *http.Request
		want   bool
	}{
		{"自动-http", nil, plain, false},
		{"自动-tls", nil, viaTLS, true},
		{"自动-代理 https", nil, proxied, true},
		{"强制 true", &yes, plain, true},
		{"强制 false", &no, viaTLS, false},
	}
	for _, c := range cases {
		s := NewSessions(testKey, time.Hour, "/", c.secure)
		if got := saveCookie(t, s, c.r, Session{User: "u"}).Secure; got != c.want {
			t.Errorf("%s: Secure=%v, want %v", c.name, got, c.want)
		}
	}
}

func TestLoadOrCreateKeyPersists(t *testing.T) {
	dir := filepath.Join(t.TempDir(), "data")
	k1, ephemeral, err := LoadOrCreateKey("", dir)
	if err != nil || ephemeral || len(k1) < 32 {
		t.Fatalf("first: key=%d ephemeral=%v err=%v", len(k1), ephemeral, err)
	}
	fi, err := os.Stat(filepath.Join(dir, "session.key"))
	if err != nil {
		t.Fatal(err)
	}
	if perm := fi.Mode().Perm(); perm != 0o600 {
		t.Fatalf("session.key perm = %o, want 600", perm)
	}
	k2, _, err := LoadOrCreateKey("", dir)
	if err != nil || !bytes.Equal(k1, k2) {
		t.Fatalf("second call should reuse the key: %v", err)
	}
}

func TestLoadOrCreateKeySecret(t *testing.T) {
	dir := t.TempDir()
	secret := "a-very-long-secret-that-is-at-least-32-chars"
	k, ephemeral, err := LoadOrCreateKey(secret, dir)
	if err != nil || ephemeral {
		t.Fatal(err, ephemeral)
	}
	want := sha256.Sum256([]byte(secret))
	if !bytes.Equal(k, want[:]) {
		t.Fatal("explicit secret should be used")
	}
	if _, err := os.Stat(filepath.Join(dir, "session.key")); !os.IsNotExist(err) {
		t.Fatalf("session.key should not be created when secret is set: %v", err)
	}
}

func TestLoadOrCreateKeyInvalidFile(t *testing.T) {
	dir := t.TempDir()
	for _, content := range []string{"not-hex\n", hex.EncodeToString([]byte("short")) + "\n"} {
		_ = os.WriteFile(filepath.Join(dir, "session.key"), []byte(content), 0o600)
		if _, _, err := LoadOrCreateKey("", dir); err == nil {
			t.Errorf("%q: want error", content)
		}
	}
}

func TestLoadOrCreateKeyUnwritableDir(t *testing.T) {
	if os.Getuid() == 0 {
		t.Skip("root 可以写只读目录")
	}
	dir := t.TempDir()
	if err := os.Chmod(dir, 0o500); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = os.Chmod(dir, 0o700) })
	k, ephemeral, err := LoadOrCreateKey("", dir)
	if err != nil || !ephemeral || len(k) < 32 {
		t.Fatalf("want ephemeral key, got len=%d ephemeral=%v err=%v", len(k), ephemeral, err)
	}
}
