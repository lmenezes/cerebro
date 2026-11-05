import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // 相对路径，配合 basePath 子路径部署
  base: './',
  plugins: [
    vue({
      template: {
        // img/... 等路径是运行时的静态文件，保持原样
        transformAssetUrls: { tags: {} },
        // 保留模板里的空白：行内元素之间的空格会影响排版，要和旧前端逐像素一致
        compilerOptions: {
          whitespace: 'preserve',
          // 旧前端的自定义标签（<ng-pagination> 等）原样输出
          isCustomElement: (tag) => tag.startsWith('ng-'),
        },
      },
    }),
  ],
  build: {
    outDir: process.env.VITE_OUT_DIR || 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  server: {
    // 开发时把接口转给本机的 Go 后端
    proxy: Object.fromEntries(
      ['/aliases', '/rest', '/overview', '/nodes', '/navbar', '/analysis', '/cluster_changes', '/commons',
        '/create_index', '/templates', '/cluster_settings', '/index_settings', '/connect', '/repositories',
        '/snapshots', '/cat', '/auth', '/login', '/healthz', '/cerebro_info', '/index_templates',
        '/component_templates', '/data_streams', '/ilm', '/slm'].map((p) => [p, 'http://localhost:9000']),
    ),
  },
});
