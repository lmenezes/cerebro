// Package cerebro 只负责把前端资源打进二进制。
package cerebro

import "embed"

// Public 是旧 AngularJS 前端的打包产物（public/ 目录，原样不改）。
//
//go:embed all:public
var Public embed.FS
