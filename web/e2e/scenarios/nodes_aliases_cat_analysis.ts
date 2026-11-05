// nodes、aliases、cat、analysis 四个页面的截图场景
import type { Page } from '@playwright/test';
import { clickText, type Scenario } from '../types';

// ---------- nodes ----------
const nodeColumns: [string, string][] = [
  ['name', 'name'],
  ['load', 'load'],
  ['cpu', 'process cpu %'],
  ['heap', 'heap usage %'],
  ['disk', 'disk usage %'],
  ['uptime', 'uptime'],
];

const sortNodes = (text: string, times: number) => async (p: Page) => {
  for (let i = 0; i < times; i++) {
    await clickText(p, 'ng-sort-by a', text);
  }
};

const uncheckRoles = (...roles: string[]) => async (p: Page) => {
  for (const role of roles) {
    await p.locator('label.checkbox-inline', { hasText: role }).locator('input').uncheck();
  }
};

const nodes: Scenario[] = [
  { name: 'nodes', route: 'nodes' },
  { name: 'nodes-filter-name', route: 'nodes', act: (p) => p.fill('input[placeholder="filter nodes by name"]', '42B6') },
  { name: 'nodes-filter-name-nomatch', route: 'nodes', act: (p) => p.fill('input[placeholder="filter nodes by name"]', 'nomatch') },
  { name: 'nodes-uncheck-master', route: 'nodes', act: uncheckRoles('master') },
  { name: 'nodes-uncheck-master-data', route: 'nodes', act: uncheckRoles('master', 'data') },
  { name: 'nodes-uncheck-all-roles', route: 'nodes', act: uncheckRoles('master', 'data', 'ingest', 'coordinating') },
  {
    name: 'nodes-uncheck-filter-name',
    route: 'nodes',
    act: async (p) => {
      await uncheckRoles('coordinating', 'ingest')(p);
      await p.fill('input[placeholder="filter nodes by name"]', '4693');
    },
  },
  // 第一次点某列是升序（name 默认就是升序，点一次变降序），再点一次反过来
  ...nodeColumns.flatMap(([key, text]): Scenario[] => [
    { name: `nodes-sort-${key}-1`, route: 'nodes', act: sortNodes(text, 1) },
    { name: `nodes-sort-${key}-2`, route: 'nodes', act: sortNodes(text, 2) },
  ]),
  { name: 'nodes-sort-load-then-name', route: 'nodes', act: async (p) => {
    await sortNodes('load', 2)(p);
    await sortNodes('name', 1)(p);
  } },
];

// ---------- aliases ----------
const addAlias = (alias: string, index: string) => async (p: Page) => {
  await p.fill('input[placeholder="alias"]', alias);
  await p.selectOption('select.form-control', { label: index });
  await p.click('button.btn-info');
};

const removeAlias = (alias: string) => (p: Page) =>
  p.locator('tr', { hasText: alias }).locator('i.fa-trash.normal-action').first().click();

// filter 编辑器在折叠面板里：ace 每 500ms 轮询一次容器尺寸，展开后要等到下一次轮询才重绘，
// 不等的话截图落在轮询前还是后是随机的。展开后多等两个周期，两边都画完再截图。
const expandFilterEditor = async (p: Page) => {
  await p.click('span[data-target="#collapseAliasFilter"]');
  await p.waitForTimeout(1100);
};

// 在 filter 编辑器里输入。worker-json.js 与 ace 版本不匹配，worker 收到增量就报错，
// 逐字输入时 gutter 里是否出现错误标记取决于消息批次的时机（两边都会随机出现）；一次性插入整段文字结果才稳定
const typeFilter = async (p: Page, text: string) => {
  await p.click('#alias-filter-editor');
  await p.keyboard.insertText(text);
  await p.waitForTimeout(1500);
};

const aliases: Scenario[] = [
  { name: 'aliases', route: 'aliases' },
  { name: 'aliases-filter-alias', route: 'aliases', act: (p) => p.fill('input[placeholder="filter by alias"]', 'sec') },
  { name: 'aliases-filter-index', route: 'aliases', act: (p) => p.fill('input[placeholder="filter by index"]', 'prod') },
  {
    name: 'aliases-filter-both-nomatch',
    route: 'aliases',
    act: async (p) => {
      await p.fill('input[placeholder="filter by alias"]', 'logs');
      await p.fill('input[placeholder="filter by index"]', 'products');
    },
  },
  { name: 'aliases-details-filter', route: 'aliases', act: (p) => clickText(p, 'span.normal-action', 'logs') },
  { name: 'aliases-details-routing', route: 'aliases', act: (p) => clickText(p, 'span.normal-action', 'shop') },
  { name: 'aliases-select-index', route: 'aliases', act: (p) => p.selectOption('select.form-control', { label: 'products' }) },
  { name: 'aliases-add', route: 'aliases', act: addAlias('my-alias', 'products') },
  {
    name: 'aliases-add-two',
    route: 'aliases',
    act: async (p) => {
      await addAlias('my-alias', 'products')(p);
      await addAlias('Other', 'logs-app')(p);
    },
  },
  { name: 'aliases-add-invalid', route: 'aliases', act: (p) => p.click('button.btn-info') },
  {
    name: 'aliases-add-no-index',
    route: 'aliases',
    act: async (p) => {
      await p.fill('input[placeholder="alias"]', 'my-alias');
      await p.click('button.btn-info');
    },
  },
  { name: 'aliases-remove', route: 'aliases', act: removeAlias('logs') },
  {
    name: 'aliases-remove-two',
    route: 'aliases',
    act: async (p) => {
      await removeAlias('logs')(p);
      await removeAlias('shop')(p);
    },
  },
  {
    name: 'aliases-remove-revert',
    route: 'aliases',
    act: async (p) => {
      await removeAlias('logs')(p);
      await removeAlias('shop')(p);
      await p.locator('i.fa-undo').first().click();
    },
  },
  {
    name: 'aliases-add-and-remove',
    route: 'aliases',
    act: async (p) => {
      await addAlias('my-alias', 'products')(p);
      await removeAlias('shop')(p);
    },
  },
  { name: 'aliases-filter-editor', route: 'aliases', act: expandFilterEditor },
  {
    name: 'aliases-filter-editor-collapse',
    route: 'aliases',
    act: async (p) => {
      await expandFilterEditor(p);
      await p.waitForTimeout(500);
      await expandFilterEditor(p);
    },
  },
  {
    name: 'aliases-filter-editor-typed',
    route: 'aliases',
    act: async (p) => {
      await expandFilterEditor(p);
      await p.waitForTimeout(500);
      await p.fill('input[placeholder="alias"]', 'filtered');
      await p.selectOption('select.form-control', { label: 'logs-app' });
      await p.locator('#collapseAliasFilter input.form-control').nth(0).fill('1');
      await p.locator('#collapseAliasFilter input.form-control').nth(1).fill('2');
      await typeFilter(p, '{"term": {"user.name": "bob"}}');
    },
  },
  {
    name: 'aliases-filter-editor-add',
    route: 'aliases',
    act: async (p) => {
      await expandFilterEditor(p);
      await p.waitForTimeout(500);
      await typeFilter(p, '{"term": {"user.name": "bob"}}');
      await addAlias('filtered', 'logs-app')(p);
    },
  },
  {
    name: 'aliases-filter-editor-malformed',
    route: 'aliases',
    act: async (p) => {
      await expandFilterEditor(p);
      await p.waitForTimeout(500);
      await typeFilter(p, '{"term');
      await addAlias('filtered', 'logs-app')(p);
    },
  },
];

// ---------- cat ----------
const catApis = [
  'aliases', 'allocation', 'count', 'fielddata', 'health', 'indices', 'master', 'nodeattrs', 'nodes',
  'pending tasks', 'plugins', 'recovery', 'repositories', 'thread pool', 'shards', 'segments',
];

const execCat = (api: string) => async (p: Page) => {
  await p.selectOption('select.form-control', { label: api });
  await clickText(p, 'button', 'execute');
  await p.waitForLoadState('networkidle');
};

const sortCat = (col: string) => (p: Page) =>
  p.locator('th', { hasText: new RegExp(`^\\s*${col.replace(/\./g, '\\.')}\\s*$`) }).first().click();

const cat: Scenario[] = [
  { name: 'cat', route: 'cat' },
  { name: 'cat-select-only', route: 'cat', act: (p) => p.selectOption('select.form-control', { label: 'nodes' }) },
  ...catApis.map((api): Scenario => ({ name: `cat-${api.replace(/ /g, '-')}`, route: 'cat', act: execCat(api) })),
  {
    name: 'cat-indices-twice',
    route: 'cat',
    act: async (p) => {
      await execCat('indices')(p);
      await clickText(p, 'button', 'execute');
    },
  },
  {
    name: 'cat-indices-sort-index',
    route: 'cat',
    act: async (p) => {
      await execCat('indices')(p);
      await sortCat('index')(p);
    },
  },
  {
    name: 'cat-indices-sort-index-twice',
    route: 'cat',
    act: async (p) => {
      await execCat('indices')(p);
      await sortCat('index')(p);
      await sortCat('index')(p);
    },
  },
  {
    name: 'cat-indices-sort-first-col',
    route: 'cat',
    act: async (p) => {
      await execCat('indices')(p);
      await sortCat('health')(p);
    },
  },
  {
    name: 'cat-indices-sort-dotted',
    route: 'cat',
    act: async (p) => {
      await execCat('indices')(p);
      await sortCat('docs.count')(p);
    },
  },
  {
    name: 'cat-thread-pool-sort-active',
    route: 'cat',
    act: async (p) => {
      await execCat('thread pool')(p);
      await sortCat('active')(p);
    },
  },
  {
    name: 'cat-thread-pool-sort-name-twice',
    route: 'cat',
    act: async (p) => {
      await execCat('thread pool')(p);
      await sortCat('name')(p);
      await sortCat('name')(p);
    },
  },
  {
    name: 'cat-shards-sort-state',
    route: 'cat',
    act: async (p) => {
      await execCat('shards')(p);
      await sortCat('state')(p);
    },
  },
  {
    name: 'cat-switch-api',
    route: 'cat',
    act: async (p) => {
      await execCat('indices')(p);
      await sortCat('index')(p);
      await execCat('aliases')(p);
    },
  },
];

// ---------- analysis ----------
const selectAt = (n: number, label: string) => (p: Page) => p.locator('select.form-control').nth(n).selectOption({ label });

const analyzeField = (index: string, field: string, text: string) => async (p: Page) => {
  await selectAt(0, index)(p);
  await selectAt(1, field)(p);
  await p.locator('input[placeholder="text to analyze"]').nth(0).fill(text);
  await p.locator('button.btn-success').nth(0).click();
};

const analyzeAnalyzer = (index: string, analyzer: string, text: string) => async (p: Page) => {
  await selectAt(2, index)(p);
  await selectAt(3, analyzer)(p);
  await p.locator('input[placeholder="text to analyze"]').nth(1).fill(text);
  await p.locator('button.btn-success').nth(1).click();
};

const analysis: Scenario[] = [
  { name: 'analysis', route: 'analysis' },
  { name: 'analysis-field-index', route: 'analysis', act: selectAt(0, 'logs-app') },
  {
    name: 'analysis-field-index-field',
    route: 'analysis',
    act: async (p) => {
      await selectAt(0, 'logs-app')(p);
      await selectAt(1, 'user.name')(p);
    },
  },
  { name: 'analysis-analyzer-index', route: 'analysis', act: selectAt(2, 'logs-app') },
  { name: 'analysis-analyzer-index-empty', route: 'analysis', act: selectAt(2, 'products') },
  { name: 'analysis-by-field', route: 'analysis', act: analyzeField('logs-app', 'title', 'The Quick-Brown fox, jumps!') },
  { name: 'analysis-by-field-products', route: 'analysis', act: analyzeField('products', 'name', 'Red Apple Juice 1L') },
  { name: 'analysis-by-analyzer', route: 'analysis', act: analyzeAnalyzer('logs-app', 'my_analyzer', 'The Quick-Brown fox, jumps!') },
  {
    name: 'analysis-both',
    route: 'analysis',
    act: async (p) => {
      await analyzeField('logs-app', 'user.name', 'Ann Smith')(p);
      await analyzeAnalyzer('logs-app', 'my_analyzer', 'Hello World')(p);
    },
  },
  {
    name: 'analysis-no-text',
    route: 'analysis',
    act: async (p) => {
      await selectAt(0, 'logs-app')(p);
      await selectAt(1, 'title')(p);
      await p.locator('button.btn-success').nth(0).click();
    },
  },
  {
    name: 'analysis-switch-index',
    route: 'analysis',
    act: async (p) => {
      await selectAt(0, 'logs-app')(p);
      await selectAt(1, 'title')(p);
      await selectAt(0, 'products')(p);
      await p.waitForLoadState('networkidle');
    },
  },
];

export const scenarios: Scenario[] = [...nodes, ...aliases, ...cat, ...analysis];
