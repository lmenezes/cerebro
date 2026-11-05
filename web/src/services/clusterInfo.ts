// 当前连接的附加信息（是否只读），用于隐藏修改类按钮。只读时由服务端拦截，这里只是界面提示。
import { reactive, watch } from 'vue';
import { DataService } from './data';

const state = reactive({ readOnly: false, username: undefined as string | undefined });

watch(
  () => [DataService.state.host, DataService.state.username, DataService.state.password],
  () => {
    state.readOnly = false;
    DataService.send(
      'cerebro_info',
      {},
      (info) => {
        state.readOnly = !!info.read_only;
        state.username = info.username ?? undefined;
      },
      () => {},
    );
  },
  { immediate: true },
);

export const ClusterInfo = {
  get readOnly() {
    return state.readOnly;
  },
  get username() {
    return state.username;
  },
};
