// 对应旧前端 RefreshService：定时刷新，页面 watch lastUpdate 重新拉数据。
import { reactive } from 'vue';

const state = reactive({
  timestamp: new Date().getTime(),
  interval: 15000,
});

export const RefreshService = {
  getInterval: () => state.interval,
  setInterval(newInterval: number) {
    if (state.interval > newInterval) {
      this.refresh(); // 调短时立刻生效
    }
    state.interval = newInterval;
  },
  lastUpdate: () => state.timestamp,
  refresh() {
    state.timestamp = Math.max(state.timestamp, new Date().getTime()) + 1;
  },
};

const autoRefresh = () => {
  RefreshService.refresh();
  setTimeout(autoRefresh, state.interval);
};
autoRefresh();
