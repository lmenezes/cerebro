package config

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// 一个合法的 bcrypt 哈希（密码 "secret"）。
const testHash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

func env(m map[string]string) func(string) string {
	return func(k string) string { return m[k] }
}

// load 把 yaml 写到临时文件后加载。
func load(t *testing.T, yaml string, vars map[string]string) (*Config, error) {
	t.Helper()
	path := filepath.Join(t.TempDir(), "cerebro.yaml")
	if err := os.WriteFile(path, []byte(yaml), 0o600); err != nil {
		t.Fatal(err)
	}
	return Load(path, env(vars))
}

func mustLoad(t *testing.T, yaml string, vars map[string]string) *Config {
	t.Helper()
	cfg, err := load(t, yaml, vars)
	if err != nil {
		t.Fatal(err)
	}
	return cfg
}

func TestDefaults(t *testing.T) {
	cfg := mustLoad(t, "", nil)
	checks := []struct {
		name      string
		got, want any
	}{
		{"port", cfg.Port, 9000},
		{"basePath", cfg.BasePath, "/"},
		{"dataDir", cfg.DataDir, "."},
		{"readOnly", cfg.ReadOnly, false},
		{"history.size", cfg.History.Size, 50},
		{"history.enabled", cfg.History.IsEnabled(), true},
		{"history.path", cfg.History.Path, "cerebro.db"},
		{"session.maxAge", cfg.Session.MaxAge.Duration, 7 * 24 * time.Hour},
		{"es.timeout", cfg.ES.Timeout.Duration, 2 * time.Minute},
		{"auth.type", cfg.Auth.Type, "none"},
		{"ldap.method", cfg.Auth.LDAP.Method, "simple"},
		{"log.level", cfg.Log.Level, "info"},
		{"log.format", cfg.Log.Format, "text"},
		{"hosts", len(cfg.Hosts), 0},
	}
	for _, c := range checks {
		if c.got != c.want {
			t.Errorf("%s = %v, want %v", c.name, c.got, c.want)
		}
	}
}

func TestLoadWithoutFile(t *testing.T) {
	t.Chdir(t.TempDir())
	cfg, err := Load("", env(map[string]string{"CEREBRO_PORT": "1234"}))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Port != 1234 {
		t.Fatalf("port = %d", cfg.Port)
	}
	// 显式指定的文件不存在要报错
	if _, err := Load(filepath.Join(t.TempDir(), "missing.yaml"), env(nil)); err == nil {
		t.Fatal("explicit missing file should fail")
	}
	if _, err := Load("", env(map[string]string{"CEREBRO_CONFIG": "/nonexistent/cerebro.yaml"})); err == nil {
		t.Fatal("missing CEREBRO_CONFIG file should fail")
	}
}

func TestLoadFromCEREBROCONFIG(t *testing.T) {
	path := filepath.Join(t.TempDir(), "c.yaml")
	_ = os.WriteFile(path, []byte("port: 7000\n"), 0o600)
	cfg, err := Load("", env(map[string]string{"CEREBRO_CONFIG": path}))
	if err != nil || cfg.Port != 7000 {
		t.Fatalf("cfg=%+v err=%v", cfg, err)
	}
}

func TestYAMLFields(t *testing.T) {
	cfg := mustLoad(t, `
address: 127.0.0.1
port: 8080
basePath: /cerebro
dataDir: /data
readOnly: true
session:
  secret: 0123456789abcdef0123456789abcdef
  maxAge: 12h
history:
  enabled: false
  size: 10
es:
  timeout: 30s
  tls:
    ca: /ca.pem
    insecureSkipVerify: true
auth:
  type: Basic
  basic:
    users:
      - username: admin
        password: "`+testHash+`"
hosts:
  - name: prod
    host: https://es.example.com:9200/
    readOnly: true
    headersWhitelist: [X-Proxy-User]
    auth:
      apiKey: abc
    tls:
      serverName: es.internal
log:
  level: debug
  format: json
`, nil)
	if cfg.Address != "127.0.0.1" || cfg.Port != 8080 || cfg.BasePath != "/cerebro/" || !cfg.ReadOnly {
		t.Fatalf("top-level: %+v", cfg)
	}
	if cfg.Session.MaxAge.Duration != 12*time.Hour || cfg.ES.Timeout.Duration != 30*time.Second {
		t.Fatalf("durations: %v %v", cfg.Session.MaxAge, cfg.ES.Timeout)
	}
	if cfg.History.IsEnabled() || cfg.History.Size != 10 || cfg.History.Path != filepath.Join("/data", "cerebro.db") {
		t.Fatalf("history: %+v", cfg.History)
	}
	if cfg.Auth.Type != "basic" || len(cfg.Auth.Basic.Users) != 1 || cfg.Auth.Basic.Users[0].IsPlain() {
		t.Fatalf("auth: %+v", cfg.Auth)
	}
	h := cfg.Hosts[0]
	if h.Name != "prod" || !h.ReadOnly || h.Auth.APIKey != "abc" || h.TLS.ServerName != "es.internal" || h.HeadersWhitelist[0] != "X-Proxy-User" {
		t.Fatalf("host: %+v", h)
	}
	if !cfg.ES.TLS.Insecure() || cfg.ES.TLS.CA != "/ca.pem" {
		t.Fatalf("es.tls: %+v", cfg.ES.TLS)
	}
}

func TestEnvExpansion(t *testing.T) {
	cfg := mustLoad(t, `
session:
  secret: ${SECRET}
auth:
  type: basic
  basic:
    users:
      - username: ${ADMIN_USER}
        password: `+testHash+`
hosts:
  - name: prod
    host: ${ES_URL}
    auth:
      username: elastic
      password: "${ES_PWD}"
`, map[string]string{
		"SECRET":     "0123456789abcdef0123456789abcdef-env",
		"ADMIN_USER": "root",
		"ES_URL":     "http://es:9200",
		"ES_PWD":     "pw",
		"2a":         "BROKEN", "10": "BROKEN", // 不能被当成变量
	})
	if cfg.Session.Secret != "0123456789abcdef0123456789abcdef-env" {
		t.Errorf("secret = %q", cfg.Session.Secret)
	}
	u := cfg.Auth.Basic.Users[0]
	if u.Username != "root" || u.Password != testHash {
		t.Errorf("user = %+v", u)
	}
	if cfg.Hosts[0].Host != "http://es:9200" || cfg.Hosts[0].Auth.Password != "pw" {
		t.Errorf("host = %+v", cfg.Hosts[0])
	}
}

func TestEnvExpansionUnsetIsEmpty(t *testing.T) {
	cfg := mustLoad(t, "session:\n  secret: \"${UNSET}\"\n", nil)
	if cfg.Session.Secret != "" {
		t.Fatalf("secret = %q", cfg.Session.Secret)
	}
}

// 环境变量的值应原样代入，不应被 YAML 再解析一遍。
func TestEnvExpansionSpecialChars(t *testing.T) {
	for _, q := range []string{"${PW}", `"${PW}"`} {
		for _, v := range []string{"p@ss #1", "{abc}", "a: b", "*ref", "x\ny: z", `a"b`, `a\b`} {
			cfg, err := load(t, "hosts:\n  - host: http://es:9200\n    auth:\n      username: u\n      password: "+q+"\n", map[string]string{"PW": v})
			if err != nil || cfg.Hosts[0].Auth.Password != v {
				t.Errorf("password: %s with %q: err=%v", q, v, err)
			}
		}
	}
}

func TestEnvOverrides(t *testing.T) {
	cfg := mustLoad(t, "port: 1000\nhosts:\n  - name: yaml\n    host: http://yaml:9200\n", map[string]string{
		"CEREBRO_PORT":            "8080",
		"CEREBRO_ADDRESS":         "0.0.0.0",
		"CEREBRO_BASE_PATH":       "cerebro",
		"CEREBRO_DATA_DIR":        "/var/lib/cerebro",
		"CEREBRO_READ_ONLY":       "true",
		"CEREBRO_HISTORY_ENABLED": "false",
		"CEREBRO_ES_TIMEOUT":      "5s",
		"CEREBRO_SESSION_MAX_AGE": "1h",
		"CEREBRO_HOSTS":           "local=http://localhost:9200, http://other:9200/?a=b ,,",
	})
	if cfg.Port != 8080 || cfg.Address != "0.0.0.0" || cfg.BasePath != "/cerebro/" || !cfg.ReadOnly {
		t.Fatalf("overrides: port=%d addr=%q base=%q ro=%v", cfg.Port, cfg.Address, cfg.BasePath, cfg.ReadOnly)
	}
	if cfg.History.IsEnabled() || cfg.History.Path != filepath.Join("/var/lib/cerebro", "cerebro.db") {
		t.Fatalf("history: %+v", cfg.History)
	}
	if cfg.ES.Timeout.Duration != 5*time.Second || cfg.Session.MaxAge.Duration != time.Hour {
		t.Fatal("durations not overridden")
	}
	want := [][2]string{{"yaml", "http://yaml:9200"}, {"local", "http://localhost:9200"}, {"http://other:9200/?a=b", "http://other:9200/?a=b"}}
	if len(cfg.Hosts) != len(want) {
		t.Fatalf("hosts: %+v", cfg.Hosts)
	}
	for i, w := range want {
		if cfg.Hosts[i].Name != w[0] || cfg.Hosts[i].Host != w[1] {
			t.Errorf("hosts[%d] = %q=%q, want %q=%q", i, cfg.Hosts[i].Name, cfg.Hosts[i].Host, w[0], w[1])
		}
	}
}

func TestEnvOverrideErrors(t *testing.T) {
	for k, v := range map[string]string{
		"CEREBRO_PORT":       "abc",
		"CEREBRO_READ_ONLY":  "maybe",
		"CEREBRO_ES_TIMEOUT": "forever",
	} {
		if _, err := load(t, "", map[string]string{k: v}); err == nil || !strings.Contains(err.Error(), k) {
			t.Errorf("%s=%s: want error naming the variable, got %v", k, v, err)
		}
	}
}

func TestLegacyLDAPEnv(t *testing.T) {
	cfg := mustLoad(t, "", map[string]string{
		"AUTH_TYPE":               "ldap",
		"LDAP_URL":                "ldap://ldap:389",
		"LDAP_BASE_DN":            "dc=example,dc=com",
		"LDAP_METHOD":             "simple",
		"LDAP_USER_TEMPLATE":      "%s@example.com",
		"LDAP_BIND_DN":            "cn=admin,dc=example,dc=com",
		"LDAP_BIND_PWD":           "bindpw",
		"LDAP_GROUP_BASE_DN":      "ou=groups,dc=example,dc=com",
		"LDAP_USER_ATTR":          "memberUid",
		"LDAP_USER_ATTR_TEMPLATE": "%s",
		"LDAP_GROUP":              "cn=admins",
	})
	l := cfg.Auth.LDAP
	if cfg.Auth.Type != "ldap" || l.URL != "ldap://ldap:389" || l.BaseDN != "dc=example,dc=com" || l.UserTemplate != "%s@example.com" ||
		l.BindDN != "cn=admin,dc=example,dc=com" || l.BindPassword != "bindpw" || l.GroupSearch.BaseDN != "ou=groups,dc=example,dc=com" ||
		l.GroupSearch.UserAttr != "memberUid" || l.GroupSearch.UserAttrTemplate != "%s" || l.GroupSearch.Group != "cn=admins" {
		t.Fatalf("ldap: %+v", cfg.Auth)
	}
}

func TestLegacyBasicEnv(t *testing.T) {
	cfg := mustLoad(t, "", map[string]string{"AUTH_TYPE": "basic", "BASIC_AUTH_USER": "admin", "BASIC_AUTH_PWD": "plain"})
	if len(cfg.Auth.Basic.Users) != 1 {
		t.Fatalf("users: %+v", cfg.Auth.Basic.Users)
	}
	u := cfg.Auth.Basic.Users[0]
	if u.Username != "admin" || u.Password != "plain" || !u.IsPlain() {
		t.Fatalf("user: %+v plain=%v", u, u.IsPlain())
	}
	cfg = mustLoad(t, "", map[string]string{"AUTH_TYPE": "basic", "BASIC_AUTH_USER": "admin", "BASIC_AUTH_PWD": testHash})
	if cfg.Auth.Basic.Users[0].IsPlain() {
		t.Fatal("bcrypt hash from env should not be plain")
	}
}

func TestValidationErrors(t *testing.T) {
	cases := []struct{ name, yaml, want string }{
		{"未知登录类型", "auth:\n  type: oauth\n", "unknown auth.type"},
		{"basic 没有用户", "auth:\n  type: basic\n", "users is empty"},
		{"YAML 明文密码", "auth:\n  type: basic\n  basic:\n    users:\n      - username: admin\n        password: plain\n", "bcrypt"},
		{"用户名为空", "auth:\n  type: basic\n  basic:\n    users:\n      - password: \"" + testHash + "\"\n", "username is required"},
		{"ldap 缺 url", "auth:\n  type: ldap\n  ldap:\n    userTemplate: '%s'\n", "auth.ldap.url"},
		{"ldap 不支持的方法", "auth:\n  type: ldap\n  ldap:\n    url: ldap://x\n    userTemplate: '%s'\n    method: digest\n", "not supported"},
		{"ldap 组搜索缺参数", "auth:\n  type: ldap\n  ldap:\n    url: ldap://x\n    userTemplate: '%s'\n    groupSearch:\n      group: cn=admins\n", "bindDN"},
		{"地址缺协议", "hosts:\n  - host: localhost:9200\n", "invalid host"},
		{"地址不是 http", "hosts:\n  - host: ftp://es:9200\n", "invalid host"},
		{"地址没有主机", "hosts:\n  - host: 'http://'\n", "invalid host"},
		{"重复名字", "hosts:\n  - name: a\n    host: http://x:9200\n  - name: a\n    host: http://y:9200\n", "duplicate name"},
		{"重复地址（无名字）", "hosts:\n  - host: http://x:9200\n  - host: http://x:9200\n", "duplicate name"},
		{"secret 太短", "session:\n  secret: short\n", "at least 32"},
		{"一个集群多种凭据", "hosts:\n  - host: http://x:9200\n    auth:\n      username: u\n      password: p\n      apiKey: k\n", "only one of"},
		{"bearer+apiKey", "hosts:\n  - host: http://x:9200\n    auth:\n      apiKey: k\n      bearer: b\n", "only one of"},
		{"未知字段", "prot: 9000\n", "prot"},
		{"未知嵌套字段", "hosts:\n  - host: http://x:9200\n    pasword: x\n", "pasword"},
		{"端口为 0", "port: 0\n", "invalid port"},
		{"端口过大", "port: 70000\n", "invalid port"},
		{"时长格式错误", "es:\n  timeout: forever\n", "invalid duration"},
		{"未知日志格式", "log:\n  format: xml\n", "log.format"},
	}
	for _, c := range cases {
		if _, err := load(t, c.yaml, nil); err == nil || !strings.Contains(err.Error(), c.want) {
			t.Errorf("%s: want error containing %q, got %v", c.name, c.want, err)
		}
	}
}

func TestBasePathNormalisation(t *testing.T) {
	for in, want := range map[string]string{
		"":          "/",
		"/":         "/",
		"//":        "/",
		"cerebro":   "/cerebro/",
		"/cerebro":  "/cerebro/",
		"cerebro/":  "/cerebro/",
		"/cerebro/": "/cerebro/",
		"/a/b":      "/a/b/",
	} {
		cfg := mustLoad(t, "", map[string]string{"CEREBRO_BASE_PATH": in})
		if in == "" {
			cfg = mustLoad(t, "basePath: ''\n", nil)
		}
		if cfg.BasePath != want {
			t.Errorf("%q -> %q, want %q", in, cfg.BasePath, want)
		}
	}
}

func TestHistoryPathDefault(t *testing.T) {
	cfg := mustLoad(t, "dataDir: /srv/cerebro\n", nil)
	if cfg.History.Path != filepath.Join("/srv/cerebro", "cerebro.db") {
		t.Fatalf("history path = %q", cfg.History.Path)
	}
	cfg = mustLoad(t, "dataDir: /srv/cerebro\nhistory:\n  path: /tmp/h.db\n", nil)
	if cfg.History.Path != "/tmp/h.db" {
		t.Fatalf("explicit history path = %q", cfg.History.Path)
	}
	cfg = mustLoad(t, "", map[string]string{"CEREBRO_HISTORY_PATH": "/x/y.db"})
	if cfg.History.Path != "/x/y.db" {
		t.Fatalf("env history path = %q", cfg.History.Path)
	}
}

func TestHostNameDefaultsToURL(t *testing.T) {
	cfg := mustLoad(t, "hosts:\n  - host: ' http://x:9200 '\n", nil)
	if cfg.Hosts[0].Name != "http://x:9200" || cfg.Hosts[0].Host != "http://x:9200" {
		t.Fatalf("host: %+v", cfg.Hosts[0])
	}
}

func TestIsBcrypt(t *testing.T) {
	for s, want := range map[string]bool{
		testHash:                            true,
		"$2b$12$" + strings.Repeat("a", 53): true,
		"$2y$10$" + strings.Repeat("a", 53): true,
		"plain":                             false,
		"$2a$10$short":                      false,
		"$1$abc$" + strings.Repeat("a", 53): false,
	} {
		if IsBcrypt(s) != want {
			t.Errorf("IsBcrypt(%q) != %v", s, want)
		}
	}
}

// 没加引号的 ${VAR} 展开成数字、布尔值时仍按原类型解析。
func TestEnvExpansionKeepsTypes(t *testing.T) {
	cfg, err := load(t, "port: ${P}\nreadOnly: ${RO}\nhistory:\n  size: ${S}\n", map[string]string{"P": "9100", "RO": "true", "S": "7"})
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Port != 9100 || !cfg.ReadOnly || cfg.History.Size != 7 {
		t.Fatalf("got port=%d readOnly=%v size=%d", cfg.Port, cfg.ReadOnly, cfg.History.Size)
	}
}

// 地址里的凭据挪到 auth，并从地址和默认名字里去掉。
func TestHostURLCredentials(t *testing.T) {
	cfg, err := load(t, "hosts:\n  - host: https://elastic:s3cret@es.example.com/es\n", nil)
	if err != nil {
		t.Fatal(err)
	}
	h := cfg.Hosts[0]
	if h.Host != "https://es.example.com/es" || h.Name != "https://es.example.com/es" || h.Auth == nil || h.Auth.Username != "elastic" || h.Auth.Password != "s3cret" {
		t.Fatalf("%+v %+v", h, h.Auth)
	}
	if _, err := load(t, "hosts:\n  - host: https://u:p@es\n    auth:\n      apiKey: k\n", nil); err == nil {
		t.Fatal("credentials in both places should fail")
	}
	if _, err := load(t, "auth:\n  type: ldap\n  ldap:\n    url: ldaps://l\n    userTemplate: '%s'\n    startTLS: true\n", nil); err == nil {
		t.Fatal("ldaps + startTLS should fail")
	}
}
