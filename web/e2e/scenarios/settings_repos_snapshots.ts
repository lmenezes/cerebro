// cluster settings、index settings、repositories、snapshot 页面的截图比对场景。
// fixture 数据：集群设置约 900 项（2 项 transient）；logs-app 索引；仓库 fsrepo（fs 类型），里面有快照 nightly-2026.11.01。
import type { Page } from '@playwright/test';
import { clickText, type Scenario } from '../types';

// 截图前强制整页重新栅格化：旧版 ngAnimate 分几帧改 class，Chrome 只重画失效区域（partial raster），
// 表单控件圆角的抗锯齿会差 1 个色阶，和页面内容无关。改一下 body 背景色让整页失效再改回来。
const repaint = async (p: Page) => {
  const frame = () => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await p.evaluate(() => (document.body.style.backgroundColor = '#000'));
  await frame();
  await p.evaluate(() => (document.body.style.backgroundColor = ''));
  await frame();
};

// 设置页：名字完全等于 name 的设置项的输入框
const settingInput = (p: Page, name: string) =>
  p.locator('.col-lg-4 > div.form-group', { has: p.getByText(name, { exact: true }) }).locator('input');
const showStatic = (p: Page) => clickText(p, '.checkbox label', 'show static settings');
const filter = (p: Page, text: string) => p.getByPlaceholder('filter settings by name').fill(text);

const selectType = (p: Page, type: string) => p.locator('select').selectOption({ label: type });
const selectRepository = (p: Page) => p.locator('h4 select').selectOption({ label: 'fsrepo' });

const repositoryTypes = ['fs', 'url', 's3', 'gcs', 'azure', 'hdfs'];

const raw: Scenario[] = [
  // cluster settings
  { name: 'cluster-settings', route: 'cluster_settings' },
  { name: 'cluster-settings-show-static', route: 'cluster_settings', act: showStatic },
  { name: 'cluster-settings-filter', route: 'cluster_settings', act: (p) => filter(p, 'routing.allocation') },
  {
    name: 'cluster-settings-filter-static',
    route: 'cluster_settings',
    act: async (p) => {
      await showStatic(p);
      await filter(p, 'watermark');
    },
  },
  {
    name: 'cluster-settings-pending',
    route: 'cluster_settings',
    act: async (p) => {
      await settingInput(p, 'cluster.routing.allocation.enable').fill('primaries');
      await settingInput(p, 'action.auto_create_index').fill('false');
      // 第二项改成 persistent
      await p.locator('u.normal-action').nth(1).click();
    },
  },
  {
    name: 'cluster-settings-pending-revert',
    route: 'cluster_settings',
    act: async (p) => {
      await settingInput(p, 'cluster.routing.allocation.enable').fill('primaries');
      await settingInput(p, 'action.auto_create_index').fill('false');
      await settingInput(p, 'indices.recovery.max_bytes_per_sec').fill('80mb');
      await p.locator('.pending-changes i.fa-undo').first().click();
    },
  },

  // index settings
  { name: 'index-settings', route: 'index_settings?index=logs-app' },
  { name: 'index-settings-show-static', route: 'index_settings?index=logs-app', act: showStatic },
  { name: 'index-settings-filter', route: 'index_settings?index=logs-app', act: (p) => filter(p, 'slowlog') },
  // 原版把某项改成空值再改别的值时会重复计数（已修复，基准同步），这里应显示 1 pending changes
  {
    name: 'index-settings-pending-empty',
    route: 'index_settings?index=logs-app',
    act: async (p) => {
      await settingInput(p, 'index.refresh_interval').fill('');
      await settingInput(p, 'index.refresh_interval').fill('5s');
    },
  },
  {
    name: 'index-settings-pending',
    route: 'index_settings?index=logs-app',
    act: async (p) => {
      await settingInput(p, 'index.number_of_replicas').fill('2');
      await settingInput(p, 'index.refresh_interval').fill('5s');
    },
  },

  // repositories
  { name: 'repositories', route: 'repository' },
  ...repositoryTypes.map((t) => ({
    name: `repositories-type-${t}`,
    route: 'repository',
    act: (p: Page) => selectType(p, t),
  })),
  {
    name: 'repositories-fs-filled',
    route: 'repository',
    act: async (p) => {
      await p.getByPlaceholder('repository name').fill('backup');
      await selectType(p, 'fs');
      await p.getByPlaceholder('location of the snapshots').fill('/tmp/backup');
      await clickText(p, 'label.cluster-map-node-type', 'False');
    },
  },
  { name: 'repositories-edit', route: 'repository', act: (p) => p.locator('i.fa-pencil').first().click() },
  { name: 'repositories-delete', route: 'repository', act: (p) => p.locator('i.fa-trash').first().click() },

  // snapshot
  { name: 'snapshot', route: 'snapshot' },
  { name: 'snapshot-repository', route: 'snapshot', act: selectRepository },
  {
    name: 'snapshot-special-indices',
    route: 'snapshot',
    act: (p) => clickText(p, 'label.cluster-map-node-type', 'show special indices'),
  },
  {
    name: 'snapshot-create-form',
    route: 'snapshot',
    act: async (p) => {
      await p.locator('select').nth(1).selectOption({ label: 'fsrepo' });
      await p.getByPlaceholder('snapshot name').fill('manual-1');
      await p.locator('select[multiple]').selectOption({ label: 'products' });
    },
  },
  {
    name: 'snapshot-restore',
    route: 'snapshot',
    act: async (p) => {
      await selectRepository(p);
      await p.locator('i.fa-download').first().click();
    },
  },
  {
    name: 'snapshot-restore-filled',
    route: 'snapshot',
    act: async (p) => {
      await selectRepository(p);
      await p.locator('i.fa-download').first().click();
      await p.getByPlaceholder('index_(.+)').fill('logs-(.+)');
      await clickText(p, '.collapse label', 'include aliases');
    },
  },
  {
    name: 'snapshot-delete',
    route: 'snapshot',
    act: async (p) => {
      await selectRepository(p);
      await p.locator('i.fa-trash').first().click();
    },
  },
];

// 每个场景最后都整页重绘一次
export const scenarios: Scenario[] = raw.map((s) => ({
  ...s,
  act: async (p: Page) => {
    await s.act?.(p);
    await repaint(p);
  },
}));
