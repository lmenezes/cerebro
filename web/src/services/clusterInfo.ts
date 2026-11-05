// 当前连接的附加信息（是否只读），用于隐藏修改类按钮。只读时由服务端拦截，这里只是界面提示。
import { reactive, watch } from 'vue';
import { DataService } from './data';

const state = reactive({ known: false, readOnly: false, username: undefined as string | undefined });

watch(
  () => [DataService.state.host, DataService.state.username, DataService.state.password],
  () => {
    // 结果回来之前按只读处理，免得只读集群上短暂露出修改按钮
    state.known = false;
    const host = DataService.state.host;
    DataService.send(
      'cerebro_info',
      {},
      (info) => {
        if (host !== DataService.state.host) {
          return; // 已经切换到别的集群
        }
        state.readOnly = !!info.read_only;
        state.username = info.username ?? undefined;
        state.known = true;
      },
      () => {
        if (host === DataService.state.host) {
          state.readOnly = false; // 取不到时显示按钮，写操作仍由服务端把关
          state.known = true;
        }
      },
    );
  },
  { immediate: true },
);

export const ClusterInfo = {
  get readOnly() {
    return !state.known || state.readOnly;
  },
  get username() {
    return state.username;
  },
};
