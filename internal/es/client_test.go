package es

import (
	"context"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/tls"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/base64"
	"encoding/json"
	"encoding/pem"
	"errors"
	"io"
	"log"
	"math/big"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/RitterHou/cerebro/internal/jsonx"
)

func sp(s string) *string { return &s }

func b64(s string) string { return base64.StdEncoding.EncodeToString([]byte(s)) }

func TestFromRequestAuthorizationHeader(t *testing.T) {
	cases := []struct {
		name     string
		user, pw *string
		want     string
	}{
		{"用户名密码", sp("elastic"), sp("changeme"), "Basic " + b64("elastic:changeme")},
		{"密码里有冒号", sp("u"), sp("a:b"), "Basic " + b64("u:a:b")},
		{"无用户名按 API Key", nil, sp("c29tZWtleQ=="), "ApiKey c29tZWtleQ=="},
		{"空用户名按 API Key", sp(""), sp("c29tZWtleQ=="), "ApiKey c29tZWtleQ=="},
		{"id:key 自动 base64", sp(""), sp("myid:mykey"), "ApiKey " + b64("myid:mykey")},
		{"Bearer 前缀", nil, sp("Bearer tok.en-123"), "Bearer tok.en-123"},
		{"ApiKey 前缀", sp(""), sp("ApiKey c29tZWtleQ=="), "ApiKey c29tZWtleQ=="},
		{"ApiKey 前缀 id:key", nil, sp("ApiKey id:key"), "ApiKey " + b64("id:key")},
		{"都没有", nil, nil, ""},
		{"都为空", sp(""), sp(""), ""},
		{"只有用户名", sp("elastic"), nil, ""},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			if got := FromRequest(c.user, c.pw).Header(); got != c.want {
				t.Fatalf("got %q, want %q", got, c.want)
			}
		})
	}
}

func TestAuthHeaderVariants(t *testing.T) {
	cases := []struct {
		auth *Auth
		want string
	}{
		{nil, ""},
		{&Auth{}, ""},
		{&Auth{Username: "u", Password: "p"}, "Basic " + b64("u:p")},
		{&Auth{APIKey: "id:key"}, "ApiKey " + b64("id:key")},
		{&Auth{APIKey: "ZW5jb2RlZA=="}, "ApiKey ZW5jb2RlZA=="},
		{&Auth{Bearer: "tok"}, "Bearer tok"},
	}
	for _, c := range cases {
		if got := c.auth.Header(); got != c.want {
			t.Errorf("%+v: got %q, want %q", c.auth, got, c.want)
		}
	}
}

// recorder 是记录请求的假 ES。
type recorder struct {
	mu   sync.Mutex
	reqs []*http.Request
	body []string
}

func (rc *recorder) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	b, _ := io.ReadAll(r.Body)
	rc.mu.Lock()
	rc.reqs = append(rc.reqs, r.Clone(context.Background()))
	rc.body = append(rc.body, string(b))
	rc.mu.Unlock()
	w.Header().Set("Content-Type", "application/json")
	_, _ = io.WriteString(w, `{"ok":true}`)
}

func (rc *recorder) last(t *testing.T) (*http.Request, string) {
	t.Helper()
	rc.mu.Lock()
	defer rc.mu.Unlock()
	if len(rc.reqs) == 0 {
		t.Fatal("no request received")
	}
	return rc.reqs[len(rc.reqs)-1], rc.body[len(rc.body)-1]
}

func TestClientPathPrefixAndTrailingSlash(t *testing.T) {
	rc := &recorder{}
	srv := httptest.NewServer(rc)
	defer srv.Close()
	c := NewClient(5*time.Second, "cerebro-test")
	cases := []struct{ base, uri, want string }{
		{srv.URL, "/_cluster/health", "/_cluster/health"},
		{srv.URL + "/", "/_cluster/health", "/_cluster/health"},
		{srv.URL + "/es", "/_cluster/health", "/es/_cluster/health"},
		{srv.URL + "/es/", "/_cluster/health", "/es/_cluster/health"},
		{srv.URL + "/es//", "/_nodes/stats?human=true", "/es/_nodes/stats?human=true"},
		{srv.URL + "/a/b/", "/_cat/indices?format=json", "/a/b/_cat/indices?format=json"},
	}
	for _, cs := range cases {
		resp, err := c.Do(context.Background(), &Target{URL: cs.base}, http.MethodGet, cs.uri, nil, "")
		if err != nil {
			t.Fatalf("%s: %v", cs.base, err)
		}
		if resp.Status != 200 {
			t.Fatalf("%s: status %d", cs.base, resp.Status)
		}
		r, _ := rc.last(t)
		if got := r.URL.RequestURI(); got != cs.want {
			t.Errorf("base %q uri %q: ES got %q, want %q", cs.base, cs.uri, got, cs.want)
		}
	}
}

func TestClientRejectsNonHTTPURL(t *testing.T) {
	c := NewClient(time.Second, "")
	for _, u := range []string{"", "localhost:9200", "ftp://host:9200", "file:///etc/passwd", "//host:9200"} {
		_, err := c.Do(context.Background(), &Target{URL: u}, http.MethodGet, "/_cluster/health", nil, "")
		if !errors.Is(err, ErrInvalidURL) {
			t.Errorf("%q: want ErrInvalidURL, got %v", u, err)
		}
	}
}

func TestClientHeaders(t *testing.T) {
	rc := &recorder{}
	srv := httptest.NewServer(rc)
	defer srv.Close()
	c := NewClient(5*time.Second, "cerebro/1.2.3")
	target := &Target{
		URL:     srv.URL,
		Auth:    &Auth{Username: "u", Password: "p"},
		Headers: http.Header{"X-Proxy-User": {"alice"}},
	}
	if _, err := c.Do(context.Background(), target, http.MethodPost, "/_search", []byte(`{"q":1}`), ContentTypeJSON); err != nil {
		t.Fatal(err)
	}
	r, body := rc.last(t)
	checks := map[string]string{
		"Authorization": "Basic " + b64("u:p"),
		"X-Proxy-User":  "alice",
		"Accept":        "application/json",
		"User-Agent":    "cerebro/1.2.3",
		"Content-Type":  ContentTypeJSON,
	}
	for k, want := range checks {
		if got := r.Header.Get(k); got != want {
			t.Errorf("%s = %q, want %q", k, got, want)
		}
	}
	if body != `{"q":1}` {
		t.Errorf("body = %q", body)
	}

	// 无 body 时不带 Content-Type，无凭据时不带 Authorization
	if _, err := c.Do(context.Background(), &Target{URL: srv.URL}, http.MethodGet, "/", nil, ContentTypeJSON); err != nil {
		t.Fatal(err)
	}
	r, _ = rc.last(t)
	if r.Header.Get("Content-Type") != "" || r.Header.Get("Authorization") != "" {
		t.Errorf("unexpected headers: %v", r.Header)
	}
}

func TestClientTimeout(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-time.After(2 * time.Second):
		case <-r.Context().Done():
		}
	}))
	defer srv.Close()
	c := NewClient(50*time.Millisecond, "")
	start := time.Now()
	if _, err := c.Do(context.Background(), &Target{URL: srv.URL}, http.MethodGet, "/", nil, ""); err == nil {
		t.Fatal("expected timeout error")
	}
	if time.Since(start) > time.Second {
		t.Fatalf("timeout not applied: %s", time.Since(start))
	}
}

func TestResponseBody(t *testing.T) {
	cases := []struct {
		status int
		raw    string
		want   string // JSON 形式
	}{
		{200, `{"a":1}`, `{"a":1}`},
		{200, ``, `null`},
		{200, `plain text`, `"plain text"`},
		{404, ``, `{"error":""}`},
		{500, `boom`, `{"error":"boom"}`},
		{400, `{"error":{"type":"x"}}`, `{"error":{"type":"x"}}`},
	}
	for _, c := range cases {
		got, err := json.Marshal((&Response{Status: c.status, Raw: []byte(c.raw)}).Body())
		if err != nil {
			t.Fatal(err)
		}
		if !jsonx.Equal(jsonx.MustParse(string(got)), jsonx.MustParse(c.want)) {
			t.Errorf("%d %q: got %s, want %s", c.status, c.raw, got, c.want)
		}
	}
}

// ---------- TLS ----------

// testPKI 是测试用的 CA、服务端证书和客户端证书。
type testPKI struct {
	caFile, clientCert, clientKey string
	pool                          *x509.CertPool
	server                        tls.Certificate
}

func newTestPKI(t *testing.T, dnsNames []string, ips []net.IP) *testPKI {
	t.Helper()
	dir := t.TempDir()
	caKey, _ := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	caTmpl := &x509.Certificate{
		SerialNumber: big.NewInt(1), Subject: pkix.Name{CommonName: "cerebro test CA"},
		NotBefore: time.Now().Add(-time.Hour), NotAfter: time.Now().Add(time.Hour),
		IsCA: true, BasicConstraintsValid: true, KeyUsage: x509.KeyUsageCertSign | x509.KeyUsageDigitalSignature,
	}
	caDER, err := x509.CreateCertificate(rand.Reader, caTmpl, caTmpl, &caKey.PublicKey, caKey)
	if err != nil {
		t.Fatal(err)
	}
	caCert, _ := x509.ParseCertificate(caDER)
	p := &testPKI{pool: x509.NewCertPool()}
	p.pool.AddCert(caCert)
	p.caFile = writePEM(t, dir, "ca.pem", "CERTIFICATE", caDER)

	issue := func(serial int64, cn string, usage x509.ExtKeyUsage, dns []string, ips []net.IP) ([]byte, *ecdsa.PrivateKey) {
		key, _ := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
		tmpl := &x509.Certificate{
			SerialNumber: big.NewInt(serial), Subject: pkix.Name{CommonName: cn},
			NotBefore: time.Now().Add(-time.Hour), NotAfter: time.Now().Add(time.Hour),
			KeyUsage: x509.KeyUsageDigitalSignature, ExtKeyUsage: []x509.ExtKeyUsage{usage},
			DNSNames: dns, IPAddresses: ips,
		}
		der, err := x509.CreateCertificate(rand.Reader, tmpl, caCert, &key.PublicKey, caKey)
		if err != nil {
			t.Fatal(err)
		}
		return der, key
	}
	srvDER, srvKey := issue(2, "es", x509.ExtKeyUsageServerAuth, dnsNames, ips)
	p.server = tls.Certificate{Certificate: [][]byte{srvDER}, PrivateKey: srvKey}

	cliDER, cliKey := issue(3, "cerebro-client", x509.ExtKeyUsageClientAuth, nil, nil)
	keyDER, _ := x509.MarshalPKCS8PrivateKey(cliKey)
	p.clientCert = writePEM(t, dir, "client.pem", "CERTIFICATE", cliDER)
	p.clientKey = writePEM(t, dir, "client-key.pem", "PRIVATE KEY", keyDER)
	return p
}

func writePEM(t *testing.T, dir, name, typ string, der []byte) string {
	t.Helper()
	path := filepath.Join(dir, name)
	if err := os.WriteFile(path, pem.EncodeToMemory(&pem.Block{Type: typ, Bytes: der}), 0o600); err != nil {
		t.Fatal(err)
	}
	return path
}

// tlsServer 启动 HTTPS 假 ES，mtls 为 true 时要求客户端证书。
func tlsServer(t *testing.T, p *testPKI, mtls bool) (*httptest.Server, *[]string) {
	t.Helper()
	var mu sync.Mutex
	peers := &[]string{}
	srv := httptest.NewUnstartedServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mu.Lock()
		for _, c := range r.TLS.PeerCertificates {
			*peers = append(*peers, c.Subject.CommonName)
		}
		mu.Unlock()
		_, _ = io.WriteString(w, `{"status":"green"}`)
	}))
	srv.Config.ErrorLog = log.New(io.Discard, "", 0)
	srv.TLS = &tls.Config{Certificates: []tls.Certificate{p.server}}
	if mtls {
		srv.TLS.ClientAuth = tls.RequireAndVerifyClientCert
		srv.TLS.ClientCAs = p.pool
	}
	srv.StartTLS()
	t.Cleanup(srv.Close)
	return srv, peers
}

func doTLS(srvURL string, cfg TLSConfig) (*Response, error) {
	c := NewClient(5*time.Second, "")
	defer c.Close()
	return c.Do(context.Background(), &Target{URL: srvURL, TLS: cfg}, http.MethodGet, "/_cluster/health", nil, "")
}

var localhostIPs = []net.IP{net.ParseIP("127.0.0.1"), net.ParseIP("::1")}

func TestTLSCustomCA(t *testing.T) {
	p := newTestPKI(t, []string{"localhost"}, localhostIPs)
	srv, _ := tlsServer(t, p, false)

	resp, err := doTLS(srv.URL, TLSConfig{CAFile: p.caFile})
	if err != nil || resp.Status != 200 {
		t.Fatalf("with CA: %v %+v", err, resp)
	}
	if _, err := doTLS(srv.URL, TLSConfig{}); err == nil || !strings.Contains(err.Error(), "certificate") {
		t.Fatalf("without CA: want certificate error, got %v", err)
	}
}

func TestTLSInsecureSkipVerifyOnlyWhenSet(t *testing.T) {
	p := newTestPKI(t, []string{"localhost"}, localhostIPs)
	srv, _ := tlsServer(t, p, false)
	if _, err := doTLS(srv.URL, TLSConfig{InsecureSkipVerify: false}); err == nil {
		t.Fatal("verification should fail when InsecureSkipVerify is false")
	}
	if resp, err := doTLS(srv.URL, TLSConfig{InsecureSkipVerify: true}); err != nil || resp.Status != 200 {
		t.Fatalf("InsecureSkipVerify: %v", err)
	}
}

func TestTLSServerName(t *testing.T) {
	p := newTestPKI(t, []string{"es.internal"}, nil) // 证书里没有 IP
	srv, _ := tlsServer(t, p, false)
	if _, err := doTLS(srv.URL, TLSConfig{CAFile: p.caFile}); err == nil {
		t.Fatal("IP address should not match a DNS-only certificate")
	}
	if resp, err := doTLS(srv.URL, TLSConfig{CAFile: p.caFile, ServerName: "es.internal"}); err != nil || resp.Status != 200 {
		t.Fatalf("with ServerName: %v", err)
	}
}

func TestTLSMutual(t *testing.T) {
	p := newTestPKI(t, []string{"localhost"}, localhostIPs)
	srv, peers := tlsServer(t, p, true)

	if _, err := doTLS(srv.URL, TLSConfig{CAFile: p.caFile}); err == nil {
		t.Fatal("server requires a client certificate, request without one should fail")
	}
	resp, err := doTLS(srv.URL, TLSConfig{CAFile: p.caFile, CertFile: p.clientCert, KeyFile: p.clientKey})
	if err != nil || resp.Status != 200 {
		t.Fatalf("with client cert: %v", err)
	}
	if len(*peers) != 1 || (*peers)[0] != "cerebro-client" {
		t.Fatalf("server saw peers %v", *peers)
	}
}

func TestTLSBadFiles(t *testing.T) {
	p := newTestPKI(t, []string{"localhost"}, localhostIPs)
	garbage := filepath.Join(t.TempDir(), "garbage.pem")
	_ = os.WriteFile(garbage, []byte("not a pem"), 0o600)
	cases := map[string]TLSConfig{
		"CA 不存在":   {CAFile: filepath.Join(t.TempDir(), "missing.pem")},
		"CA 不是证书":  {CAFile: garbage},
		"只有证书没有私钥": {CertFile: p.clientCert},
		"私钥不匹配":    {CertFile: p.clientCert, KeyFile: garbage},
	}
	for name, cfg := range cases {
		if _, err := doTLS("https://127.0.0.1:1", cfg); err == nil {
			t.Errorf("%s: want error", name)
		}
	}
}
