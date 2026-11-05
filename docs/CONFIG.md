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
| `CEREBRO_SECRET` | `session.secret` |
| `CEREBRO_SESSION_MAX_AGE` | `session.maxAge` |
| `CEREBRO_HISTORY_ENABLED` / `_SIZE` / `_PATH` | `history.*` |
| `CEREBRO_ES_TIMEOUT` | `es.timeout` |
| `CEREBRO_ES_CA` / `_CERT` / `_KEY` | `es.tls.ca` / `cert` / `key` |
| `CEREBRO_ES_INSECURE_SKIP_VERIFY` | `es.tls.insecureSkipVerify` |
| `CEREBRO_ES_SERVER_NAME` | `es.tls.serverName` |
| `CEREBRO_HOSTS` | 追加预设集群：`名字=地址,地址2` |
| `CEREBRO_LOG_LEVEL` / `CEREBRO_LOG_FORMAT` | `log.level` / `log.format` |

## 连接 ES 的凭据

- 配置里预设：`hosts[].auth` 三选一（`username`+`password`、`apiKey`、`bearer`），优先于页面上填写的凭据。
- 页面上填写：用户名和密码都填按 Basic 处理；**用户名留空、密码填 API Key** 按 API Key 处理（`id:api_key` 或编码后的值都可以）；密码以 `Bearer ` 开头按 Bearer 处理。凭据只保存在浏览器内存中，随每个请求发给 Cerebro，服务端不写磁盘、不打日志。

## 只读模式

开启后服务端拦截以下接口，返回 `{"status":403}`，请求不会发到 ES：

- 别名修改、创建索引、关闭/打开/删除索引、force merge、清缓存、refresh、flush
- 开关分片分配、迁移分片
- 模板创建/删除、集群设置和索引设置修改
- 仓库创建/删除，快照创建/删除/恢复
- REST 页面里 GET 以外的请求

`hosts[].readOnly` 只对按名字连接的集群生效；在页面上手动输入地址不会套用这个设置，需要全局只读请用顶层的 `readOnly`。

## Docker

```bash
docker run -p 9000:9000 -v cerebro-data:/data \
  -v $PWD/cerebro.yaml:/etc/cerebro/cerebro.yaml:ro \
  ghcr.io/ritterhou/cerebro:latest
```

镜像基于 `distroless/static:nonroot`，以 UID 65532 运行，健康检查使用 `cerebro healthcheck` 子命令（读取同一份配置得到端口和 `basePath`）。
