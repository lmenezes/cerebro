// rest、templates、create index 三个页面的截图比对场景
import type { Page } from '@playwright/test';
import { clickText, type Scenario } from '../types';

const PATH = 'input[placeholder="path (eg: indexName/_search)"]';

// 在路径输入框里逐字输入，等 typeahead（typeahead-wait-ms=20）弹出
const typePath = async (p: Page, text: string) => {
  await p.locator(PATH).click();
  await p.keyboard.type(text, { delay: 30 });
  await p.waitForTimeout(200);
};

// 填好路径后点 send
const send = async (p: Page, path: string) => {
  await p.locator(PATH).fill(path);
  await p.waitForTimeout(200);
  await clickText(p, 'button', 'send');
};

// 选中编辑器全部内容后整体输入一段文字
const setEditor = async (p: Page, id: string, text: string) => {
  await p.locator(`#${id} .ace_content`).click();
  await p.keyboard.press('ControlOrMeta+a');
  await p.keyboard.insertText(text);
};

const templateRow = (p: Page, name: string) => p.locator('tr', { hasText: name }).first();

export const scenarios: Scenario[] = [
  // ---------- rest ----------
  { name: 'rest', route: 'rest' },
  {
    name: 'rest-typeahead',
    route: 'rest',
    act: async (p) => {
      await typePath(p, 'l');
      await p.keyboard.press('ArrowDown');
    },
  },
  {
    name: 'rest-typeahead-path',
    route: 'rest',
    act: async (p) => {
      await typePath(p, 'logs-app/_');
      await p.keyboard.press('ArrowUp');
    },
  },
  {
    name: 'rest-typeahead-enter',
    route: 'rest',
    act: async (p) => {
      await typePath(p, 'pro');
      await p.keyboard.press('Enter');
      await typePath(p, '/');
      await p.keyboard.press('ArrowDown');
      await p.keyboard.press('ArrowDown');
      await p.keyboard.press('Enter');
    },
  },
  {
    name: 'rest-typeahead-escape',
    route: 'rest',
    act: async (p) => {
      await typePath(p, '_');
      await p.keyboard.press('Escape');
    },
  },
  {
    name: 'rest-typeahead-hover',
    route: 'rest',
    act: async (p) => {
      await typePath(p, '.sec');
      await p.locator('ul.typeahead li').nth(2).hover();
    },
  },
  {
    name: 'rest-typeahead-click',
    route: 'rest',
    act: async (p) => {
      await typePath(p, 'logs-app/');
      await p.locator('ul.typeahead li').nth(1).click();
    },
  },
  { name: 'rest-method', route: 'rest', act: (p) => p.locator('.content select').selectOption('DELETE').then() },
  { name: 'rest-get', route: 'rest', act: (p) => send(p, 'logs-app/_search') },
  { name: 'rest-get-array', route: 'rest', act: (p) => send(p, '_cat/indices?format=json') },
  { name: 'rest-error', route: 'rest', act: (p) => send(p, 'missing-index/_search') },
  { name: 'rest-history', route: 'rest', act: (p) => clickText(p, 'a', 'previous requests') },
  {
    name: 'rest-format',
    route: 'rest',
    act: async (p) => {
      await setEditor(p, 'rest-client-editor', '{"query":{"match":{"user.name":"ann"}},"size":1,"sort":["_doc"]}');
      await clickText(p, 'button', 'format');
    },
  },

  // ---------- templates ----------
  { name: 'templates', route: 'templates' },
  { name: 'templates-filter-name', route: 'templates', act: (p) => p.fill('input[placeholder="template name"]', 'monitoring-k') },
  { name: 'templates-filter-name-none', route: 'templates', act: (p) => p.fill('input[placeholder="template name"]', 'nothing') },
  // ES 9 的模板没有 template 字段，旧前端按模式筛选会抛异常、列表保持不变
  { name: 'templates-filter-pattern', route: 'templates', act: (p) => p.fill('input[placeholder="template pattern"]', 'legacy') },
  { name: 'templates-edit', route: 'templates', act: (p) => templateRow(p, 'legacy-tmpl').locator('i.fa-pencil').click() },
  { name: 'templates-existing-name', route: 'templates', act: (p) => p.fill('input[placeholder="name"]', '.monitoring-es') },
  {
    name: 'templates-delete',
    route: 'templates',
    act: (p) => templateRow(p, '.monitoring-beats').locator('i.fa-trash.normal-action').click(),
  },

  // ---------- create index ----------
  { name: 'create', route: 'create' },
  { name: 'create-load-settings', route: 'create', act: (p) => p.locator('.content select').selectOption({ label: 'logs-app' }).then() },
  {
    name: 'create-filled',
    route: 'create',
    act: async (p) => {
      await p.fill('input[placeholder="index name"]', 'new-index');
      await p.fill('input[placeholder="# of shards"]', '3');
      await p.fill('input[placeholder="# of replicas"]', '1');
    },
  },
  { name: 'create-no-name', route: 'create', act: (p) => clickText(p, 'button', 'Create') },
];
