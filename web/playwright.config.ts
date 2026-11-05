import { defineConfig } from '@playwright/test';
import { readdirSync } from 'node:fs';

// 同一个 Go 后端、同一份假 ES 数据，分别挂旧前端（e2e/legacy，原版 AngularJS 的打包产物）和新前端（dist），截图逐像素比对。
// 默认加载 e2e/fixtures 下所有录制文件（es9.json 在最前，其余按名字排序）
const FIXTURES =
  process.env.E2E_FIXTURES ||
  ['es9.json', ...readdirSync('e2e/fixtures').filter((f) => f.endsWith('.json') && f !== 'es9.json').sort()]
    .map((f) => `e2e/fixtures/${f}`)
    .join(',');
// 端口和前端目录可配置，方便多个人（或代理）同时跑：假 ES = BASE，旧前端 = BASE+1，新前端 = BASE+2
const BASE = Number(process.env.E2E_PORT_BASE || 19300);
const DIST = process.env.E2E_DIST || 'dist';
const RECORD = process.env.E2E_RECORD; // 录制时给出真实 ES 地址

const cerebro = (port: number, uiDir: string, dataDir: string) => ({
  command: 'go run ../cmd/cerebro',
  url: `http://localhost:${port}/healthz`,
  reuseExistingServer: !process.env.CI,
  timeout: 120_000,
  env: {
    CEREBRO_PORT: String(port),
    CEREBRO_UI_DIR: uiDir,
    CEREBRO_DATA_DIR: dataDir,
    CEREBRO_HISTORY_ENABLED: 'false',
    CEREBRO_HOSTS: `fixture=http://localhost:${BASE}`,
    CEREBRO_LOG_LEVEL: 'warn',
  },
});

export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  outputDir: `test-results/pw-${BASE}`,
  use: {
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    browserName: 'chromium',
    // 旧前端的 ngAnimate 会分多帧改 class，Chrome 只重绘失效区域时控件圆角的抗锯齿会差一个色阶；整页栅格化避免这类假差异
    launchOptions: { args: ['--disable-partial-raster'] },
  },
  webServer: [
    {
      command: `node e2e/fakees.mjs --port ${BASE} --fixtures ${FIXTURES}` + (RECORD ? ` --record ${RECORD}` : ''),
      url: `http://localhost:${BASE}/__health`,
      reuseExistingServer: !process.env.CI,
      ignoreHTTPSErrors: true,
    },
    cerebro(BASE + 1, 'e2e/legacy', `e2e/.data/legacy-${BASE}`),
    cerebro(BASE + 2, DIST, `e2e/.data/vue-${BASE}`),
  ],
});
