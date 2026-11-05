// 截图比对用的假 ES：回放录好的响应，保证新旧前端拿到完全相同的数据。
//   回放：node e2e/fakees.mjs --port 19300 --fixtures e2e/fixtures/es9.json[,e2e/fixtures/more.json...]
//   录制：同上加 --record https://localhost:19200，新录到的响应写进最后一个文件
//         （录制时用 ES_AUTH 环境变量给出 Authorization 头，NODE_TLS_REJECT_UNAUTHORIZED=0 跳过本地自签证书）
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const { values: args } = parseArgs({
  options: { port: { type: 'string', default: '19300' }, fixtures: { type: 'string' }, record: { type: 'string' } },
});
const files = args.fixtures.split(',');
const recordFile = files[files.length - 1];
const fixtures = {};
const recorded = existsSync(recordFile) ? JSON.parse(readFileSync(recordFile, 'utf8')) : {};
for (const f of files) {
  if (existsSync(f)) {
    Object.assign(fixtures, JSON.parse(readFileSync(f, 'utf8')));
  }
}

const keyOf = (method, url, body) =>
  `${method} ${url}` + (body.length ? ` #${createHash('sha1').update(body).digest('hex').slice(0, 12)}` : '');

const readBody = (req) =>
  new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });

async function record(req, body) {
  const resp = await fetch(args.record.replace(/\/+$/, '') + req.url, {
    method: req.method,
    headers: {
      'content-type': req.headers['content-type'] || 'application/json',
      ...(process.env.ES_AUTH ? { authorization: process.env.ES_AUTH } : {}),
    },
    body: body.length ? body : undefined,
  });
  const text = await resp.text();
  const entry = { status: resp.status, body: text };
  fixtures[keyOf(req.method, req.url, body)] = entry;
  recorded[keyOf(req.method, req.url, body)] = entry;
  writeFileSync(recordFile, JSON.stringify(recorded, null, 1) + '\n');
  return { status: resp.status, body: text };
}

createServer(async (req, res) => {
  const body = await readBody(req);
  if (req.url === '/__health') {
    res.end('ok');
    return;
  }
  let reply = fixtures[keyOf(req.method, req.url, body)] ?? fixtures[keyOf(req.method, req.url, Buffer.alloc(0))];
  if (args.record && !reply) {
    reply = await record(req, body);
  }
  if (!reply) {
    // 没录到的写操作按成功处理，读操作返回 404 方便发现遗漏
    reply = req.method === 'GET'
      ? { status: 404, body: JSON.stringify({ error: `no fixture for ${req.method} ${req.url}` }) }
      : { status: 200, body: '{"acknowledged":true}' };
    console.error(`[fakees] missing fixture: ${req.method} ${req.url}`);
  }
  res.writeHead(reply.status, { 'content-type': 'application/json' });
  res.end(reply.body);
}).listen(Number(args.port), () => console.log(`[fakees] listening on ${args.port}`));
