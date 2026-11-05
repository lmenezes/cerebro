package main

import (
	"bytes"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"testing"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/RitterHou/cerebro/internal/config"
)

// clearEnv 清掉会影响配置的环境变量。
func clearEnv(t *testing.T) {
	for _, k := range []string{"CEREBRO_CONFIG", "CEREBRO_PORT", "CEREBRO_ADDRESS", "CEREBRO_BASE_PATH", "CEREBRO_DATA_DIR",
		"CEREBRO_HISTORY_PATH", "CEREBRO_HISTORY_ENABLED", "CEREBRO_SECRET", "AUTH_TYPE", "CEREBRO_HOSTS"} {
		t.Setenv(k, "")
	}
}

func writeConfig(t *testing.T, content string) string {
	t.Helper()
	path := filepath.Join(t.TempDir(), "cerebro.yaml")
	if err := os.WriteFile(path, []byte(content), 0o600); err != nil {
		t.Fatal(err)
	}
	return path
}

func runCmd(args ...string) (int, string, string) {
	var out, errOut bytes.Buffer
	code := run(args, &out, &errOut)
	return code, out.String(), errOut.String()
}

func TestRunVersion(t *testing.T) {
	code, out, _ := runCmd("version")
	if code != 0 || out != version+"\n" {
		t.Fatalf("version: %d %q", code, out)
	}
}

func TestRunHelp(t *testing.T) {
	code, out, _ := runCmd("help")
	if code != 0 || !strings.Contains(out, "Usage:") || !strings.Contains(out, "hash-password") {
		t.Fatalf("help: %d %q", code, out)
	}
}

func TestRunDashHelp(t *testing.T) {
	for _, arg := range []string{"-h", "--help"} {
		code, out, _ := runCmd(arg)
		if code != 0 || !strings.Contains(out, "Usage:") {
			t.Errorf("%s: %d %q", arg, code, out)
		}
	}
}

func TestRunUnknownCommand(t *testing.T) {
	code, out, errOut := runCmd("frobnicate")
	if code != 2 || out != "" || !strings.Contains(errOut, `unknown command "frobnicate"`) || !strings.Contains(errOut, "Usage:") {
		t.Fatalf("unknown command: %d %q %q", code, out, errOut)
	}
}

func TestServeConfigErrors(t *testing.T) {
	clearEnv(t)
	missing := filepath.Join(t.TempDir(), "missing.yaml")
	bad := writeConfig(t, "auth:\n  type: oauth\n")
	cases := [][]string{
		{"serve", "-config", missing},
		{"-config", missing}, // 默认命令是 serve
		{"serve", "-config", bad},
		{"serve", "-no-such-flag"},
		{"healthcheck", "-config", bad},
	}
	for _, args := range cases {
		if code, _, errOut := runCmd(args...); code != 2 || errOut == "" {
			t.Errorf("%v: code %d stderr %q", args, code, errOut)
		}
	}
}

// healthServer 启动一个本机 HTTP 服务，返回端口。
func healthServer(t *testing.T, handler http.HandlerFunc) int {
	t.Helper()
	srv := httptest.NewServer(handler)
	t.Cleanup(srv.Close)
	_, port, _ := net.SplitHostPort(srv.Listener.Addr().String())
	p, _ := strconv.Atoi(port)
	return p
}

func TestHealthcheck(t *testing.T) {
	clearEnv(t)
	var gotPath string
	port := healthServer(t, func(w http.ResponseWriter, r *http.Request) {
		gotPath = r.URL.Path
		if r.URL.Path == "/cerebro/healthz" {
			_, _ = io.WriteString(w, `{"status":"ok"}`)
			return
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
	ok := writeConfig(t, fmt.Sprintf("address: 0.0.0.0\nport: %d\nbasePath: cerebro\n", port))
	if code, _, errOut := runCmd("healthcheck", "-config", ok); code != 0 || gotPath != "/cerebro/healthz" {
		t.Fatalf("healthy: code %d path %q stderr %q", code, gotPath, errOut)
	}
	unhealthy := writeConfig(t, fmt.Sprintf("address: 127.0.0.1\nport: %d\n", port))
	if code, _, errOut := runCmd("healthcheck", "-config", unhealthy); code != 1 || !strings.Contains(errOut, "503") {
		t.Fatalf("unhealthy: code %d stderr %q", code, errOut)
	}
	closed := writeConfig(t, fmt.Sprintf("address: 127.0.0.1\nport: %d\n", freePort(t)))
	if code, _, _ := runCmd("healthcheck", "-config", closed); code != 1 {
		t.Fatalf("nothing listening: code %d", code)
	}
}

func freePort(t *testing.T) int {
	t.Helper()
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	defer l.Close()
	return l.Addr().(*net.TCPAddr).Port
}

// withStdin 用管道替换 os.Stdin。
func withStdin(t *testing.T, input string) {
	t.Helper()
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	_, _ = io.WriteString(w, input)
	_ = w.Close()
	old := os.Stdin
	os.Stdin = r
	t.Cleanup(func() { os.Stdin = old; _ = r.Close() })
}

func TestHashPassword(t *testing.T) {
	for _, input := range []string{"s3cret\n", "s3cret\r\n", "s3cret"} {
		withStdin(t, input)
		code, out, errOut := runCmd("hash-password")
		hash := strings.TrimSpace(out)
		if code != 0 || !config.IsBcrypt(hash) {
			t.Fatalf("%q: code %d out %q err %q", input, code, out, errOut)
		}
		if bcrypt.CompareHashAndPassword([]byte(hash), []byte("s3cret")) != nil {
			t.Fatalf("%q: hash does not match the password", input)
		}
	}
	withStdin(t, "\n")
	if code, out, errOut := runCmd("hash-password"); code != 1 || out != "" || !strings.Contains(errOut, "empty password") {
		t.Fatalf("empty: %d %q %q", code, out, errOut)
	}
}

func TestNewLogger(t *testing.T) {
	var buf bytes.Buffer
	newLogger(config.LogConfig{Level: "debug", Format: "json"}, &buf).Debug("hello")
	if !strings.Contains(buf.String(), `"level":"DEBUG"`) || !strings.Contains(buf.String(), `"msg":"hello"`) {
		t.Fatalf("json debug: %q", buf.String())
	}
	buf.Reset()
	l := newLogger(config.LogConfig{Level: "nonsense", Format: "text"}, &buf)
	l.Debug("hidden")
	l.Info("shown")
	if strings.Contains(buf.String(), "hidden") || !strings.Contains(buf.String(), "msg=shown") {
		t.Fatalf("text info: %q", buf.String())
	}
}

// 真正启动 serve，检查嵌入的前端、数据目录里的密钥和历史库，再用信号优雅退出。
func TestServeStartsAndStops(t *testing.T) {
	if runtime.GOOS == "windows" {
		t.Skip("需要向自身发送 SIGINT")
	}
	clearEnv(t)
	dataDir := t.TempDir()
	port := freePort(t)
	path := writeConfig(t, fmt.Sprintf("address: 127.0.0.1\nport: %d\nbasePath: /cerebro/\ndataDir: %s\nlog:\n  level: error\n", port, dataDir))
	done := make(chan int, 1)
	var errOut bytes.Buffer
	go func() { done <- run([]string{"serve", "-config", path}, io.Discard, &errOut) }()

	base := fmt.Sprintf("http://127.0.0.1:%d/cerebro/", port)
	client := &http.Client{Timeout: time.Second}
	deadline := time.Now().Add(10 * time.Second)
	for {
		resp, err := client.Get(base + "healthz")
		if err == nil {
			_ = resp.Body.Close()
			if resp.StatusCode == 200 {
				break
			}
		}
		select {
		case code := <-done:
			t.Fatalf("serve exited early with %d: %s", code, errOut.String())
		default:
		}
		if time.Now().After(deadline) {
			t.Fatalf("server did not start: %v", err)
		}
		time.Sleep(50 * time.Millisecond)
	}

	// 首页：前端已构建时是带版本号的 Vue 页面，没构建时（CI 里只跑 go test）是 503 提示
	resp, err := client.Get(base)
	if err != nil {
		t.Fatal(err)
	}
	body, _ := io.ReadAll(resp.Body)
	_ = resp.Body.Close()
	switch {
	case resp.StatusCode == 200 && strings.Contains(string(body), `content="`+version+`"`):
	case resp.StatusCode == 503 && strings.Contains(string(body), "npm --prefix web"):
	default:
		t.Errorf("GET /: %d %s", resp.StatusCode, body)
	}
	if fi, err := os.Stat(filepath.Join(dataDir, "session.key")); err != nil || fi.Mode().Perm() != 0o600 {
		t.Errorf("session.key: %v %v", fi, err)
	}
	if _, err := os.Stat(filepath.Join(dataDir, "cerebro.db")); err != nil {
		t.Errorf("history db not created: %v", err)
	}

	p, _ := os.FindProcess(os.Getpid())
	if err := p.Signal(os.Interrupt); err != nil {
		t.Fatal(err)
	}
	select {
	case code := <-done:
		if code != 0 {
			t.Fatalf("serve exit code %d: %s", code, errOut.String())
		}
	case <-time.After(20 * time.Second):
		t.Fatal("serve did not shut down")
	}
}
