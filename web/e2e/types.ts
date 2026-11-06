import type { Page } from '@playwright/test';

export interface Scenario {
  name: string;
  // hash 路由，不含 #!/；默认自动带上 host=fixture（noHost 时不带）
  route: string;
  noHost?: boolean;
  // 打开页面后执行的操作，新旧前端执行完全相同的步骤
  act?: (page: Page) => Promise<unknown>;
  // 有意改动的界面（如新增菜单项）：照样截图和生成差异图，但不判失败，写明原因
  expectChanged?: string;
  // 只有新前端才有的页面：只截新前端的图，用于人工检查
  vueOnly?: boolean;
}

export const clickText = (page: Page, selector: string, text: string) =>
  page.locator(selector, { hasText: text }).first().click();
