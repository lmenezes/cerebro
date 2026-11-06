# 截图比对的基准

这里是原版 AngularJS 前端的打包产物（来自 `scala-final` 的 `public/`），只用于和新的 Vue 前端逐像素比对，不会打进二进制。

在原样的基础上，只同步了下面这些**已确认要改**的界面变化，新旧两边保持一致，比对仍然是严格的 0 像素差异：

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `mode-json.js`、`worker-json.js` | 换成 ace-builds 1.2.4 自带的版本 | 原文件来自别的 ace 版本，与 ace 1.2.4 不配套，编辑器会对合法 JSON 误报错误、对非法 JSON 不报 |
| `templates/index.html`、`js/app.js` | 模式列和按模式筛选改读 `index_patterns`；新建模板的示例改用 `index_patterns` | 原版读的是 ES 5 的 `template` 字段，7.x 起一直为空、筛选抛异常，示例也会被 ES 拒绝 |
| `overview.html` | “force merge selected” 补上 `data-toggle="modal"`（原来误写成 `wtarget`） | 原版点了不弹确认框，操作执行不了 |
| `navbar.html` | more 菜单末尾新增 5 个页面入口 | 第三阶段的新页面 |
| `connect.html` | 认证表单新增 API key 输入框 | 第二阶段新增 |
