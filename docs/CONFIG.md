# 配置说明

Cerebro 0.10 起用 YAML 配置加环境变量覆盖。完整示例见仓库根目录的 [`cerebro.example.yaml`](../cerebro.example.yaml)。

配置文件按顺序查找：`-config` 参数 → `CEREBRO_CONFIG` → `./cerebro.yaml` → `/etc/cerebro/cerebro.yaml`。都没有时只用默认值和环境变量。配置值里可以写 `${ENV_NAME}` 引用环境变量（只认这种带花括号的写法，bcrypt 哈希里的 `$` 不受影响）。

## 旧 `application.conf` 对应关系

| 旧配置 | 新配置 | 说明 |
| --- | --- | --- |
| `secret` | `session.secret` | 留空即可：首次启动随机生成并保存在 `dataDir/session.key`。旧版写死默认值，会话 cookie 可以被伪造 |
| `basePath` | `basePath` | 自动补全首尾的 `/` |
| `pidfile.path` | — | 不再生成 PID 文件 |
| `rest.history.size` | `history.size` | |
| `data.path` | `history.path` | 默认 `<dataDir>/cerebro.db`，旧库可直接使用 |
| `play.server.http.port` / `-Dhttp.port` | `port` | |
| `-Dhttp.address` | `address` | |
| `es.gzip` | — | 始终请求 gzip 压缩 |
| `auth.type` | `auth.type` | `none`、`basic`、`ldap` |
| `auth.settings.username` / `password` | `auth.basic.users[]` | 支持多个用户，密码必须是 bcrypt 哈希（`cerebro hash-password` 生成） |
| `auth.settings.url` | `auth.ldap.url` | |
| `auth.settings.base-dn` | `auth.ldap.baseDN` | |
| `auth.settings.method` | `auth.ldap.method` | 只支持 `simple` |
| `auth.settings.user-template` | `auth.ldap.userTemplate` | |
| `auth.settings.bind-dn` / `bind-pw` | `auth.ldap.bindDN` / `bindPassword` | |
| `auth.settings.group-search.*` | `auth.ldap.groupSearch.*` | `base-dn`→`baseDN`，`user-attr`→`userAttr`，`user-attr-template`→`userAttrTemplate`，`group`→`group` |
| `hosts[].host` / `name` | `hosts[].host` / `name` | `host` 可以带路径前缀，如 `https://example.com/es` |
| `hosts[].auth.username` / `password` | `hosts[].auth.username` / `password` | 另外支持 `apiKey`、`bearer` |
| `hosts[].headers-whitelist` | `hosts[].headersWhitelist` | |
| — | `hosts[].tls`、`es.tls` | 自定义 CA、客户端证书（mTLS）、显式跳过校验 |
| — | `readOnly`、`hosts[].readOnly` | 只读模式 |
| — | `history.enabled` | 设为 `false` 不保存请求历史 |
| — | `allowUnknownHosts` | 设为 `false` 时只能连接 `hosts` 里的集群（默认 `true`，同旧版） |

## 环境变量

旧版的环境变量继续有效：`CEREBRO_PORT`、`AUTH_TYPE`、`LDAP_URL`、`LDAP_BASE_DN`、`LDAP_METHOD`、`LDAP_USER_TEMPLATE`、`LDAP_BIND_DN`、`LDAP_BIND_PWD`、`LDAP_GROUP_BASE_DN`、`LDAP_USER_ATTR`、`LDAP_USER_ATTR_TEMPLATE`、`LDAP_GROUP`、`BASIC_AUTH_USER`、`BASIC_AUTH_PWD`。`BASIC_AUTH_PWD` 可以是 bcrypt 哈希，也可以是明文（启动时哈希，并输出警告）。

新增：

| 环境变量 | 对应配置 |
| --- | --- |
| `CEREBRO_CONFIG` | 配置文件路径 |
| `CEREBRO_ADDRESS` | `address` |
| `CEREBRO_BASE_PATH` | `basePath` |
| `CEREBRO_DATA_DIR` | `dataDir`（镜像里默认 `/data`） |
| `CEREBRO_READ_ONLY` | `readOnly` |
| `CEREBRO_ALLOW_UNKNOWN_HOSTS` | `allowUnknownHosts` |
| `CEREBRO_SECRET` | `session.secret` |
| `CEREBRO_SESSION_MAX_AGE` | `session.maxAge` |
| `CEREBRO_HISTORY_ENABLED` / `_SIZE` / `_PATH` | `history.*` |
| `CEREBRO_ES_TIMEOUT` | `es.timeout` |
| `CEREBRO_ES_CA` / `_CERT` / `_KEY` | `es.tls.ca` / `cert` / `key` |
| `CEREBRO_ES_INSECURE_SKIP_VERIFY` | `es.tls.insecureSkipVerify` |
| `CEREBRO_ES_SERVER_NAME` | `es.tls.serverName` |
| `CEREBRO_HOSTS` | 追加预设集群：`名字=地址,地址2` |
| `CEREBRO_LOG_LEVEL` / `CEREBRO_LOG_FORMAT` | `log.level` / `log.format` |

## Cerebro 登录

`auth.type` 可选：

- `none`：不需要登录（默认）。
- `basic`：用户名密码，支持多个用户，密码用 `cerebro hash-password` 生成的 bcrypt 哈希。
- `ldap`：LDAP 绑定校验，可选组成员校验；支持 `ldaps://` 和 `startTLS`。
- `oidc`：OpenID Connect 单点登录（授权码流程 + PKCE，校验 state 和 nonce；按邮箱限制名单时要求 `email_verified` 为 true）。登录页显示 “Sign in with SSO” 按钮；回调地址是 `<basePath>auth/oidc/callback`，需要在 IdP 里登记。可以用 `allowedUsers`、`allowedDomains`、`allowedGroups` 限制谁能登录。环境变量：`OIDC_ISSUER`、`OIDC_CLIENT_ID`、`OIDC_CLIENT_SECRET`、`OIDC_REDIRECT_URL`。
- `proxy`：信任反向代理传来的用户头，例如 oauth2-proxy 的 `X-Auth-Request-Email`、Cloudflare Access 的 `Cf-Access-Authenticated-User-Email`。**必须**配置 `trustedProxies`，只接受这些地址发来的请求头；还可以配置 `jwt` 校验代理签发的 JWT（Cloudflare Access 推荐这样做）。环境变量：`CEREBRO_PROXY_HEADER`、`CEREBRO_PROXY_TRUSTED`（逗号分隔的 CIDR）。

## 连接 ES 的凭据

- 配置里预设：`hosts[].auth` 三选一（`username`+`password`、`apiKey`、`bearer`），优先于页面上填写的凭据。`hosts[].tls` 只覆盖写了的项，其余沿用 `es.tls`。
- 页面上填写：用户名和密码都填按 Basic 处理；**用户名留空、密码填 API Key** 按 API Key 处理（`id:api_key` 或编码后的值都可以）；密码以 `Bearer ` 开头按 Bearer 处理。凭据只保存在浏览器内存中，随每个请求发给 Cerebro，服务端不写磁盘、不打日志。

## 只读模式

开启后服务端拦截以下接口，返回 `{"status":403}`，请求不会发到 ES：

- 别名修改、创建索引、关闭/打开/删除索引、force merge、清缓存、refresh、flush
- 开关分片分配、迁移分片
- 模板创建/删除、集群设置和索引设置修改
- 仓库创建/删除，快照创建/删除/恢复
- REST 页面里 GET 以外的请求，以及会改动集群的 GET 请求（`_refresh`、`_flush`、`_security/enroll`）

`hosts[].readOnly` 对按名字连接和手动输入同一地址（协议、主机名大小写和默认端口、末尾斜杠都会归一化后比较）都生效。但换一种写法（比如用 IP 代替域名）仍然能连上，所以要把只读当成安全边界时，请同时设置 `allowUnknownHosts: false`，只允许连接配置里的集群；或者直接用顶层的 `readOnly`。

## 安全相关

- 请求路径里不允许出现 `.`、`..` 段和反斜杠（包括 `%2e%2e` 这类编码形式），避免经反向代理规范化后逃出集群地址的路径前缀。
- 集群地址里写了凭据（`https://user:pass@host`）时，会自动挪到 `auth`，页面和报错里不会出现密码。
- 登录失败限速：5 分钟内同一来源 IP 对同一用户失败 10 次、同一用户名失败 50 次、或同一来源 IP 失败 100 次后暂时拒绝；尝试在校验前就计数，并发请求绕不过。部署在反向代理后面时请配置顶层的 `trustedProxies`（环境变量 `CEREBRO_TRUSTED_PROXIES`），按 `X-Forwarded-For` 识别真实客户端。
- 从配置里删掉的 Basic 用户，已登录的会话立即失效。
- REST 页里 `_security` 相关的请求，以及 `_inference`、`_snapshot`、`_watcher`、`_connector` 的写请求不写进历史（请求体里可能有密码或密钥）；新建的 `cerebro.db` 权限为 0600。
- 不跟随 ES 返回的重定向，凭据和透传的请求头不会被带到别的地址。
- TLS 配置（CA、客户端证书）在启动时加载，路径或内容有误会直接启动失败。

## Docker

```bash
docker run -p 9000:9000 -v cerebro-data:/data \
  -v $PWD/cerebro.yaml:/etc/cerebro/cerebro.yaml:ro \
  ghcr.io/ritterhou/cerebro:latest
```

镜像基于 `distroless/static:nonroot`，以 UID 65532 运行，健康检查使用 `cerebro healthcheck` 子命令。healthcheck 只能通过 `CEREBRO_CONFIG` 或默认位置（`/etc/cerebro/cerebro.yaml`）找到配置，读取其中的端口和 `basePath`；所以在 Docker 里请用这两种方式提供配置，不要用 `-config` 参数，否则改了端口或 `basePath` 后健康检查会一直失败。
