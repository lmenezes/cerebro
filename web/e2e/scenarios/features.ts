// 第三阶段新页面：旧前端没有，只截新前端的图，并检查没有报错提示。
import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  { name: 'features-index-templates', route: 'index_templates', vueOnly: true },
  { name: 'features-component-templates', route: 'component_templates', vueOnly: true },
  { name: 'features-data-streams', route: 'data_streams', vueOnly: true },
  { name: 'features-ilm', route: 'ilm', vueOnly: true },
  { name: 'features-slm', route: 'slm', vueOnly: true },
  // 点未分配分片，弹窗显示 allocation explain
  {
    name: 'features-unassigned-explain',
    route: 'overview',
    vueOnly: true,
    act: async (p) => {
      await p.locator('span.shard-unassigned').first().click();
      await p.locator('#confirm_dialog .modal-body', { hasText: 'can_allocate' }).waitFor();
    },
  },
];
