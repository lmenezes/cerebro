// Package cerebro 只负责把前端资源打进二进制。
package cerebro

import "embed"

// UI 是 Vue 前端的构建产物（web/dist，由 npm --prefix web run build 生成）。
// 没构建前端时这里只有一个占位文件，服务照常启动，首页提示需要先构建前端。
//
//go:embed all:web/dist
var UI embed.FS
