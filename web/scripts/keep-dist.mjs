// vite build 会清空 dist，补回占位文件，保证没构建前端时 go build 也能通过。
import { writeFileSync } from 'node:fs';
writeFileSync(new URL('../dist/.gitkeep', import.meta.url), '');
