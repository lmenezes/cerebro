package auth

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"errors"
	"fmt"
	"log/slog"
	"net"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/go-ldap/ldap/v3"
	"golang.org/x/crypto/bcrypt"

	"github.com/RitterHou/cerebro/internal/config"
)

// Authenticator 校验用户名密码，成功返回会话里记录的用户名。
type Authenticator interface {
	Authenticate(ctx context.Context, username, password string) (string, bool)
}

// New 按配置创建认证器，auth.type 为 none 时返回 nil。
func New(cfg config.AuthConfig) (Authenticator, error) {
	switch cfg.Type {
	case "basic":
		return NewBasic(cfg.Basic.Users)
	case "ldap":
		return NewLDAP(cfg.LDAP)
	case "oidc":
		return NewOIDC(cfg.OIDC), nil
	case "proxy":
		return NewProxy(cfg.Proxy)
	default:
		return nil, nil
	}
}

// Basic 是多用户 bcrypt 认证。
type Basic struct {
	users map[string][]byte
}

// 用户不存在时也做一次 bcrypt，避免通过耗时判断用户是否存在。
var dummyHash, _ = bcrypt.GenerateFromPassword([]byte("cerebro-dummy-password"), bcrypt.DefaultCost)

// NewBasic 创建 Basic 认证；明文密码（只可能来自旧环境变量）在这里哈希。
func NewBasic(users []config.BasicUser) (*Basic, error) {
	b := &Basic{users: map[string][]byte{}}
	for _, u := range users {
		hash := []byte(u.Password)
		if u.IsPlain() {
			slog.Warn("BASIC_AUTH_PWD is plain text, prefer a bcrypt hash from `cerebro hash-password`", "user", u.Username)
			h, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
			if err != nil {
				return nil, err
			}
			hash = h
		}
		b.users[u.Username] = hash
	}
	return b, nil
}

// UserExists 用于让已删除用户的会话失效。
func (b *Basic) UserExists(name string) bool { _, ok := b.users[name]; return ok }

// Authenticate 实现 Authenticator。
func (b *Basic) Authenticate(_ context.Context, username, password string) (string, bool) {
	hash, ok := b.users[username]
	if !ok {
		_ = bcrypt.CompareHashAndPassword(dummyHash, []byte(password))
		return "", false
	}
	if bcrypt.CompareHashAndPassword(hash, []byte(password)) != nil {
		return "", false
	}
	return username, true
}

// HashPassword 生成 bcrypt 哈希。
func HashPassword(password string) (string, error) {
	h, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(h), err
}

// LDAP 先（可选）用绑定账号检查组成员，再用用户自己的 DN 绑定校验密码。
type LDAP struct {
	cfg     config.LDAPConfig
	tlsConf *tls.Config
	dial    func(ctx context.Context) (ldapConn, error)
}

type ldapConn interface {
	Bind(username, password string) error
	Search(req *ldap.SearchRequest) (*ldap.SearchResult, error)
	Close() error
}

// NewLDAP 创建 LDAP 认证。
func NewLDAP(cfg config.LDAPConfig) (*LDAP, error) {
	tlsConf := &tls.Config{MinVersion: tls.VersionTLS12, InsecureSkipVerify: cfg.InsecureSkipVerify} //nolint:gosec // 只有显式配置才跳过
	if cfg.CA != "" {
		pem, err := os.ReadFile(cfg.CA)
		if err != nil {
			return nil, fmt.Errorf("read LDAP CA: %w", err)
		}
		pool := x509.NewCertPool()
		if !pool.AppendCertsFromPEM(pem) {
			return nil, fmt.Errorf("no certificates in %s", cfg.CA)
		}
		tlsConf.RootCAs = pool
	}
	l := &LDAP{cfg: cfg, tlsConf: tlsConf}
	l.dial = l.connect
	return l, nil
}

func (l *LDAP) connect(context.Context) (ldapConn, error) {
	timeout := l.cfg.Timeout.Duration
	if timeout <= 0 {
		timeout = 10 * time.Second
	}
	conn, err := ldap.DialURL(l.cfg.URL,
		ldap.DialWithDialer(&net.Dialer{Timeout: timeout}),
		ldap.DialWithTLSConfig(l.tlsConf))
	if err != nil {
		return nil, err
	}
	conn.SetTimeout(timeout)
	if l.cfg.StartTLS {
		if err := conn.StartTLS(l.startTLSConfig()); err != nil {
			_ = conn.Close()
			return nil, err
		}
	}
	return conn, nil
}

// startTLSConfig 补上 ServerName：go-ldap 的 StartTLS 不会自动填，不填就无法校验证书。
func (l *LDAP) startTLSConfig() *tls.Config {
	cfg := l.tlsConf.Clone()
	if cfg.ServerName == "" {
		if u, err := url.Parse(l.cfg.URL); err == nil {
			cfg.ServerName = u.Hostname()
		}
	}
	return cfg
}

// format 模拟 Java String.format("%s...", username, baseDN)：按 %s 出现次数依次填参数。
func format(template string, args ...string) string {
	var b strings.Builder
	i := 0
	for {
		j := strings.Index(template, "%s")
		if j < 0 {
			b.WriteString(template)
			return b.String()
		}
		b.WriteString(template[:j])
		if i < len(args) {
			b.WriteString(args[i])
		}
		i++
		template = template[j+2:]
	}
}

// Authenticate 实现 Authenticator。
func (l *LDAP) Authenticate(ctx context.Context, username, password string) (string, bool) {
	if username == "" || password == "" { // 空密码在 LDAP 里是匿名绑定，会被当成成功
		return "", false
	}
	if l.cfg.GroupSearch.Group != "" && !l.checkGroup(ctx, username) {
		return "", false
	}
	if !l.checkUser(ctx, username, password) {
		return "", false
	}
	return username, true
}

func (l *LDAP) checkUser(ctx context.Context, username, password string) bool {
	conn, err := l.dial(ctx)
	if err != nil {
		slog.Error("ldap connect failed", "err", err)
		return false
	}
	defer conn.Close()
	principal := format(l.cfg.UserTemplate, username, l.cfg.BaseDN)
	if err := conn.Bind(principal, password); err != nil {
		var le *ldap.Error
		if errors.As(err, &le) && le.ResultCode == ldap.LDAPResultInvalidCredentials {
			slog.Info("ldap login failed", "user", username)
		} else {
			slog.Error("ldap login failed", "user", username, "err", err)
		}
		return false
	}
	return true
}

func (l *LDAP) checkGroup(ctx context.Context, username string) bool {
	gs := l.cfg.GroupSearch
	conn, err := l.dial(ctx)
	if err != nil {
		slog.Error("ldap connect failed", "err", err)
		return false
	}
	defer conn.Close()
	if err := conn.Bind(l.cfg.BindDN, l.cfg.BindPassword); err != nil {
		slog.Error("ldap bind with bindDN failed", "err", err)
		return false
	}
	baseDN := gs.BaseDN
	if baseDN == "" {
		baseDN = l.cfg.BaseDN
	}
	tmpl := gs.UserAttrTemplate
	if tmpl == "" {
		tmpl = l.cfg.UserTemplate
	}
	user := format(tmpl, username, l.cfg.BaseDN)
	group := gs.Group
	if !strings.HasPrefix(group, "(") {
		group = "(" + group + ")"
	}
	filter := fmt.Sprintf("(&(%s=%s)%s)", gs.UserAttr, ldap.EscapeFilter(user), group)
	req := ldap.NewSearchRequest(baseDN, ldap.ScopeWholeSubtree, ldap.DerefAlways, 1, 0, false, filter, []string{"dn"}, nil)
	res, err := conn.Search(req)
	if err != nil {
		var le *ldap.Error
		if errors.As(err, &le) && le.ResultCode == ldap.LDAPResultSizeLimitExceeded && res != nil && len(res.Entries) > 0 {
			return true
		}
		slog.Error("ldap group search failed", "user", username, "err", err)
		return false
	}
	if len(res.Entries) == 0 {
		slog.Info("user is not a member of the required group", "user", username)
		return false
	}
	return true
}
