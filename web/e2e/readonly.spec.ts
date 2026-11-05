// 只读连接下，新前端要隐藏修改类按钮（服务端同样会拦截，这里只验证界面）。
import { test, expect, type Page } from '@playwright/test';

const BASE = Number(process.env.E2E_PORT_BASE || 19300);
const VUE = `http://localhost:${BASE + 2}`;

// 每个页面：路由，以及只读时必须看不见的元素（选择器 + 文字）
// 设置页的保存按钮只在有待保存的修改时出现，先改一项
const editSetting = (name: string, value: string) => async (page: Page) => {
  await page.locator('div.form-group', { has: page.locator(`text="${name}"`) }).locator('input').first().fill(value);
};

const pages: { route: string; act?: (page: Page) => Promise<void>; hidden: { selector: string; text?: string }[] }[] = [
  {
    route: 'cluster_settings',
    act: editSetting('action.auto_create_index', 'false'),
    hidden: [{ selector: 'button.btn-success', text: 'save' }],
  },
  {
    route: 'index_settings?index=logs-app',
    act: editSetting('index.refresh_interval', '5s'),
    hidden: [{ selector: 'button.btn-success', text: 'save' }],
  },
  { route: 'repository', hidden: [{ selector: 'button.btn-success', text: 'create' }, { selector: 'td .fa-trash' }] },
  { route: 'snapshot', hidden: [{ selector: 'button.btn-success', text: 'create' }] },
  { route: 'templates', hidden: [{ selector: 'button.btn-success', text: 'create' }, { selector: 'td .fa-trash.normal-action' }] },
  { route: 'create', hidden: [{ selector: 'button.btn-primary', text: 'Create' }] },
  { route: 'aliases', hidden: [{ selector: 'button.btn-info' }, { selector: 'td .fa-trash.normal-action' }] },
  {
    route: 'overview',
    act: async (page) => {
      await page.locator('span.title', { hasText: 'logs-app' }).first().click();
    },
    hidden: [{ selector: '.dropdown-menu li', text: 'close index' }, { selector: '.dropdown-menu li', text: 'delete index' }],
  },
  { route: 'index_templates', hidden: [{ selector: 'button.btn-success', text: 'create' }, { selector: 'td .fa-trash' }] },
  { route: 'component_templates', hidden: [{ selector: 'button.btn-success', text: 'create' }, { selector: 'td .fa-trash' }] },
  { route: 'ilm', hidden: [{ selector: 'button.btn-success', text: 'create' }, { selector: 'td .fa-trash' }] },
  { route: 'slm', hidden: [{ selector: 'button.btn-success', text: 'create' }, { selector: 'td .fa-trash' }, { selector: 'td .fa-play' }] },
  { route: 'data_streams', hidden: [{ selector: 'td .fa-trash' }, { selector: 'td .fa-refresh' }] },
];

async function open(page: Page, route: string, readOnly: boolean, act?: (page: Page) => Promise<void>) {
  await page.route('**/cerebro_info', (r) =>
    r.fulfill({ contentType: 'application/json', body: JSON.stringify({ status: 200, body: { read_only: readOnly, username: null } }) }),
  );
  const sep = route.includes('?') ? '&' : '?';
  await page.goto(`${VUE}/#!/${route}${sep}host=fixture`);
  await page.waitForLoadState('networkidle');
  if (act) {
    await act(page);
  }
}

for (const p of pages) {
  test(`readonly hides modify controls: ${p.route}`, async ({ page }) => {
    await open(page, p.route, true, p.act);
    for (const h of p.hidden) {
      const loc = page.locator(h.selector, h.text ? { hasText: h.text } : {});
      await expect(loc.filter({ visible: true })).toHaveCount(0);
    }
  });

  test(`writable shows modify controls: ${p.route}`, async ({ page }) => {
    await open(page, p.route, false, p.act);
    let visible = 0;
    for (const h of p.hidden) {
      const loc = page.locator(h.selector, h.text ? { hasText: h.text } : {});
      visible += await loc.filter({ visible: true }).count();
    }
    expect(visible, 'at least one modify control should be visible when writable').toBeGreaterThan(0);
  });
}
