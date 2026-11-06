// 新旧前端逐像素比对。差异图和两边的截图、简化 DOM 写到 test-results/<场景>/ 下。
import { test, expect, type Page } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { scenarios } from './scenarios';

const BASE = Number(process.env.E2E_PORT_BASE || 19300);
const SIDES = { legacy: `http://localhost:${BASE + 1}`, vue: `http://localhost:${BASE + 2}` } as const;
const ONLY = process.env.E2E_ONLY as keyof typeof SIDES | undefined; // 录制时只跑 legacy

// 隐藏光标、关闭动画，避免截图时间点不同带来的差异
const STABLE_CSS = `
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
  .ace_cursor { visibility: hidden !important; }
`;

async function settle(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
}

// 简化 DOM：只保留可见元素的标签、id、class（去掉 ng-*）和文字，方便定位结构差异
async function domOutline(page: Page): Promise<string> {
  return page.evaluate(() => {
    const lines: string[] = [];
    const walk = (el: Element, depth: number) => {
      const style = getComputedStyle(el);
      if (style.display === 'none') {
        return;
      }
      const cls = [...el.classList].filter((c) => !c.startsWith('ng-')).join('.');
      const text = [...el.childNodes]
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent!.replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .join(' ');
      const tag = el.tagName.toLowerCase();
      if (!['script', 'style', 'link', 'meta'].includes(tag)) {
        lines.push(`${'  '.repeat(depth)}${tag}${el.id ? '#' + el.id : ''}${cls ? '.' + cls : ''}${text ? ' "' + text + '"' : ''}`);
      }
      [...el.children].forEach((c) => walk(c, depth + 1));
    };
    walk(document.body, 0);
    // Vue 多一层 #app：去掉这一行，并把它下面的内容少缩进一级，让两边对齐
    const isApp = (l: string) => /^\s*div#app$/.test(l);
    const hasApp = lines.some(isApp);
    return lines
      .filter((l) => !isApp(l))
      .map((l) => (hasApp && l.startsWith('    ') ? l.slice(2) : l))
      .join('\n');
  });
}

for (const s of scenarios) {
  test(s.name, async ({ browser }) => {
    const dir = `test-results/compare-${BASE}/${s.name}`;
    mkdirSync(dir, { recursive: true });
    const shots: Partial<Record<keyof typeof SIDES, Buffer>> = {};
    for (const side of Object.keys(SIDES) as (keyof typeof SIDES)[]) {
      if ((ONLY && side !== ONLY) || (s.vueOnly && side === 'legacy')) {
        continue;
      }
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.addInitScript((css) => {
        document.addEventListener('DOMContentLoaded', () => {
          const style = document.createElement('style');
          style.textContent = css;
          document.head.appendChild(style);
        });
      }, STABLE_CSS);
      const sep = s.route.includes('?') ? '&' : '?';
      const url = `${SIDES[side]}/#!/${s.route}${s.noHost ? '' : sep + 'host=fixture'}`;
      await page.goto(url);
      await settle(page);
      if (s.act) {
        await s.act(page);
        await settle(page);
      }
      shots[side] = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide' });
      if (s.vueOnly) {
        // 新页面没有旧版可比，至少保证加载时没有弹出错误
        await expect(page.locator('.alerts .alert-danger:visible')).toHaveCount(0);
      }
      writeFileSync(`${dir}/${side}.png`, shots[side]!);
      writeFileSync(`${dir}/${side}.dom.txt`, await domOutline(page));
      await context.close();
    }
    if (ONLY || s.vueOnly) {
      return;
    }
    const a = PNG.sync.read(shots.legacy!);
    const b = PNG.sync.read(shots.vue!);
    expect(`${b.width}x${b.height}`, 'page size').toBe(`${a.width}x${a.height}`);
    const diff = new PNG({ width: a.width, height: a.height });
    pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0 });
    writeFileSync(`${dir}/diff.png`, PNG.sync.write(diff));
    // 判定：任一颜色通道相差超过 1（满分 255）才算差异。差 1 是软件渲染阴影模糊时的噪声（Linux CI 上会出现），肉眼不可见
    let changed = 0;
    let noise = 0;
    for (let i = 0; i < a.data.length; i += 4) {
      const delta = Math.max(
        Math.abs(a.data[i] - b.data[i]),
        Math.abs(a.data[i + 1] - b.data[i + 1]),
        Math.abs(a.data[i + 2] - b.data[i + 2]),
        Math.abs(a.data[i + 3] - b.data[i + 3]),
      );
      if (delta > 1) {
        changed++;
      } else if (delta === 1) {
        noise++;
      }
    }
    if (noise) {
      test.info().annotations.push({ type: 'render noise', description: `${noise} pixels differ by 1/255` });
    }
    if (s.expectChanged) {
      test.info().annotations.push({ type: 'expected change', description: `${s.expectChanged} (${changed} pixels)` });
      return;
    }
    expect(changed, `${changed} pixels differ, see ${dir}/diff.png`).toBe(0);
  });
}
