package server

import (
	"net"
	"net/http"
	"sync"
	"time"
)

// loginLimiter 限制登录失败次数：同一来源 IP 或同一用户名在窗口期内失败太多次就暂时拒绝，
// 同时限制并发校验数，避免 bcrypt/LDAP 被刷爆。
type loginLimiter struct {
	mu       sync.Mutex
	failures map[string][]time.Time
	max      int
	window   time.Duration
	sem      chan struct{}
	now      func() time.Time
}

func newLoginLimiter() *loginLimiter {
	return &loginLimiter{failures: map[string][]time.Time{}, max: 10, window: 5 * time.Minute, sem: make(chan struct{}, 8), now: time.Now}
}

func clientIP(r *http.Request) string {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}

func (l *loginLimiter) keys(r *http.Request, user string) []string {
	return []string{"ip:" + clientIP(r), "user:" + user}
}

// prune 去掉窗口外的记录，调用方持锁。
func (l *loginLimiter) prune(key string) []time.Time {
	cutoff := l.now().Add(-l.window)
	list := l.failures[key]
	i := 0
	for i < len(list) && list[i].Before(cutoff) {
		i++
	}
	list = list[i:]
	if len(list) == 0 {
		delete(l.failures, key)
	} else {
		l.failures[key] = list
	}
	return list
}

// blocked 判断是否已超过失败次数上限。
func (l *loginLimiter) blocked(r *http.Request, user string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, k := range l.keys(r, user) {
		if len(l.prune(k)) >= l.max {
			return true
		}
	}
	return false
}

func (l *loginLimiter) fail(r *http.Request, user string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, k := range l.keys(r, user) {
		l.failures[k] = append(l.prune(k), l.now())
	}
	// 防止被大量不同用户名撑大
	if len(l.failures) > 100000 {
		l.failures = map[string][]time.Time{}
	}
}

func (l *loginLimiter) succeed(user string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	delete(l.failures, "user:"+user)
}
