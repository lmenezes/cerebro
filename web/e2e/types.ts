import type { Page } from '@playwright/test';

export interface Scenario {
  name: string;
  // hash 路由，不含 #!/；默认自动带上 host=fixture（noHost 时不带）
  route: string;
  noHost?: boolean;
  // 打开页面后执行的操作，新旧前端执行完全相同的步骤
  act?: (page: Page) => Promise<void>;
}

export const clickText = (page: Page, selector: string, text: string) =>
  page.locator(selector, { hasText: text }).first().click();
