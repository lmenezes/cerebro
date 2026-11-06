// 生成第三方脚本和样式：顺序、版本和原 Gruntfile 的 concat 一致（脚本用同版本的压缩文件），样式逐字节相同。
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = (p) => join(root, 'node_modules', p);
const out = (p) => join(root, 'public', p);
const cat = (files, sep) => files.map((f) => readFileSync(f, 'utf8')).join(sep);

mkdirSync(out('js'), { recursive: true });
mkdirSync(out('css'), { recursive: true });

// 旧 lib.js 去掉 angular 相关的部分；版本相同，改用压缩版（体积约减半，行为不变，截图比对验证）
writeFileSync(out('js/vendor.js'), cat([
  nm('jquery/dist/jquery.min.js'),
  nm('bootstrap/dist/js/bootstrap.min.js'),
  nm('@lmenezes/json-tree/jsontree.js'),
  nm('ace-builds/src-min/ace.js'),
], '\n'));

// 旧 lib.css = 定制的 bootstrap.min.css + font-awesome.css
writeFileSync(out('css/lib.css'), cat([
  join(root, 'styles/bootstrap.min.css'),
  nm('font-awesome/css/font-awesome.css'),
], '\n'));
cpSync(join(root, 'styles/app.css'), out('css/app.css'));
cpSync(nm('font-awesome/fonts'), out('fonts'), { recursive: true });

// ace 按需加载的 JSON 模式和语法检查 worker，用与 ace.js 同版本（1.2.4）的文件。
// 原版仓库里的 mode-json.js / worker-json.js 来自别的 ace 版本，worker 与 1.2.4 不配套，
// 会对合法 JSON 误报 "Unexpected ''"，编辑器左侧出现错误标记。
cpSync(nm('ace-builds/src-min/mode-json.js'), out('mode-json.js'));
cpSync(nm('ace-builds/src-min/worker-json.js'), out('worker-json.js'));
