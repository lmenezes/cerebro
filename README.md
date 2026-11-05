Cerebro
------------

Cerebro 是一个开源（MIT 许可证）的 Elasticsearch Web 管理工具。本仓库是 [lmenezes/cerebro](https://github.com/lmenezes/cerebro) 的维护分支：后端用 Go 重写，前端用 Vue 3 重写且界面与原版逐像素一致，只支持 Elasticsearch 7.10+、8.x、9.x，整个程序是一个可执行文件。

相比原版新增：组合模板、组件模板、data streams、ILM 和 SLM 策略页面；分片大小、未分配原因和恢复进度提示；API Key / Bearer / mTLS 连接 ES；只读模式；OIDC 单点登录和反向代理登录。

原项目由 Leonardo Menezes 开发，Scala 版的最后状态保留在 tag `scala-final`。

### 安装

#### Docker

```bash
docker run -p 9000:9000 -v cerebro-data:/data ghcr.io/ritterhou/cerebro:latest
```

镜像支持 `linux/amd64` 和 `linux/arm64`，基于 `distroless/static:nonroot`，以非 root 用户运行，数据目录是 `/data`。配置文件挂载到 `/etc/cerebro/cerebro.yaml`，也可以只用环境变量：

```bash
docker run -p 9000:9000 \
  -e CEREBRO_HOSTS="Local=http://host.docker.internal:9200" \
  -e CEREBRO_READ_ONLY=true \
  ghcr.io/ritterhou/cerebro:latest
```

`main` 分支的最新构建是 `ghcr.io/ritterhou/cerebro:edge`。

#### 二进制

从 [GitHub Releases](https://github.com/RitterHou/cerebro/releases) 下载对应平台的压缩包（macOS、Linux、Windows 的 amd64 和 arm64），解压后运行：

```bash
./cerebro                       # 读取 ./cerebro.yaml（如果有）
./cerebro -config /path/to/cerebro.yaml
```

然后访问 http://localhost:9000 。

#### 从源码构建

需要 Go 1.27+ 和 Node 22+：

```bash
npm --prefix web ci && npm --prefix web run build   # 前端，输出到 web/dist
go build -o cerebro ./cmd/cerebro                   # 把 web/dist 打进二进制
```

### 配置

完整示例见 [`cerebro.example.yaml`](./cerebro.example.yaml)，各项说明、环境变量以及旧 `application.conf` 的对应关系见 [docs/CONFIG.md](./docs/CONFIG.md)。常用项：

- `hosts`：预设集群，可以带路径前缀（如 `https://example.com/es`），可以预设 Basic、API Key 或 Bearer 凭据，可以配置自定义 CA 和客户端证书；
- `readOnly`：只读模式，服务端拦截所有修改类操作，适合连生产集群；
- `auth`：Cerebro 自身的登录，支持 `basic`（多用户，bcrypt 哈希密码）和 `ldap`；
- `basePath`：部署在子路径下；
- `history.enabled: false`：不保存 REST 请求历史，适合无状态部署。

在连接页手动登录 ES 时：用户名和密码都填按 Basic 认证；**用户名留空、密码填 API Key** 按 API Key 认证；密码以 `Bearer ` 开头按 Bearer 认证。

### 命令

```
cerebro [serve] [-config cerebro.yaml]   启动服务（默认）
cerebro healthcheck                      检查本机服务是否健康（镜像的 HEALTHCHECK 使用）
cerebro hash-password                    从标准输入读取密码，输出 bcrypt 哈希
cerebro version                          输出版本号
```

### 开发

```bash
go test ./...
golangci-lint run

cd web
npm run dev        # Vite 开发服务器，接口转发到 :9000 的 Go 后端
npm run e2e        # 新旧前端逐像素截图比对（假 ES 回放 e2e/fixtures 里录好的数据）
```

`web/e2e/legacy/` 是原版 AngularJS 前端的打包产物，只用作截图比对的基准。

### 许可证

MIT，见 [LICENSE](./LICENSE)。
