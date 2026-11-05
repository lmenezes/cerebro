package server

import (
	"context"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"
)

// loginLimiter 限制登录尝试，按三个维度计数，任一达到上限就暂时拒绝：
//   - 来源 IP + 用户名：10 次（主要的防暴力破解手段，不会误伤别人）
//   - 用户名：50 次（防止换 IP 猜同一个账号，阈值较高，别人难以借此锁住账号）
//   - 来源 IP：100 次（部署在反向代理后面且没配 trustedProxies 时所有人共用一个 IP，阈值要高）
//
// 尝试在校验之前就预占计数（同一把锁里检查和登记），并发突发也绕不过；登录成功后撤销。
type loginLimiter struct {
	mu      sync.Mutex
	entries map[string][]time.Time
	window  time.Duration
	limits  map[string]int // 按 key 前缀
	maxKeys int
	sem     chan struct{}
	now     func() time.Time
	trusted []*net.IPNet // 可信反向代理，从这些地址来的请求按 X-Forwarded-For 取客户端 IP
}

func newLoginLimiter(trustedProxies []string) *loginLimiter {
	l := &loginLimiter{
		entries: map[string][]time.Time{},
		window:  5 * time.Minute,
		limits:  map[string]int{"pair": 10, "user": 50, "ip": 100},
		maxKeys: 50000,
		sem:     make(chan struct{}, 8),
		now:     time.Now,
	}
	for _, cidr := range trustedProxies {
		if _, n, err := net.ParseCIDR(strings.TrimSpace(cidr)); err == nil {
			l.trusted = append(l.trusted, n)
		}
	}
	return l
}

func (l *loginLimiter) isTrusted(ip net.IP) bool {
	for _, n := range l.trusted {
		if n.Contains(ip) {
			return true
		}
	}
	return false
}

// clientIP 返回客户端地址：来自可信代理时取 X-Forwarded-For 里最右边一个不可信的地址；IPv6 按 /64 归并。
func (l *loginLimiter) clientIP(r *http.Request) string {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		host = r.RemoteAddr
	}
	ip := net.ParseIP(host)
	if ip != nil && l.isTrusted(ip) {
		hops := strings.Split(strings.Join(r.Header.Values("X-Forwarded-For"), ","), ",")
		for i := len(hops) - 1; i >= 0; i-- {
			hop := net.ParseIP(strings.TrimSpace(hops[i]))
			if hop == nil {
				break
			}
			ip = hop
			if !l.isTrusted(hop) {
				break
			}
		}
	}
	if ip == nil {
		return host
	}
	if ip.To4() == nil {
		return ip.Mask(net.CIDRMask(64, 128)).String() + "/64"
	}
	return ip.String()
}

func (l *loginLimiter) keys(r *http.Request, user string) []string {
	ip := l.clientIP(r)
	return []string{"pair:" + ip + "|" + user, "user:" + user, "ip:" + ip}
}

func (l *loginLimiter) limit(key string) int {
	return l.limits[key[:strings.IndexByte(key, ':')]]
}

// prune 去掉窗口外的记录，调用方持锁。
func (l *loginLimiter) prune(key string) []time.Time {
	cutoff := l.now().Add(-l.window)
	list := l.entries[key]
	i := 0
	for i < len(list) && list[i].Before(cutoff) {
		i++
	}
	list = list[i:]
	if len(list) == 0 {
		delete(l.entries, key)
	} else {
		l.entries[key] = list
	}
	return list
}

// reserve 检查并预占一次尝试；超过上限返回 false。返回的 done 在校验结束后调用，成功时撤销计数。
func (l *loginLimiter) reserve(r *http.Request, user string) (done func(success bool), ok bool) {
	keys := l.keys(r, user)
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, k := range keys {
		if len(l.prune(k)) >= l.limit(k) {
			return nil, false
		}
	}
	at := l.now()
	for _, k := range keys {
		l.entries[k] = append(l.entries[k], at)
	}
	l.evict()
	return func(success bool) {
		if !success {
			return
		}
		l.mu.Lock()
		defer l.mu.Unlock()
		delete(l.entries, keys[0]) // 成功登录后，这个 IP 对这个用户的失败记录清零
		for _, k := range keys[1:] {
			l.entries[k] = removeOne(l.entries[k], at)
			if len(l.entries[k]) == 0 {
				delete(l.entries, k)
			}
		}
	}, true
}

func removeOne(list []time.Time, t time.Time) []time.Time {
	for i := len(list) - 1; i >= 0; i-- {
		if list[i].Equal(t) {
			return append(list[:i:i], list[i+1:]...)
		}
	}
	return list
}

// evict 控制内存：key 太多时先清掉过期的，仍然太多就淘汰未达上限的 key（已封禁的保留）。调用方持锁。
func (l *loginLimiter) evict() {
	if len(l.entries) <= l.maxKeys {
		return
	}
	for k := range l.entries {
		l.prune(k)
	}
	for k, v := range l.entries {
		if len(l.entries) <= l.maxKeys*9/10 {
			return
		}
		if len(v) < l.limit(k) {
			delete(l.entries, k)
		}
	}
}

// acquire 限制同时进行的密码校验数；客户端已断开就不再排队。
func (l *loginLimiter) acquire(ctx context.Context) bool {
	select {
	case l.sem <- struct{}{}:
		return true
	case <-ctx.Done():
		return false
	}
}

func (l *loginLimiter) release() { <-l.sem }
