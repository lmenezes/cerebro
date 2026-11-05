package auth

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"net/http"
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"

	"github.com/RitterHou/cerebro/internal/config"
)

// OIDC 是 OpenID Connect 授权码登录。IdP 的发现文档在第一次使用时获取，IdP 暂时不可用不影响启动。
type OIDC struct {
	cfg config.OIDCConfig

	mu       sync.Mutex
	provider *oidc.Provider
	verifier *oidc.IDTokenVerifier
}

// NewOIDC 创建 OIDC 认证。
func NewOIDC(cfg config.OIDCConfig) *OIDC { return &OIDC{cfg: cfg} }

func (o *OIDC) init(ctx context.Context) (*oidc.Provider, *oidc.IDTokenVerifier, error) {
	o.mu.Lock()
	defer o.mu.Unlock()
	if o.provider == nil {
		ctx, cancel := context.WithTimeout(oidc.ClientContext(ctx, httpClient), 15*time.Second)
		defer cancel()
		p, err := oidc.NewProvider(ctx, o.cfg.Issuer)
		if err != nil {
			return nil, nil, fmt.Errorf("oidc discovery: %w", err)
		}
		o.provider = p
		o.verifier = p.Verifier(&oidc.Config{ClientID: o.cfg.ClientID})
	}
	return o.provider, o.verifier, nil
}

func (o *OIDC) oauth2Config(p *oidc.Provider, redirectURL string) *oauth2.Config {
	if o.cfg.RedirectURL != "" {
		redirectURL = o.cfg.RedirectURL
	}
	return &oauth2.Config{
		ClientID:     o.cfg.ClientID,
		ClientSecret: o.cfg.ClientSecret,
		Endpoint:     p.Endpoint(),
		RedirectURL:  redirectURL,
		Scopes:       o.cfg.Scopes,
	}
}

// httpClient 用于访问 IdP（发现文档、JWKS、换 token），带超时，IdP 卡住时不会把请求一直挂着。
var httpClient = &http.Client{Timeout: 15 * time.Second}

// RandomToken 生成 state 和 nonce。
func RandomToken() string {
	b := make([]byte, 24)
	_, _ = rand.Read(b)
	return base64.RawURLEncoding.EncodeToString(b)
}

// AuthCodeURL 返回跳转到 IdP 的地址；verifier 是 PKCE 的 code_verifier（存进会话，换 token 时带上）。
func (o *OIDC) AuthCodeURL(ctx context.Context, redirectURL, state, nonce, verifier string) (string, error) {
	p, _, err := o.init(ctx)
	if err != nil {
		return "", err
	}
	return o.oauth2Config(p, redirectURL).AuthCodeURL(state, oidc.Nonce(nonce), oauth2.S256ChallengeOption(verifier)), nil
}

// ErrNotAllowed 表示 IdP 认证通过但不在允许名单里。
var ErrNotAllowed = errors.New("user is not allowed to use cerebro")

// Exchange 用授权码换 ID Token，校验 nonce 和允许名单，返回用户名。
func (o *OIDC) Exchange(ctx context.Context, redirectURL, code, nonce, codeVerifier string) (string, error) {
	p, verifier, err := o.init(ctx)
	if err != nil {
		return "", err
	}
	ctx = oidc.ClientContext(ctx, httpClient)
	token, err := o.oauth2Config(p, redirectURL).Exchange(ctx, code, oauth2.VerifierOption(codeVerifier))
	if err != nil {
		return "", fmt.Errorf("oidc token exchange: %w", err)
	}
	raw, ok := token.Extra("id_token").(string)
	if !ok {
		return "", errors.New("oidc: no id_token in token response")
	}
	idToken, err := verifier.Verify(ctx, raw)
	if err != nil {
		return "", fmt.Errorf("oidc: verify id_token: %w", err)
	}
	if idToken.Nonce != nonce {
		return "", errors.New("oidc: nonce mismatch")
	}
	var claims map[string]any
	if err := idToken.Claims(&claims); err != nil {
		return "", err
	}
	if o.cfg.UsernameClaim == "email" {
		v, ok := claims["email_verified"].(bool)
		restricted := len(o.cfg.AllowedUsers) > 0 || len(o.cfg.AllowedDomains) > 0
		// 按邮箱放行时，邮箱必须经过 IdP 验证；没按邮箱限制时只拒绝明确未验证的
		if (ok && !v) || (!ok && restricted) {
			return "", errors.New("oidc: email not verified")
		}
	}
	user, _ := claims[o.cfg.UsernameClaim].(string)
	if user == "" {
		return "", fmt.Errorf("oidc: claim %q missing", o.cfg.UsernameClaim)
	}
	if !o.allowed(user, claims) {
		return "", ErrNotAllowed
	}
	return user, nil
}

func (o *OIDC) allowed(user string, claims map[string]any) bool {
	c := o.cfg
	if len(c.AllowedUsers) == 0 && len(c.AllowedDomains) == 0 && len(c.AllowedGroups) == 0 {
		return true
	}
	if slices.ContainsFunc(c.AllowedUsers, func(u string) bool { return strings.EqualFold(u, user) }) {
		return true
	}
	if at := strings.LastIndex(user, "@"); at >= 0 {
		domain := user[at+1:]
		if slices.ContainsFunc(c.AllowedDomains, func(d string) bool { return strings.EqualFold(d, domain) }) {
			return true
		}
	}
	switch groups := claims[c.GroupsClaim].(type) {
	case []any:
		for _, g := range groups {
			if s, ok := g.(string); ok && slices.Contains(c.AllowedGroups, s) {
				return true
			}
		}
	case string: // 有的 IdP 只有一个组时给的是字符串
		return slices.Contains(c.AllowedGroups, groups)
	}
	return false
}

// Authenticate OIDC 没有用户名密码登录。
func (o *OIDC) Authenticate(context.Context, string, string) (string, bool) { return "", false }
