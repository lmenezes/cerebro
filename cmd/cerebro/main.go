// Command cerebro 是 Elasticsearch 的 Web 管理工具。
package main

import (
	"bufio"
	"context"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"
	_ "time/tzdata" // distroless 镜像里也能用 TZ

	"golang.org/x/term"

	cerebro "github.com/RitterHou/cerebro"
	"github.com/RitterHou/cerebro/internal/auth"
	"github.com/RitterHou/cerebro/internal/config"
	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/server"
	"github.com/RitterHou/cerebro/internal/store"
)

// version 由 -ldflags "-X main.version=..." 注入。
var version = "0.10.0-dev"

func main() {
	os.Exit(run(os.Args[1:], os.Stdout, os.Stderr))
}

func usage(w io.Writer) {
	_, _ = fmt.Fprintf(w, `cerebro %s - Elasticsearch web admin tool

Usage:
  cerebro [serve] [-config cerebro.yaml]   start the server (default)
  cerebro healthcheck [-config ...]        exit 0 if the local server is healthy
  cerebro hash-password                    read a password from stdin, print its bcrypt hash
  cerebro version                          print the version
`, version)
}

func run(args []string, stdout, stderr io.Writer) int {
	cmd := "serve"
	if len(args) > 0 && (!strings.HasPrefix(args[0], "-") || args[0] == "-h" || args[0] == "--help" || args[0] == "-help") {
		cmd, args = args[0], args[1:]
	}
	switch cmd {
	case "serve":
		return serve(args, stderr)
	case "healthcheck":
		return healthcheck(args, stderr)
	case "hash-password":
		return hashPassword(stdout, stderr)
	case "version":
		_, _ = fmt.Fprintln(stdout, version)
		return 0
	case "help", "-h", "--help", "-help":
		usage(stdout)
		return 0
	default:
		_, _ = fmt.Fprintf(stderr, "unknown command %q\n\n", cmd)
		usage(stderr)
		return 2
	}
}

func loadConfig(args []string, stderr io.Writer) (*config.Config, bool) {
	fl := flag.NewFlagSet("cerebro", flag.ContinueOnError)
	fl.SetOutput(stderr)
	path := fl.String("config", "", "path to the YAML config file (default: $CEREBRO_CONFIG or ./cerebro.yaml if present)")
	if err := fl.Parse(args); err != nil {
		return nil, false
	}
	cfg, err := config.Load(*path, os.Getenv)
	if err != nil {
		_, _ = fmt.Fprintln(stderr, "config error:", err)
		return nil, false
	}
	return cfg, true
}

func newLogger(cfg config.LogConfig, w io.Writer) *slog.Logger {
	var level slog.Level
	if err := level.UnmarshalText([]byte(cfg.Level)); err != nil {
		level = slog.LevelInfo
	}
	opts := &slog.HandlerOptions{Level: level}
	if strings.EqualFold(cfg.Format, "json") {
		return slog.New(slog.NewJSONHandler(w, opts))
	}
	return slog.New(slog.NewTextHandler(w, opts))
}

func serve(args []string, stderr io.Writer) int {
	cfg, ok := loadConfig(args, stderr)
	if !ok {
		return 2
	}
	log := newLogger(cfg.Log, os.Stdout)
	slog.SetDefault(log)

	key, ephemeral, err := auth.LoadOrCreateKey(cfg.Session.Secret, cfg.DataDir)
	if err != nil {
		log.Error("session key", "err", err)
		return 1
	}
	if ephemeral && cfg.Auth.Type != "none" {
		log.Warn("logins will be lost on restart because the data dir is not writable", "dataDir", cfg.DataDir)
	}
	authn, err := auth.New(cfg.Auth)
	if err != nil {
		log.Error("auth", "err", err)
		return 1
	}

	var history store.History = store.Noop{}
	if cfg.History.IsEnabled() {
		db, err := store.Open(cfg.History.Path, cfg.History.Size)
		if err != nil {
			log.Error("open history database", "path", cfg.History.Path, "err", err)
			return 1
		}
		defer db.Close()
		history = db
	}

	public, err := fs.Sub(cerebro.UI, "web/dist")
	if err != nil {
		log.Error("embedded assets", "err", err)
		return 1
	}
	if cfg.UIDir != "" {
		public = os.DirFS(cfg.UIDir)
		log.Info("serving UI from directory", "dir", cfg.UIDir)
	} else if _, err := fs.Stat(public, "index.html"); err != nil {
		log.Warn("frontend is not built into this binary, run `npm --prefix web ci && npm --prefix web run build` before go build")
	}
	client := es.NewClient(cfg.ES.Timeout.Duration, "cerebro/"+version)
	defer client.Close()
	srv, err := server.New(server.Options{
		Config: cfg, Client: client, History: history, SessionKey: key,
		Authn: authn, Public: public, Version: version, Logger: log, ReloadUI: cfg.UIDir != "",
	})
	if err != nil {
		log.Error("init server", "err", err)
		return 1
	}

	addr := net.JoinHostPort(cfg.Address, strconv.Itoa(cfg.Port))
	httpServer := &http.Server{
		Addr:              addr,
		Handler:           srv.Handler(),
		ReadHeaderTimeout: 10 * time.Second,
		IdleTimeout:       2 * time.Minute,
	}
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	errCh := make(chan error, 1)
	go func() { errCh <- httpServer.ListenAndServe() }()
	log.Info("cerebro started", "version", version, "address", addr, "basePath", cfg.BasePath,
		"auth", cfg.Auth.Type, "readOnly", cfg.ReadOnly, "history", cfg.History.IsEnabled(), "hosts", len(cfg.Hosts))

	select {
	case err := <-errCh:
		if !errors.Is(err, http.ErrServerClosed) {
			log.Error("server stopped", "err", err)
			return 1
		}
	case <-ctx.Done():
		log.Info("shutting down")
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		if err := httpServer.Shutdown(shutdownCtx); err != nil {
			log.Error("shutdown", "err", err)
		}
	}
	return 0
}

// healthcheck 请求本机的 /healthz，给 distroless 镜像（没有 curl）用。
func healthcheck(args []string, stderr io.Writer) int {
	cfg, ok := loadConfig(args, stderr)
	if !ok {
		return 2
	}
	host := cfg.Address
	if host == "" || host == "0.0.0.0" || host == "::" {
		host = "127.0.0.1"
	}
	url := "http://" + net.JoinHostPort(host, strconv.Itoa(cfg.Port)) + cfg.BasePath + "healthz"
	client := &http.Client{Timeout: 5 * time.Second}
	resp, err := client.Get(url) //nolint:noctx // 一次性命令
	if err != nil {
		_, _ = fmt.Fprintln(stderr, "unhealthy:", err)
		return 1
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		_, _ = fmt.Fprintln(stderr, "unhealthy: status", resp.StatusCode)
		return 1
	}
	return 0
}

func hashPassword(stdout, stderr io.Writer) int {
	var password string
	if term.IsTerminal(int(os.Stdin.Fd())) {
		_, _ = fmt.Fprint(stderr, "Password: ")
		b, err := term.ReadPassword(int(os.Stdin.Fd()))
		_, _ = fmt.Fprintln(stderr)
		if err != nil {
			_, _ = fmt.Fprintln(stderr, err)
			return 1
		}
		password = string(b)
	} else {
		line, err := bufio.NewReader(os.Stdin).ReadString('\n')
		if err != nil && !errors.Is(err, io.EOF) {
			_, _ = fmt.Fprintln(stderr, err)
			return 1
		}
		password = strings.TrimRight(line, "\r\n")
	}
	if password == "" {
		_, _ = fmt.Fprintln(stderr, "empty password")
		return 1
	}
	hash, err := auth.HashPassword(password)
	if err != nil {
		_, _ = fmt.Fprintln(stderr, err)
		return 1
	}
	_, _ = fmt.Fprintln(stdout, hash)
	return 0
}
