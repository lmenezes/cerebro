// Package config 读取 YAML 配置并应用环境变量覆盖。
package config

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"net"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	"go.yaml.in/yaml/v3"
)

// Config 是全部配置。
type Config struct {
	Address  string `yaml:"address"`
	Port     int    `yaml:"port"`
	BasePath string `yaml:"basePath"`
	DataDir  string `yaml:"dataDir"`
	ReadOnly bool   `yaml:"readOnly"`
	// TrustedProxies 是前面的反向代理（CIDR）。来自这些地址的请求按 X-Forwarded-For 识别客户端 IP（用于登录限速）。
	TrustedProxies []string `yaml:"trustedProxies"`
	// UIDir 从目录加载前端（开发和截图比对用），为空时用二进制里嵌入的前端。
	UIDir string `yaml:"uiDir"`
	// AllowUnknownHosts 为 false 时只能连接 hosts 里配置的集群，默认 true。
	AllowUnknownHosts *bool `yaml:"allowUnknownHosts"`

	Session SessionConfig `yaml:"session"`
	History HistoryConfig `yaml:"history"`
	ES      ESConfig      `yaml:"es"`
	Auth    AuthConfig    `yaml:"auth"`
	Hosts   []HostConfig  `yaml:"hosts"`
	Log     LogConfig     `yaml:"log"`
}

// AllowsUnknownHosts 判断能否连接页面上手动输入的地址。
func (c *Config) AllowsUnknownHosts() bool { return c.AllowUnknownHosts == nil || *c.AllowUnknownHosts }

// SessionConfig 是 Cerebro 登录会话设置。
type SessionConfig struct {
	// Secret 为空时首次启动随机生成并保存到 dataDir/session.key。
	Secret string `yaml:"secret"`
	// MaxAge 是会话有效期。
	MaxAge Duration `yaml:"maxAge"`
	// Secure 强制 cookie 只走 HTTPS；为空时按请求是否 HTTPS 判断。
	Secure *bool `yaml:"secure"`
}

// HistoryConfig 是 REST 请求历史设置。
type HistoryConfig struct {
	Enabled *bool  `yaml:"enabled"`
	Size    int    `yaml:"size"`
	Path    string `yaml:"path"`
}

// IsEnabled 默认开启。
func (h HistoryConfig) IsEnabled() bool { return h.Enabled == nil || *h.Enabled }

// ESConfig 是访问 ES 的公共设置，也是手动输入地址时的默认值。
type ESConfig struct {
	Timeout Duration  `yaml:"timeout"`
	TLS     TLSConfig `yaml:"tls"`
}

// TLSConfig 是访问 ES 的 TLS 设置。
type TLSConfig struct {
	CA   string `yaml:"ca"`
	Cert string `yaml:"cert"`
	Key  string `yaml:"key"`
	// InsecureSkipVerify 跳过证书校验；集群上显式写 false 可以覆盖全局的 true
	InsecureSkipVerify *bool  `yaml:"insecureSkipVerify"`
	ServerName         string `yaml:"serverName"`
}

// Insecure 判断是否跳过证书校验。
func (t TLSConfig) Insecure() bool { return t.InsecureSkipVerify != nil && *t.InsecureSkipVerify }

// HostConfig 是预设集群。
type HostConfig struct {
	Name             string     `yaml:"name"`
	Host             string     `yaml:"host"`
	HeadersWhitelist []string   `yaml:"headersWhitelist"`
	ReadOnly         bool       `yaml:"readOnly"`
	Auth             *HostAuth  `yaml:"auth"`
	TLS              *TLSConfig `yaml:"tls"`
}

// HostAuth 是预设凭据，三选一。
type HostAuth struct {
	Username string `yaml:"username"`
	Password string `yaml:"password"`
	APIKey   string `yaml:"apiKey"`
	Bearer   string `yaml:"bearer"`
}

// AuthConfig 是 Cerebro 自身的登录设置。
type AuthConfig struct {
	Type  string      `yaml:"type"` // none、basic、ldap、oidc、proxy
	Basic BasicConfig `yaml:"basic"`
	LDAP  LDAPConfig  `yaml:"ldap"`
	OIDC  OIDCConfig  `yaml:"oidc"`
	Proxy ProxyConfig `yaml:"proxy"`
}

// OIDCConfig 是 OpenID Connect 单点登录。
type OIDCConfig struct {
	Issuer       string `yaml:"issuer"`
	ClientID     string `yaml:"clientID"`
	ClientSecret string `yaml:"clientSecret"`
	// RedirectURL 为空时按请求推导为 <scheme>://<host><basePath>auth/oidc/callback
	RedirectURL   string   `yaml:"redirectURL"`
	Scopes        []string `yaml:"scopes"`
	UsernameClaim string   `yaml:"usernameClaim"`
	// 下面三项都为空表示 IdP 认证通过的用户都能登录；任一项匹配即放行
	AllowedUsers   []string `yaml:"allowedUsers"`
	AllowedDomains []string `yaml:"allowedDomains"`
	GroupsClaim    string   `yaml:"groupsClaim"`
	AllowedGroups  []string `yaml:"allowedGroups"`
}

// ProxyConfig 信任反向代理（oauth2-proxy、Cloudflare Access 等）传来的用户头。
type ProxyConfig struct {
	Header string `yaml:"header"`
	// TrustedProxies 只接受来自这些地址（CIDR）的请求头，必填
	TrustedProxies []string `yaml:"trustedProxies"`
	// JWT 可选：额外校验代理签发的 JWT（如 Cloudflare Access 的 Cf-Access-Jwt-Assertion）
	JWT *ProxyJWTConfig `yaml:"jwt"`
}

// ProxyJWTConfig 校验代理签发的 JWT，用户名取自 Claim。
type ProxyJWTConfig struct {
	Header   string `yaml:"header"`
	Issuer   string `yaml:"issuer"`
	JWKSURL  string `yaml:"jwksURL"`
	Audience string `yaml:"audience"`
	Claim    string `yaml:"claim"`
}

// BasicConfig 是用户名密码登录。
type BasicConfig struct {
	Users []BasicUser `yaml:"users"`
}

// BasicUser 的密码必须是 bcrypt 哈希（cerebro hash-password 生成）。
type BasicUser struct {
	Username string `yaml:"username"`
	Password string `yaml:"password"`
	// plain 只来自旧的 BASIC_AUTH_PWD 环境变量，启动时哈希。
	plain bool
}

// IsPlain 表示密码是明文（旧环境变量）。
func (u BasicUser) IsPlain() bool { return u.plain }

// LDAPConfig 对应旧配置 auth.settings 下的 LDAP 项。
type LDAPConfig struct {
	URL                string          `yaml:"url"`
	BaseDN             string          `yaml:"baseDN"`
	Method             string          `yaml:"method"`
	UserTemplate       string          `yaml:"userTemplate"`
	BindDN             string          `yaml:"bindDN"`
	BindPassword       string          `yaml:"bindPassword"`
	StartTLS           bool            `yaml:"startTLS"`
	InsecureSkipVerify bool            `yaml:"insecureSkipVerify"`
	CA                 string          `yaml:"ca"`
	GroupSearch        LDAPGroupSearch `yaml:"groupSearch"`
	Timeout            Duration        `yaml:"timeout"`
}

// LDAPGroupSearch 配置组成员校验，Group 为空表示不校验。
type LDAPGroupSearch struct {
	BaseDN           string `yaml:"baseDN"`
	UserAttr         string `yaml:"userAttr"`
	UserAttrTemplate string `yaml:"userAttrTemplate"`
	Group            string `yaml:"group"`
}

// LogConfig 是日志设置。
type LogConfig struct {
	Level  string `yaml:"level"`  // debug、info、warn、error
	Format string `yaml:"format"` // text、json
}

// Duration 支持 "30s"、"24h" 这种写法。
type Duration struct{ time.Duration }

// UnmarshalYAML 解析时长。
func (d *Duration) UnmarshalYAML(n *yaml.Node) error {
	v, err := time.ParseDuration(n.Value)
	if err != nil {
		return fmt.Errorf("invalid duration %q: %w", n.Value, err)
	}
	d.Duration = v
	return nil
}

// Default 返回默认配置。
func Default() *Config {
	return &Config{
		Port:     9000,
		BasePath: "/",
		DataDir:  ".",
		Session:  SessionConfig{MaxAge: Duration{7 * 24 * time.Hour}},
		History:  HistoryConfig{Size: 50},
		ES:       ESConfig{Timeout: Duration{2 * time.Minute}},
		Auth:     AuthConfig{Type: "none", LDAP: LDAPConfig{Method: "simple", Timeout: Duration{10 * time.Second}}},
		Log:      LogConfig{Level: "info", Format: "text"},
	}
}

// 只展开 ${VAR}，不碰 bcrypt 哈希里的 $。
var envRef = regexp.MustCompile(`\$\{([A-Za-z_][A-Za-z0-9_]*)\}`)

func expandEnv(s string, getenv func(string) string) string {
	return envRef.ReplaceAllStringFunc(s, func(m string) string {
		return getenv(m[2 : len(m)-1])
	})
}

// decodeYAML 先解析成节点树，只在标量值里展开 ${VAR}，变量值不会被当成 YAML 再解析一遍。
func decodeYAML(data []byte, cfg *Config, getenv func(string) string) error {
	var root yaml.Node
	if err := yaml.Unmarshal(data, &root); err != nil {
		return err
	}
	if root.Kind == 0 { // 空文件
		return nil
	}
	expandNode(&root, getenv)
	out, err := yaml.Marshal(&root)
	if err != nil {
		return err
	}
	dec := yaml.NewDecoder(bytes.NewReader(out))
	dec.KnownFields(true)
	if err := dec.Decode(cfg); err != nil && !errors.Is(err, io.EOF) {
		return err
	}
	return nil
}

func expandNode(n *yaml.Node, getenv func(string) string) {
	if n.Kind == yaml.ScalarNode {
		v := expandEnv(n.Value, getenv)
		if v == n.Value {
			return
		}
		n.Value = v
		// 原本加了引号的保持引号；没加引号的，值能安全地作为普通标量（如端口号）就保持原样，否则加引号
		if n.Style&(yaml.DoubleQuotedStyle|yaml.SingleQuotedStyle) == 0 {
			n.Tag = ""
			n.Style = 0
			if !plainSafe(v) {
				n.Style = yaml.DoubleQuotedStyle
			}
		}
		return
	}
	for _, c := range n.Content {
		expandNode(c, getenv)
	}
}

// plainSafe 判断 v 不加引号写成 YAML 值时是否原样得到一个标量。
func plainSafe(v string) bool {
	var doc yaml.Node
	if yaml.Unmarshal([]byte("k: "+v), &doc) != nil || len(doc.Content) != 1 {
		return false
	}
	m := doc.Content[0]
	return m.Kind == yaml.MappingNode && len(m.Content) == 2 &&
		m.Content[1].Kind == yaml.ScalarNode && m.Content[1].Value == v && m.Content[1].Style == 0
}

// 第二个默认位置，方便容器里挂载配置。
const systemConfig = "/etc/cerebro/cerebro.yaml"

// Load 读取配置：path 为空时依次找 $CEREBRO_CONFIG、./cerebro.yaml、/etc/cerebro/cerebro.yaml，
// 都没有就只用默认值和环境变量。
func Load(path string, getenv func(string) string) (*Config, error) {
	if getenv == nil {
		getenv = os.Getenv
	}
	cfg := Default()
	explicit := path != ""
	if path == "" {
		path = getenv("CEREBRO_CONFIG")
		explicit = path != ""
	}
	if path == "" {
		path = "cerebro.yaml"
		if _, err := os.Stat(path); err != nil {
			if _, err := os.Stat(systemConfig); err == nil {
				path = systemConfig
			}
		}
	}
	data, err := os.ReadFile(path) //nolint:gosec // 路径来自启动参数
	switch {
	case err == nil:
		if err := decodeYAML(data, cfg, getenv); err != nil {
			return nil, fmt.Errorf("parse %s: %w", path, err)
		}
	case explicit || !errors.Is(err, os.ErrNotExist):
		return nil, fmt.Errorf("read config: %w", err)
	}
	if err := applyEnv(cfg, getenv); err != nil {
		return nil, err
	}
	if err := cfg.normalize(); err != nil {
		return nil, err
	}
	return cfg, nil
}

func applyEnv(c *Config, getenv func(string) string) error {
	str := func(name string, dst *string) {
		if v := getenv(name); v != "" {
			*dst = v
		}
	}
	var errs []error
	boolean := func(name string, dst *bool) {
		if v := getenv(name); v != "" {
			b, err := strconv.ParseBool(v)
			if err != nil {
				errs = append(errs, fmt.Errorf("%s: %w", name, err))
				return
			}
			*dst = b
		}
	}
	integer := func(name string, dst *int) {
		if v := getenv(name); v != "" {
			i, err := strconv.Atoi(v)
			if err != nil {
				errs = append(errs, fmt.Errorf("%s: %w", name, err))
				return
			}
			*dst = i
		}
	}
	duration := func(name string, dst *Duration) {
		if v := getenv(name); v != "" {
			d, err := time.ParseDuration(v)
			if err != nil {
				errs = append(errs, fmt.Errorf("%s: %w", name, err))
				return
			}
			dst.Duration = d
		}
	}

	str("CEREBRO_ADDRESS", &c.Address)
	integer("CEREBRO_PORT", &c.Port)
	str("CEREBRO_BASE_PATH", &c.BasePath)
	str("CEREBRO_DATA_DIR", &c.DataDir)
	str("CEREBRO_UI_DIR", &c.UIDir)
	if v := getenv("CEREBRO_TRUSTED_PROXIES"); v != "" {
		for _, cidr := range strings.Split(v, ",") {
			if cidr = strings.TrimSpace(cidr); cidr != "" {
				c.TrustedProxies = append(c.TrustedProxies, cidr)
			}
		}
	}
	boolean("CEREBRO_READ_ONLY", &c.ReadOnly)
	str("CEREBRO_SECRET", &c.Session.Secret)
	duration("CEREBRO_SESSION_MAX_AGE", &c.Session.MaxAge)
	if v := getenv("CEREBRO_ALLOW_UNKNOWN_HOSTS"); v != "" {
		b, err := strconv.ParseBool(v)
		if err != nil {
			errs = append(errs, fmt.Errorf("CEREBRO_ALLOW_UNKNOWN_HOSTS: %w", err))
		} else {
			c.AllowUnknownHosts = &b
		}
	}
	if v := getenv("CEREBRO_HISTORY_ENABLED"); v != "" {
		b, err := strconv.ParseBool(v)
		if err != nil {
			errs = append(errs, fmt.Errorf("CEREBRO_HISTORY_ENABLED: %w", err))
		} else {
			c.History.Enabled = &b
		}
	}
	integer("CEREBRO_HISTORY_SIZE", &c.History.Size)
	str("CEREBRO_HISTORY_PATH", &c.History.Path)
	duration("CEREBRO_ES_TIMEOUT", &c.ES.Timeout)
	str("CEREBRO_ES_CA", &c.ES.TLS.CA)
	str("CEREBRO_ES_CERT", &c.ES.TLS.Cert)
	str("CEREBRO_ES_KEY", &c.ES.TLS.Key)
	if v := getenv("CEREBRO_ES_INSECURE_SKIP_VERIFY"); v != "" {
		b, err := strconv.ParseBool(v)
		if err != nil {
			errs = append(errs, fmt.Errorf("CEREBRO_ES_INSECURE_SKIP_VERIFY: %w", err))
		} else {
			c.ES.TLS.InsecureSkipVerify = &b
		}
	}
	str("CEREBRO_ES_SERVER_NAME", &c.ES.TLS.ServerName)
	str("CEREBRO_LOG_LEVEL", &c.Log.Level)
	str("CEREBRO_LOG_FORMAT", &c.Log.Format)

	// CEREBRO_HOSTS="名字=地址,地址2"
	if v := getenv("CEREBRO_HOSTS"); v != "" {
		for _, item := range strings.Split(v, ",") {
			item = strings.TrimSpace(item)
			if item == "" {
				continue
			}
			h := HostConfig{Host: item}
			if name, host, ok := strings.Cut(item, "="); ok && !strings.Contains(name, "://") {
				h = HostConfig{Name: strings.TrimSpace(name), Host: strings.TrimSpace(host)}
			}
			c.Hosts = append(c.Hosts, h)
		}
	}

	// 旧版环境变量
	str("AUTH_TYPE", &c.Auth.Type)
	l := &c.Auth.LDAP
	str("LDAP_URL", &l.URL)
	str("LDAP_BASE_DN", &l.BaseDN)
	str("LDAP_METHOD", &l.Method)
	str("LDAP_USER_TEMPLATE", &l.UserTemplate)
	str("LDAP_BIND_DN", &l.BindDN)
	str("LDAP_BIND_PWD", &l.BindPassword)
	str("LDAP_GROUP_BASE_DN", &l.GroupSearch.BaseDN)
	str("LDAP_USER_ATTR", &l.GroupSearch.UserAttr)
	str("LDAP_USER_ATTR_TEMPLATE", &l.GroupSearch.UserAttrTemplate)
	str("LDAP_GROUP", &l.GroupSearch.Group)
	str("OIDC_ISSUER", &c.Auth.OIDC.Issuer)
	str("OIDC_CLIENT_ID", &c.Auth.OIDC.ClientID)
	str("OIDC_CLIENT_SECRET", &c.Auth.OIDC.ClientSecret)
	str("OIDC_REDIRECT_URL", &c.Auth.OIDC.RedirectURL)
	str("CEREBRO_PROXY_HEADER", &c.Auth.Proxy.Header)
	if v := getenv("CEREBRO_PROXY_TRUSTED"); v != "" {
		for _, cidr := range strings.Split(v, ",") {
			if cidr = strings.TrimSpace(cidr); cidr != "" {
				c.Auth.Proxy.TrustedProxies = append(c.Auth.Proxy.TrustedProxies, cidr)
			}
		}
	}
	if u, p := getenv("BASIC_AUTH_USER"), getenv("BASIC_AUTH_PWD"); u != "" && p != "" {
		c.Auth.Basic.Users = append(c.Auth.Basic.Users, BasicUser{Username: u, Password: p, plain: !IsBcrypt(p)})
	}
	return errors.Join(errs...)
}

var bcryptRe = regexp.MustCompile(`^\$2[abxy]?\$\d{2}\$[./A-Za-z0-9]{53}$`)

// IsBcrypt 判断是否 bcrypt 哈希。
func IsBcrypt(s string) bool { return bcryptRe.MatchString(s) }

func (c *Config) normalize() error {
	var errs []error
	if c.Port <= 0 || c.Port > 65535 {
		errs = append(errs, fmt.Errorf("invalid port %d", c.Port))
	}
	bp := "/" + strings.Trim(c.BasePath, "/") + "/"
	if bp == "//" {
		bp = "/"
	}
	c.BasePath = bp
	if c.DataDir == "" {
		c.DataDir = "."
	}
	if c.History.Size <= 0 {
		c.History.Size = 50
	}
	if c.History.Path == "" {
		c.History.Path = filepath.Join(c.DataDir, "cerebro.db")
	}
	if c.Session.MaxAge.Duration <= 0 {
		c.Session.MaxAge.Duration = 7 * 24 * time.Hour
	}
	if c.Session.Secret != "" && len(c.Session.Secret) < 32 {
		errs = append(errs, errors.New("session.secret must be at least 32 characters (leave empty to auto-generate)"))
	}

	c.Auth.Type = strings.ToLower(strings.TrimSpace(c.Auth.Type))
	switch c.Auth.Type {
	case "", "none":
		c.Auth.Type = "none"
	case "basic":
		if len(c.Auth.Basic.Users) == 0 {
			errs = append(errs, errors.New("auth.type is basic but auth.basic.users is empty"))
		}
		for _, u := range c.Auth.Basic.Users {
			if u.Username == "" {
				errs = append(errs, errors.New("auth.basic.users: username is required"))
			}
			if !u.plain && !IsBcrypt(u.Password) {
				errs = append(errs, fmt.Errorf("auth.basic.users[%s]: password must be a bcrypt hash, generate one with `cerebro hash-password`", u.Username))
			}
		}
	case "ldap":
		l := c.Auth.LDAP
		if l.URL == "" || l.UserTemplate == "" {
			errs = append(errs, errors.New("auth.ldap.url and auth.ldap.userTemplate are required"))
		}
		if l.StartTLS && strings.HasPrefix(strings.ToLower(l.URL), "ldaps://") {
			errs = append(errs, errors.New("auth.ldap.startTLS cannot be used with an ldaps:// URL"))
		}
		if l.Method != "" && !strings.EqualFold(l.Method, "simple") {
			errs = append(errs, fmt.Errorf("auth.ldap.method %q is not supported, only simple", l.Method))
		}
		if l.GroupSearch.Group != "" && (l.BindDN == "" || l.GroupSearch.UserAttr == "") {
			errs = append(errs, errors.New("auth.ldap.groupSearch needs bindDN and groupSearch.userAttr"))
		}
	case "oidc":
		o := &c.Auth.OIDC
		if o.Issuer == "" || o.ClientID == "" {
			errs = append(errs, errors.New("auth.oidc.issuer and auth.oidc.clientID are required"))
		}
		if len(o.Scopes) == 0 {
			o.Scopes = []string{"openid", "email", "profile"}
		}
		if o.UsernameClaim == "" {
			o.UsernameClaim = "email"
		}
		if len(o.AllowedGroups) > 0 && o.GroupsClaim == "" {
			o.GroupsClaim = "groups"
		}
	case "proxy":
		p := &c.Auth.Proxy
		if p.Header == "" && p.JWT == nil {
			p.Header = "X-Forwarded-User"
		}
		if len(p.TrustedProxies) == 0 {
			errs = append(errs, errors.New("auth.proxy.trustedProxies is required (CIDR list of your reverse proxies)"))
		}
		for _, cidr := range p.TrustedProxies {
			if _, _, err := net.ParseCIDR(cidr); err != nil {
				errs = append(errs, fmt.Errorf("auth.proxy.trustedProxies: invalid CIDR %q", cidr))
			}
		}
		if j := p.JWT; j != nil {
			if j.Header == "" || j.Issuer == "" || j.JWKSURL == "" || j.Audience == "" {
				errs = append(errs, errors.New("auth.proxy.jwt needs header, issuer, jwksURL and audience"))
			}
			if j.Claim == "" {
				j.Claim = "email"
			}
		}
	default:
		errs = append(errs, fmt.Errorf("unknown auth.type %q (none, basic, ldap, oidc, proxy)", c.Auth.Type))
	}

	names := map[string]bool{}
	for i := range c.Hosts {
		h := &c.Hosts[i]
		h.Host = strings.TrimSpace(h.Host)
		if h.Name == "" {
			h.Name = h.Host
		}
		u, err := url.Parse(h.Host)
		if err != nil || (u.Scheme != "http" && u.Scheme != "https") || u.Host == "" {
			errs = append(errs, fmt.Errorf("hosts[%d]: invalid host (must be http:// or https:// with a host name)", i))
		} else if u.User != nil {
			// 地址里的凭据挪到 auth，避免地址出现在页面、报错和日志里
			if h.Auth != nil {
				errs = append(errs, fmt.Errorf("hosts[%d]: credentials both in the host URL and in auth", i))
			} else {
				pw, _ := u.User.Password()
				h.Auth = &HostAuth{Username: u.User.Username(), Password: pw}
			}
			u.User = nil
			if h.Name == h.Host {
				h.Name = u.String()
			}
			h.Host = u.String()
		}
		if names[h.Name] {
			errs = append(errs, fmt.Errorf("hosts: duplicate name %q", h.Name))
		}
		names[h.Name] = true
		if a := h.Auth; a != nil {
			n := 0
			for _, set := range []bool{a.Username != "", a.APIKey != "", a.Bearer != ""} {
				if set {
					n++
				}
			}
			if n > 1 {
				errs = append(errs, fmt.Errorf("hosts[%s].auth: use only one of username/password, apiKey, bearer", h.Name))
			}
		}
	}

	for _, cidr := range c.TrustedProxies {
		if _, _, err := net.ParseCIDR(cidr); err != nil {
			errs = append(errs, fmt.Errorf("trustedProxies: invalid CIDR %q", cidr))
		}
	}

	switch strings.ToLower(c.Log.Format) {
	case "", "text", "json":
	default:
		errs = append(errs, fmt.Errorf("unknown log.format %q", c.Log.Format))
	}
	return errors.Join(errs...)
}
