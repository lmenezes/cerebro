// 生成与旧前端完全相同的第三方脚本和样式：顺序、版本、内容都和原 Gruntfile 的 concat 一致。
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = (p) => join(root, 'node_modules', p);
const out = (p) => join(root, 'public', p);
const cat = (files, sep) => files.map((f) => readFileSync(f, 'utf8')).join(sep);

mkdirSync(out('js'), { recursive: true });
mkdirSync(out('css'), { recursive: true });

// 旧 lib.js 去掉 angular 相关的部分
writeFileSync(out('js/vendor.js'), cat([
  nm('jquery/dist/jquery.js'),
  nm('bootstrap/dist/js/bootstrap.min.js'),
  nm('@lmenezes/json-tree/jsontree.js'),
  nm('ace-builds/src/ace.js'),
], '\n'));

// 旧 lib.css = 定制的 bootstrap.min.css + font-awesome.css
writeFileSync(out('css/lib.css'), cat([
  join(root, 'styles/bootstrap.min.css'),
  nm('font-awesome/css/font-awesome.css'),
], '\n'));
cpSync(join(root, 'styles/app.css'), out('css/app.css'));
cpSync(nm('font-awesome/fonts'), out('fonts'), { recursive: true });
