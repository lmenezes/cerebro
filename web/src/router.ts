// 路由与旧前端一致，URL 形如 #!/overview?host=xxx，旧书签可以直接用。
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const page = (name: string) => () => import(`./pages/${name}.vue`);

const routes: RouteRecordRaw[] = [
  { path: '/overview', component: page('Overview') },
  { path: '/nodes', component: page('Nodes') },
  { path: '/connect', component: page('Connect') },
  { path: '/rest', component: page('Rest') },
  { path: '/aliases', component: page('Aliases') },
  { path: '/create', component: page('CreateIndex') },
  { path: '/analysis', component: page('Analysis') },
  { path: '/templates', component: page('Templates') },
  { path: '/cluster_settings', component: page('ClusterSettings') },
  { path: '/index_settings', component: page('IndexSettings') },
  { path: '/snapshot', component: page('Snapshot') },
  { path: '/repository', component: page('Repositories') },
  { path: '/cat', component: page('Cat') },
  // 第三阶段新增
  { path: '/index_templates', component: () => import('./pages/features/IndexTemplates.vue') },
  { path: '/component_templates', component: () => import('./pages/features/ComponentTemplates.vue') },
  { path: '/data_streams', component: () => import('./pages/features/DataStreams.vue') },
  { path: '/ilm', component: () => import('./pages/features/IlmPolicies.vue') },
  { path: '/slm', component: () => import('./pages/features/SlmPolicies.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/connect' },
];

export const router = createRouter({
  history: createWebHashHistory(window.location.pathname + window.location.search + '#!'),
  routes,
});

// 旧链接写成 #!overview?host=x（没有斜杠），补上斜杠
router.beforeEach((to) => {
  if (!to.path.startsWith('/')) {
    return { path: '/' + to.path, query: to.query };
  }
});
