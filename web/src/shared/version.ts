// 版本号由 Go 后端写进 index.html 的 meta 标签
const meta = document.querySelector<HTMLMetaElement>('meta[name="cerebro-version"]');
const raw = meta?.content || '';
export const appVersion = raw && raw !== '__CEREBRO_VERSION__' ? 'v' + raw : 'vdev';
