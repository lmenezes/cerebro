# 截图比对的基准

这里是原版 AngularJS 前端的打包产物（来自 `scala-final` 的 `public/`），只用于和新的 Vue 前端逐像素比对，不会打进二进制。

在原样的基础上，只同步了下面这些**已确认要改**的界面变化，新旧两边保持一致，比对仍然是严格的逐像素比对
（任一颜色通道相差超过 1/255 即判为差异；差 1 是软件渲染阴影模糊时的噪声，Linux CI 上会出现，肉眼不可见）：

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `mode-json.js`、`worker-json.js` | 换成 ace-builds 1.2.4 自带的版本 | 原文件来自别的 ace 版本，与 ace 1.2.4 不配套，编辑器会对合法 JSON 误报错误、对非法 JSON 不报 |
| `templates/index.html`、`js/app.js` | 模式列和按模式筛选改读 `index_patterns`；新建模板的示例改用 `index_patterns` | 原版读的是 ES 5 的 `template` 字段，7.x 起一直为空、筛选抛异常，示例也会被 ES 拒绝 |
| `overview.html` | “force merge selected” 补上 `data-toggle="modal"`（原来误写成 `wtarget`） | 原版点了不弹确认框，操作执行不了 |
| `navbar.html` | more 菜单末尾新增 5 个页面入口 | 第三阶段的新页面 |
| `connect.html` | 认证表单新增 API key 输入框 | 第二阶段新增 |
| `cat/index.html`、`js/app.js` | cat 表格升序用向上箭头、第一次点击是升序；按列名直接取值（`docs.count` 这类列名不再当嵌套属性），数字按数值排；没选 api 时不执行 | 原版把 sortAsc 当成倒序，带点的列名排不了序，空选择会报错 |
| `aliases.html` | 删除图标点击不再冒泡 | 原版点删除会顺带展开这条别名的详情 |
| `js/app.js`（IndexSettingsController） | 待保存的修改按“是否已有这一项”判断 | 原版把某项改成空值后计数重复累加，撤销也删不掉 |
| `js/app.js`（SnapshotController） | 删除快照失败的提示改为 “Error deleting snapshot” | 原版提示文字写错 |
| `js/app.js`（AnalysisController） | 未选索引时不发分析请求 | 原版条件写成了 `text && field && text` |

第三方脚本（jQuery、ace）在新前端里换成了同版本的压缩文件，基准保持原来的未压缩版本，比对同时验证了两者表现一致。
