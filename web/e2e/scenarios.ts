// 截图比对的场景：每个场景在新旧前端上执行完全相同的操作，选择器只依赖两边一致的 DOM 和文字。
// 各页面的场景放在 scenarios/ 下各自的文件里。
import { clickText, type Scenario } from './types';
import { scenarios as overview } from './scenarios/overview';
import { scenarios as nodes_aliases_cat_analysis } from './scenarios/nodes_aliases_cat_analysis';
import { scenarios as rest_templates_create } from './scenarios/rest_templates_create';
import { scenarios as settings_repos_snapshots } from './scenarios/settings_repos_snapshots';
import { scenarios as features } from './scenarios/features';

export const scenarios: Scenario[] = [
  { name: 'connect', route: 'connect', noHost: true },
  {
    name: 'connect-unauthorized',
    route: 'connect?host=fixture&unauthorized=true',
    noHost: true,
  },
  {
    name: 'navbar-more',
    route: 'nodes',
    act: (p) => clickText(p, 'a.dropdown-toggle', 'more'),
  },
  { name: 'navbar-refresh', route: 'nodes', act: (p) => p.locator('a.dropdown-toggle').nth(1).click() },
  ...overview,
  ...nodes_aliases_cat_analysis,
  ...rest_templates_create,
  ...settings_repos_snapshots,
  ...features,
];
