package auth

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/go-ldap/ldap/v3"

	"github.com/RitterHou/cerebro/internal/config"
)

func TestBasicAuthenticate(t *testing.T) {
	hash, err := HashPassword("s3cret")
	if err != nil {
		t.Fatal(err)
	}
	if !config.IsBcrypt(hash) {
		t.Fatalf("HashPassword returned non-bcrypt %q", hash)
	}
	b, err := NewBasic([]config.BasicUser{{Username: "admin", Password: hash}})
	if err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	if u, ok := b.Authenticate(ctx, "admin", "s3cret"); !ok || u != "admin" {
		t.Fatalf("correct password: %q %v", u, ok)
	}
	for _, c := range [][2]string{{"admin", "wrong"}, {"admin", ""}, {"nobody", "s3cret"}, {"", ""}} {
		if _, ok := b.Authenticate(ctx, c[0], c[1]); ok {
			t.Errorf("%v accepted", c)
		}
	}
}

// 旧环境变量里的明文密码在启动时哈希，仍能登录。
func TestBasicPlainPasswordFromEnv(t *testing.T) {
	path := filepath.Join(t.TempDir(), "cerebro.yaml")
	_ = os.WriteFile(path, nil, 0o600)
	env := map[string]string{"AUTH_TYPE": "basic", "BASIC_AUTH_USER": "admin", "BASIC_AUTH_PWD": "plain-pw"}
	cfg, err := config.Load(path, func(k string) string { return env[k] })
	if err != nil {
		t.Fatal(err)
	}
	a, err := New(cfg.Auth)
	if err != nil {
		t.Fatal(err)
	}
	if u, ok := a.Authenticate(context.Background(), "admin", "plain-pw"); !ok || u != "admin" {
		t.Fatal("plain password from env should work")
	}
	if _, ok := a.Authenticate(context.Background(), "admin", "other"); ok {
		t.Fatal("wrong password accepted")
	}
}

func TestNewByType(t *testing.T) {
	if a, err := New(config.AuthConfig{Type: "none"}); err != nil || a != nil {
		t.Fatalf("none: %v %v", a, err)
	}
	if a, err := New(config.AuthConfig{Type: "basic"}); err != nil {
		t.Fatal(err)
	} else if _, ok := a.(*Basic); !ok {
		t.Fatalf("basic: got %T", a)
	}
	if a, err := New(config.AuthConfig{Type: "ldap", LDAP: config.LDAPConfig{URL: "ldap://x", UserTemplate: "%s"}}); err != nil {
		t.Fatal(err)
	} else if _, ok := a.(*LDAP); !ok {
		t.Fatalf("ldap: got %T", a)
	}
}

func TestNewLDAPBadCA(t *testing.T) {
	garbage := filepath.Join(t.TempDir(), "ca.pem")
	_ = os.WriteFile(garbage, []byte("garbage"), 0o600)
	for _, ca := range []string{garbage, filepath.Join(t.TempDir(), "missing.pem")} {
		if _, err := NewLDAP(config.LDAPConfig{URL: "ldaps://x", UserTemplate: "%s", CA: ca}); err == nil {
			t.Errorf("CA %s: want error", ca)
		}
	}
}

func TestFormatLikeJava(t *testing.T) {
	cases := []struct {
		tmpl string
		args []string
		want string
	}{
		{"uid=%s,%s", []string{"john", "ou=people,dc=example,dc=com"}, "uid=john,ou=people,dc=example,dc=com"},
		{"%s@example.com", []string{"john", "dc=example,dc=com"}, "john@example.com"},
		{"cn=%s", []string{"john", "dc=x"}, "cn=john"},
		{"EXAMPLE\\%s", []string{"john", "dc=x"}, "EXAMPLE\\john"},
		{"fixed", []string{"john", "dc=x"}, "fixed"},
	}
	for _, c := range cases {
		if got := format(c.tmpl, c.args...); got != c.want {
			t.Errorf("format(%q) = %q, want %q", c.tmpl, got, c.want)
		}
	}
}

// fakeLDAP 记录绑定和搜索，按 DN 返回绑定错误。
type fakeLDAP struct {
	dials     int
	dialErr   error
	binds     [][2]string
	bindErr   map[string]error
	searches  []*ldap.SearchRequest
	result    *ldap.SearchResult
	searchErr error
	closed    int
}

func (f *fakeLDAP) Bind(dn, pw string) error {
	f.binds = append(f.binds, [2]string{dn, pw})
	return f.bindErr[dn]
}

func (f *fakeLDAP) Search(req *ldap.SearchRequest) (*ldap.SearchResult, error) {
	f.searches = append(f.searches, req)
	return f.result, f.searchErr
}

func (f *fakeLDAP) Close() error { f.closed++; return nil }

func newFakeLDAP(t *testing.T, cfg config.LDAPConfig) (*LDAP, *fakeLDAP) {
	t.Helper()
	l, err := NewLDAP(cfg)
	if err != nil {
		t.Fatal(err)
	}
	f := &fakeLDAP{bindErr: map[string]error{}}
	l.dial = func(context.Context) (ldapConn, error) {
		f.dials++
		if f.dialErr != nil {
			return nil, f.dialErr
		}
		return f, nil
	}
	return l, f
}

func oneEntry() *ldap.SearchResult {
	return &ldap.SearchResult{Entries: []*ldap.Entry{ldap.NewEntry("cn=x", nil)}}
}

func TestLDAPUserBind(t *testing.T) {
	cases := []struct{ tmpl, want string }{
		{"uid=%s,%s", "uid=john,ou=people,dc=example,dc=com"},
		{"%s@example.com", "john@example.com"},
	}
	for _, c := range cases {
		l, f := newFakeLDAP(t, config.LDAPConfig{URL: "ldap://x", BaseDN: "ou=people,dc=example,dc=com", UserTemplate: c.tmpl})
		u, ok := l.Authenticate(context.Background(), "john", "pw")
		if !ok || u != "john" {
			t.Fatalf("%s: login failed", c.tmpl)
		}
		if len(f.binds) != 1 || f.binds[0] != [2]string{c.want, "pw"} {
			t.Fatalf("%s: binds %v", c.tmpl, f.binds)
		}
		if len(f.searches) != 0 || f.closed != f.dials {
			t.Fatalf("searches=%d closed=%d dials=%d", len(f.searches), f.closed, f.dials)
		}
	}
}

func TestLDAPEmptyCredentialsNoDial(t *testing.T) {
	l, f := newFakeLDAP(t, config.LDAPConfig{URL: "ldap://x", UserTemplate: "%s"})
	for _, c := range [][2]string{{"john", ""}, {"", "pw"}, {"", ""}} {
		if _, ok := l.Authenticate(context.Background(), c[0], c[1]); ok {
			t.Errorf("%v accepted", c)
		}
	}
	if f.dials != 0 {
		t.Fatalf("dialed %d times for empty credentials", f.dials)
	}
}

func TestLDAPInvalidCredentials(t *testing.T) {
	l, f := newFakeLDAP(t, config.LDAPConfig{URL: "ldap://x", UserTemplate: "%s"})
	f.bindErr["john"] = ldap.NewError(ldap.LDAPResultInvalidCredentials, errors.New("invalid credentials"))
	if _, ok := l.Authenticate(context.Background(), "john", "bad"); ok {
		t.Fatal("invalid credentials accepted")
	}
	if f.closed != 1 {
		t.Fatalf("conn not closed: %d", f.closed)
	}
}

func TestLDAPDialError(t *testing.T) {
	l, f := newFakeLDAP(t, config.LDAPConfig{URL: "ldap://x", UserTemplate: "%s"})
	f.dialErr = errors.New("connection refused")
	if _, ok := l.Authenticate(context.Background(), "john", "pw"); ok {
		t.Fatal("dial error should fail login")
	}
}

func groupCfg() config.LDAPConfig {
	return config.LDAPConfig{
		URL: "ldap://x", BaseDN: "dc=example,dc=com", UserTemplate: "uid=%s,%s",
		BindDN: "cn=admin,dc=example,dc=com", BindPassword: "bindpw",
		GroupSearch: config.LDAPGroupSearch{BaseDN: "ou=groups,dc=example,dc=com", UserAttr: "memberUid", UserAttrTemplate: "%s", Group: "cn=admins"},
	}
}

func TestLDAPGroupSearchFilter(t *testing.T) {
	l, f := newFakeLDAP(t, groupCfg())
	f.result = oneEntry()
	user := `jo*hn)(uid=*`
	if _, ok := l.Authenticate(context.Background(), user, "pw"); !ok {
		t.Fatal("member should log in")
	}
	if len(f.searches) != 1 {
		t.Fatalf("searches: %d", len(f.searches))
	}
	s := f.searches[0]
	want := "(&(memberUid=" + ldap.EscapeFilter(user) + ")(cn=admins))"
	if s.Filter != want {
		t.Fatalf("filter = %q, want %q", s.Filter, want)
	}
	if strings.Contains(s.Filter, "(uid=*") {
		t.Fatalf("username not escaped: %q", s.Filter)
	}
	if s.BaseDN != "ou=groups,dc=example,dc=com" || s.Scope != ldap.ScopeWholeSubtree {
		t.Fatalf("search base/scope: %q %d", s.BaseDN, s.Scope)
	}
	wantBinds := [][2]string{{"cn=admin,dc=example,dc=com", "bindpw"}, {"uid=" + user + ",dc=example,dc=com", "pw"}}
	if len(f.binds) != 2 || f.binds[0] != wantBinds[0] || f.binds[1] != wantBinds[1] {
		t.Fatalf("binds = %v", f.binds)
	}
	if f.closed != f.dials {
		t.Fatalf("closed %d of %d conns", f.closed, f.dials)
	}
}

func TestLDAPGroupFilterVariants(t *testing.T) {
	cases := []struct {
		name   string
		mutate func(*config.LDAPConfig)
		filter string
		base   string
	}{
		{"已带括号不再包", func(c *config.LDAPConfig) { c.GroupSearch.Group = "(|(cn=admins)(cn=ops))" },
			"(&(memberUid=john)(|(cn=admins)(cn=ops)))", "ou=groups,dc=example,dc=com"},
		{"baseDN 回落到全局", func(c *config.LDAPConfig) { c.GroupSearch.BaseDN = "" },
			"(&(memberUid=john)(cn=admins))", "dc=example,dc=com"},
		{"userAttrTemplate 回落到 userTemplate", func(c *config.LDAPConfig) { c.GroupSearch.UserAttrTemplate = "" },
			"(&(memberUid=uid=john,dc=example,dc=com)(cn=admins))", "ou=groups,dc=example,dc=com"},
	}
	for _, c := range cases {
		cfg := groupCfg()
		c.mutate(&cfg)
		l, f := newFakeLDAP(t, cfg)
		f.result = oneEntry()
		if _, ok := l.Authenticate(context.Background(), "john", "pw"); !ok {
			t.Fatalf("%s: login failed", c.name)
		}
		if got := f.searches[0]; got.Filter != c.filter || got.BaseDN != c.base {
			t.Errorf("%s: filter=%q base=%q", c.name, got.Filter, got.BaseDN)
		}
	}
}

func TestLDAPNotInGroup(t *testing.T) {
	l, f := newFakeLDAP(t, groupCfg())
	f.result = &ldap.SearchResult{}
	if _, ok := l.Authenticate(context.Background(), "john", "pw"); ok {
		t.Fatal("non-member accepted")
	}
	if len(f.binds) != 1 {
		t.Fatalf("user bind should not happen for non-member: %v", f.binds)
	}
}

func TestLDAPGroupBindDNFails(t *testing.T) {
	l, f := newFakeLDAP(t, groupCfg())
	f.result = oneEntry()
	f.bindErr["cn=admin,dc=example,dc=com"] = ldap.NewError(ldap.LDAPResultInvalidCredentials, errors.New("bad bind"))
	if _, ok := l.Authenticate(context.Background(), "john", "pw"); ok {
		t.Fatal("bindDN failure should reject login")
	}
	if len(f.searches) != 0 {
		t.Fatal("search should not run after failed bindDN bind")
	}
}

func TestLDAPGroupSizeLimitWithEntries(t *testing.T) {
	l, f := newFakeLDAP(t, groupCfg())
	f.result = oneEntry()
	f.searchErr = ldap.NewError(ldap.LDAPResultSizeLimitExceeded, errors.New("size limit"))
	if _, ok := l.Authenticate(context.Background(), "john", "pw"); !ok {
		t.Fatal("size limit exceeded with entries means member")
	}
	f.result, f.searchErr = nil, errors.New("network")
	if _, ok := l.Authenticate(context.Background(), "john", "pw"); ok {
		t.Fatal("search error should reject")
	}
}

// StartTLS 用的 TLS 配置要带上 LDAP 服务器的主机名，否则证书校验必然失败。
func TestLDAPStartTLSServerName(t *testing.T) {
	l, err := NewLDAP(config.LDAPConfig{URL: "ldap://ldap.example.com:389", StartTLS: true})
	if err != nil {
		t.Fatal(err)
	}
	if got := l.startTLSConfig().ServerName; got != "ldap.example.com" {
		t.Fatalf("ServerName = %q", got)
	}
	if l.tlsConf.ServerName != "" {
		t.Fatal("original config must not be modified")
	}
}
