package auth

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"strings"

	"github.com/coreos/go-oidc/v3/oidc"

	"github.com/RitterHou/cerebro/internal/config"
)

// Proxy 信任反向代理（oauth2-proxy、Cloudflare Access 等）传来的用户，不需要登录页。
type Proxy struct {
	header   string
	trusted  []*net.IPNet
	jwt      *config.ProxyJWTConfig
	verifier *oidc.IDTokenVerifier
}

// NewProxy 创建代理认证。
func NewProxy(cfg config.ProxyConfig) (*Proxy, error) {
	p := &Proxy{header: cfg.Header, jwt: cfg.JWT}
	for _, cidr := range cfg.TrustedProxies {
		_, n, err := net.ParseCIDR(strings.TrimSpace(cidr))
		if err != nil {
			return nil, fmt.Errorf("invalid trusted proxy %q: %w", cidr, err)
		}
		p.trusted = append(p.trusted, n)
		// 只靠请求头时，可信范围太大意味着范围内的任何机器都能伪造用户
		if ones, bits := n.Mask.Size(); cfg.JWT == nil && bits-ones > 8 {
			slog.Warn("auth.proxy.trustedProxies is wide; anything in this range can impersonate users, prefer the proxy's own addresses or jwt verification", "cidr", n.String())
		}
	}
	if j := cfg.JWT; j != nil {
		keys := oidc.NewRemoteKeySet(oidc.ClientContext(context.Background(), httpClient), j.JWKSURL)
		// Cloudflare Access 用 RS256，Google IAP 用 ES256
		p.verifier = oidc.NewVerifier(j.Issuer, keys, &oidc.Config{ClientID: j.Audience, SupportedSigningAlgs: []string{oidc.RS256, oidc.ES256}})
	}
	return p, nil
}

// Header 是读取用户名的请求头（用 JWT 时为空）。
func (p *Proxy) Header() string { return p.header }

func (p *Proxy) fromTrusted(r *http.Request) bool {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		host = r.RemoteAddr
	}
	ip := net.ParseIP(host)
	if ip == nil {
		return false
	}
	for _, n := range p.trusted {
		if n.Contains(ip) {
			return true
		}
	}
	return false
}

// UserFromRequest 只接受来自可信代理的请求；配置了 JWT 时以 JWT 里的用户为准。
func (p *Proxy) UserFromRequest(r *http.Request) (string, bool) {
	if !p.fromTrusted(r) {
		return "", false
	}
	if p.verifier != nil {
		raw := r.Header.Get(p.jwt.Header)
		if raw == "" {
			return "", false
		}
		token, err := p.verifier.Verify(r.Context(), raw)
		if err != nil {
			return "", false
		}
		var claims map[string]any
		if token.Claims(&claims) != nil {
			return "", false
		}
		user, _ := claims[p.jwt.Claim].(string)
		return user, user != ""
	}
	user := strings.TrimSpace(r.Header.Get(p.header))
	return user, user != ""
}

// Authenticate 代理模式没有用户名密码登录。
func (p *Proxy) Authenticate(context.Context, string, string) (string, bool) { return "", false }
