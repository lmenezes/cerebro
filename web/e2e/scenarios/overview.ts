// overview 页面的截图比对场景。fixture 数据：1 个节点；3 个普通索引（logs-app 有 3 个未分配副本、old-index 已关闭、products），
// 4 个 . 开头的特殊索引；每页 5 列（1280 / 280）。
import type { Page } from '@playwright/test';
import { clickText, type Scenario } from '../types';

const check = (p: Page, text: string) => clickText(p, '.checkbox label', text);
const openMenu = (p: Page, id: string) => p.locator(`[id="${id}"]`).click();
const menuItem = (p: Page, text: string) => clickText(p, '.dropdown.open li', text);
const firstShard = (p: Page) => p.locator('span.shard.shard-started').first().click();
const fill = (p: Page, placeholder: string, text: string) => p.locator(`input[placeholder="${placeholder}"]`).fill(text);
// 在浏览器里改写 /overview 的响应再重新加载，两边拿到同样的数据：用来覆盖 fixture 里没有的状态
// （多节点、副本、节点属性、迁移中/初始化中的分片、禁用分片分配、老版本 ES 的关闭索引）
const withOverview = async (p: Page, mutate: (d: any) => void) => {
  await p.route(/\/overview$/, async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    mutate(json.body);
    await route.fulfill({ response, json });
  });
  await p.reload();
  await p.waitForLoadState('networkidle');
};
const MASTER = 't8Dl5VKmTWubLPuRxdfMTg';
const index = (d: any, name: string) => d.indices.find((i: any) => i.name === name);
// 第二个数据节点：logs-app 的 3 个副本分到这里，两个节点都带自定义属性
const twoNodes = (d: any) => {
  const n1 = d.nodes[0];
  const n2 = JSON.parse(JSON.stringify(n1));
  Object.assign(n2, { id: 'node2', name: 'es-node-2', host: '172.17.0.3', current_master: false, ingest: false });
  n2.attributes = { rack: 'r2', zone: 'zone-b' };
  n1.attributes = { rack: 'r1', zone: 'zone-a', box_type: 'hot' };
  d.nodes.push(n2);
  d.number_of_nodes = 2;
  const logs = index(d, 'logs-app');
  logs.shards.node2 = logs.shards.unassigned.map((s: any) => ({ ...s, state: 'STARTED', node: 'node2' }));
  delete logs.shards.unassigned;
  logs.unhealthy = false;
  d.unassigned_shards = 0;
  d.active_shards += 3;
};

const filterIndices = (p: Page, text: string) => fill(p, 'filter indices by name or aliases', text);
const filterNodes = (p: Page, text: string) => fill(p, 'filter nodes by name', text);

export const scenarios: Scenario[] = [
  { name: 'overview', route: 'overview' },

  // 筛选组合
  { name: 'overview-closed', route: 'overview', act: (p) => check(p, 'closed') },
  { name: 'overview-special', route: 'overview', act: (p) => check(p, '.special') },
  {
    name: 'overview-closed-special',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await check(p, '.special');
    },
  },
  {
    name: 'overview-affected',
    route: 'overview',
    act: (p) => clickText(p, 'span.normal-action', 'show only affected indices'),
  },
  {
    name: 'overview-affected-closed-special',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await check(p, '.special');
      await clickText(p, 'span.normal-action', 'show only affected indices');
    },
  },
  {
    name: 'overview-affected-show-all',
    route: 'overview',
    act: async (p) => {
      await clickText(p, 'span.normal-action', 'show only affected indices');
      await clickText(p, 'span.normal-action', 'show all indices');
    },
  },

  // 按名字筛选
  {
    name: 'overview-filter-index-name',
    route: 'overview',
    act: (p) => filterIndices(p, 'prod'),
  },
  {
    name: 'overview-filter-index-alias',
    route: 'overview',
    act: (p) => filterIndices(p, 'shop'),
  },
  {
    name: 'overview-filter-index-regex',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await check(p, '.special');
      await filterIndices(p, '^\\.(ds|security)-');
    },
  },
  {
    name: 'overview-filter-index-invalid-regex',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await filterIndices(p, 'old[');
    },
  },
  {
    name: 'overview-filter-index-none',
    route: 'overview',
    act: (p) => filterIndices(p, 'nothing-matches'),
  },
  {
    name: 'overview-filter-nodes-match',
    route: 'overview',
    act: (p) => filterNodes(p, '42B6'),
  },
  {
    name: 'overview-filter-nodes-none',
    route: 'overview',
    act: (p) => filterNodes(p, 'xyz'),
  },

  // 排序、展开视图
  {
    name: 'overview-sort-desc',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await p.locator('i[title="sort ascending"]').click();
    },
  },
  {
    name: 'overview-sort-desc-asc',
    route: 'overview',
    act: async (p) => {
      await p.locator('i[title="sort ascending"]').click();
      await p.locator('i[title="sort descending"]').click();
    },
  },
  { name: 'overview-expanded', route: 'overview', act: (p) => p.locator('i[title="expand view"]').click() },
  {
    name: 'overview-expanded-condensed',
    route: 'overview',
    act: async (p) => {
      await p.locator('i[title="expand view"]').click();
      await p.locator('i[title="condense view"]').click();
    },
  },

  // 分页：7 个索引、每页 5 个
  {
    name: 'overview-page2',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await check(p, '.special');
      await p.locator('ng-pagination li.normal-action', { hasText: '→' }).click();
    },
  },
  {
    name: 'overview-page2-back',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await check(p, '.special');
      await p.locator('ng-pagination li.normal-action', { hasText: '→' }).click();
      await p.locator('ng-pagination li.normal-action', { hasText: '←' }).click();
    },
  },
  {
    name: 'overview-page2-keyboard',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await check(p, '.special');
      await p.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
      await p.keyboard.press('ArrowRight');
    },
  },
  {
    // 在第 2 页时缩小筛选范围，页码自动退回
    name: 'overview-page2-then-filter',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await check(p, '.special');
      await p.locator('ng-pagination li.normal-action', { hasText: '→' }).click();
      await check(p, '.special');
    },
  },

  // 下拉菜单
  { name: 'overview-allocation-menu', route: 'overview', act: (p) => openMenu(p, 'dropallocation') },
  { name: 'overview-cluster-menu', route: 'overview', act: (p) => openMenu(p, 'dropcluster') },
  { name: 'overview-index-menu', route: 'overview', act: (p) => openMenu(p, 'drop_logs-app') },
  {
    name: 'overview-closed-index-menu',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await openMenu(p, 'drop_old-index');
    },
  },
  { name: 'overview-shard-menu', route: 'overview', act: (p) => firstShard(p) },
  {
    name: 'overview-shard-selected-menu',
    route: 'overview',
    act: async (p) => {
      await firstShard(p);
      await menuItem(p, 'select for relocation');
      await firstShard(p);
    },
  },

  // 弹窗
  {
    name: 'overview-shard-stats',
    route: 'overview',
    act: async (p) => {
      await firstShard(p);
      await menuItem(p, 'display shard stats');
    },
  },
  {
    name: 'overview-node-stats',
    route: 'overview',
    act: (p) => p.locator('.node-info .title span.normal-action').first().click(),
  },
  {
    name: 'overview-index-settings',
    route: 'overview',
    act: async (p) => {
      await openMenu(p, 'drop_products');
      await menuItem(p, 'show settings');
    },
  },
  {
    name: 'overview-index-mappings',
    route: 'overview',
    act: async (p) => {
      await openMenu(p, 'drop_products');
      await menuItem(p, 'show mappings');
    },
  },
  {
    name: 'overview-index-stats',
    route: 'overview',
    act: async (p) => {
      await openMenu(p, 'drop_products');
      await menuItem(p, 'show stats');
    },
  },

  // 改写数据覆盖的状态
  {
    name: 'overview-allocation-disabled',
    route: 'overview',
    act: (p) => withOverview(p, (d) => (d.shard_allocation = false)),
  },
  {
    name: 'overview-shard-states',
    route: 'overview',
    act: (p) =>
      withOverview(p, (d) => {
        const logs = index(d, 'logs-app');
        logs.shards[MASTER][1].state = 'RELOCATING';
        logs.shards[MASTER][1].relocating_node = 'other';
        logs.shards[MASTER][2].state = 'INITIALIZING';
        d.relocating_shards = 1;
        d.initializing_shards = 1;
      }),
  },
  {
    name: 'overview-relocating-only',
    route: 'overview',
    act: (p) =>
      withOverview(p, (d) => {
        const logs = index(d, 'logs-app');
        delete logs.shards.unassigned;
        logs.shards[MASTER][0].state = 'RELOCATING';
        d.unassigned_shards = 0;
        d.relocating_shards = 1;
      }),
  },
  {
    // 没有未分配/迁移/初始化的分片时 healthy 自动恢复为 true
    name: 'overview-healthy-reset',
    route: 'overview',
    act: async (p) => {
      await clickText(p, 'span.normal-action', 'show only affected indices');
      await withOverview(p, (d) => {
        delete index(d, 'logs-app').shards.unassigned;
        d.unassigned_shards = 0;
      });
    },
  },
  { name: 'overview-two-nodes', route: 'overview', act: (p) => withOverview(p, twoNodes) },
  {
    name: 'overview-two-nodes-expanded',
    route: 'overview',
    act: async (p) => {
      await withOverview(p, twoNodes);
      await p.locator('i[title="expand view"]').click();
    },
  },
  {
    name: 'overview-two-nodes-filter',
    route: 'overview',
    act: async (p) => {
      await withOverview(p, twoNodes);
      await filterNodes(p, 'node-2');
    },
  },
  {
    // 选中 products 的分片后，另一个节点的格子里出现可放置的位置
    name: 'overview-two-nodes-relocate',
    route: 'overview',
    act: async (p) => {
      await withOverview(p, twoNodes);
      await openMenu(p, `0_${MASTER}_products`);
      await menuItem(p, 'select for relocation');
    },
  },
  {
    name: 'overview-two-nodes-replica-menu',
    route: 'overview',
    act: async (p) => {
      await withOverview(p, twoNodes);
      await openMenu(p, '1_node2_logs-app');
    },
  },
  {
    name: 'overview-two-nodes-closed',
    route: 'overview',
    act: async (p) => {
      await withOverview(p, (d) => {
        twoNodes(d);
        index(d, 'logs-app').closed = true;
      });
      await check(p, 'closed');
    },
  },
  {
    // 老版本 ES 关闭的索引不在 routing_table 里，只有 name/closed/special
    name: 'overview-closed-without-shards',
    route: 'overview',
    act: async (p) => {
      await withOverview(p, (d) => {
        d.indices.push({ name: 'ancient', closed: true, special: false });
        d.closed_indices += 1;
      });
      await check(p, 'closed');
    },
  },
  {
    name: 'overview-many-aliases',
    route: 'overview',
    act: (p) => withOverview(p, (d) => (index(d, 'products').aliases = ['shop', 'store', 'catalog'])),
  },

  // 确认框（只打开不确认）
  {
    name: 'overview-close-index-confirm',
    route: 'overview',
    act: async (p) => {
      await openMenu(p, 'drop_logs-app');
      await menuItem(p, 'close index');
    },
  },
  {
    name: 'overview-open-index-confirm',
    route: 'overview',
    act: async (p) => {
      await check(p, 'closed');
      await openMenu(p, 'drop_old-index');
      await menuItem(p, 'open index');
    },
  },
  {
    name: 'overview-delete-index-confirm',
    route: 'overview',
    act: async (p) => {
      await openMenu(p, 'drop_products');
      await menuItem(p, 'delete index');
    },
  },
  {
    name: 'overview-delete-selected-confirm',
    route: 'overview',
    act: async (p) => {
      await check(p, '.special');
      await openMenu(p, 'dropcluster');
      await menuItem(p, 'delete selected');
    },
  },
  {
    // 旧模板这一项没有 data-toggle="modal"，点了不弹框
    name: 'overview-force-merge-selected',
    route: 'overview',
    act: async (p) => {
      await openMenu(p, 'dropcluster');
      await menuItem(p, 'force merge selected');
    },
    // 原版这一项少了 data-toggle（还拼错成 wtarget），点了不弹确认框；已修复，基准 e2e/legacy 同步了这处修正
  },
];
