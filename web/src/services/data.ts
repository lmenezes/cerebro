// 对应旧前端 DataService：所有接口都是 POST JSON，body 里带上 host 和页面上填的凭据。
import { reactive } from 'vue';
import { router } from '../router';
import { RefreshService } from './refresh';
import { AlertService } from './alerts';

type Callback = (body: any) => void;

const state = reactive({
  host: undefined as string | undefined,
  username: undefined as string | undefined,
  password: undefined as string | undefined,
});

let onGoingRequests: Record<string, number | undefined> = {};

// 启动时 URL 里已有 host（刷新页面或书签）
function initialHost(): string | undefined {
  const hash = window.location.hash;
  const q = hash.indexOf('?');
  return q >= 0 ? new URLSearchParams(hash.slice(q + 1)).get('host') || undefined : undefined;
}

function request(path: string, data: Record<string, unknown>, success: Callback, error: Callback) {
  const handleSuccess = (response: { status: number; body: any }) => {
    onGoingRequests[path] = undefined;
    switch (response.status) {
      case 303: // 未登录 Cerebro
        window.location.href = './login';
        break;
      case 401: // ES 要求认证
        router.push({ path: '/connect', query: { host: state.host, unauthorized: 'true' } });
        break;
      default:
        if (response.status >= 200 && response.status < 300) {
          success(response.body);
        } else {
          error(response.body);
        }
    }
  };
  const handleError = (body: any) => {
    onGoingRequests[path] = undefined;
    AlertService.error('Error connecting to the server', body?.error);
  };
  const activeRequest = onGoingRequests[path] !== undefined;
  const now = new Date().getTime();
  const interval = RefreshService.getInterval();
  if (!activeRequest || now - (onGoingRequests[path] as number) < interval) {
    onGoingRequests[path] = new Date().getTime();
    // 只有网络错误和响应解析失败算连接失败；页面回调里的异常照常抛到控制台，不被吞掉
    fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'same-origin',
    })
      .then(
        async (resp) => ({ ok: resp.ok, body: await resp.json().catch(() => undefined) }),
        () => ({ ok: false, body: undefined }),
      )
      .then((r) => {
        if (r.ok && r.body) {
          handleSuccess(r.body);
        } else {
          handleError(r.body);
        }
      });
  }
}

function clusterRequest(path: string, data: Record<string, unknown>, success: Callback, error: Callback) {
  if (state.host) {
    const merged = { ...data, host: state.host, username: state.username, password: state.password };
    request(path, merged, success, error);
  }
}

export const DataService = {
  state,
  getHost: () => state.host,
  setHost(newHost: string, newUsername?: string, newPassword?: string) {
    state.host = newHost;
    state.username = newUsername;
    state.password = newPassword;
    const current = router.currentRoute.value;
    router.replace({ path: current.path, query: { ...current.query, host: newHost } });
    RefreshService.refresh();
  },
  disconnect() {
    state.host = undefined;
    state.username = undefined;
    state.password = undefined;
    onGoingRequests = {};
    router.push('/connect');
  },
  getNavbarData: (success: Callback, error: Callback) => clusterRequest('navbar', {}, success, error),
  createIndex: (index: string, metadata: unknown, success: Callback, error: Callback) =>
    clusterRequest('create_index/create', { index, metadata }, success, error),
  getIndexMetadata: (index: string, success: Callback, error: Callback) =>
    clusterRequest('create_index/get_index_metadata', { index }, success, error),
  getIndices: (success: Callback, error: Callback) => clusterRequest('commons/indices', {}, success, error),
  getNodes: (success: Callback, error: Callback) => clusterRequest('commons/nodes', {}, success, error),
  getAliases: (success: Callback, error: Callback) => clusterRequest('aliases/get_aliases', {}, success, error),
  updateAliases: (changes: unknown[], success: Callback, error: Callback) =>
    clusterRequest('aliases/update_aliases', { changes }, success, error),
  clusterChanges: (success: Callback, error: Callback) => clusterRequest('cluster_changes', {}, success, error),
  // 其他页面的接口统一走这里，路径与旧前端各 *DataService 相同
  send: (path: string, data: Record<string, unknown>, success: Callback, error: Callback) =>
    clusterRequest(path, data, success, error),
  // 连接页用：不经过 clusterRequest，直接拿到 {status, body}
  raw(method: 'GET' | 'POST', path: string, data?: Record<string, unknown>): Promise<{ status: number; body: any }> {
    return fetch(path, {
      method,
      headers: data ? { 'Content-Type': 'application/json' } : undefined,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'same-origin',
    }).then(async (resp) => {
      const body = await resp.json().catch(() => undefined);
      if (!resp.ok) {
        throw body;
      }
      return body;
    });
  },
};

const host = initialHost();
if (host) {
  state.host = host;
  RefreshService.refresh();
}
