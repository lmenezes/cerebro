// 对应旧前端 AlertService。
import { reactive } from 'vue';

let alertSeq = 0;

export class Alert {
  timestamp: Date;
  id: string;

  constructor(
    public message: string,
    public response: unknown,
    public level: string,
    public cls: string,
    public icon: string,
  ) {
    this.timestamp = new Date();
    // 原版只用毫秒时间戳，同一时刻的多条提示 id 相同，会被一起删掉
    this.id = 'alert_box_' + this.timestamp.getTime() + '_' + ++alertSeq;
  }

  hasResponse() {
    return this.response;
  }

  getResponse() {
    if (this.response) {
      return JSON.stringify(this.response, undefined, 2);
    }
  }
}

const state = reactive({ alerts: [] as Alert[] });
const maxAlerts = 3;

function addAlert(alert: Alert, timeout: number) {
  state.alerts.unshift(alert);
  setTimeout(() => AlertService.remove(alert.id), timeout);
  if (state.alerts.length >= maxAlerts) {
    state.alerts.length = 3;
  }
  return alert.id;
}

export const AlertService = {
  get alerts() {
    return state.alerts;
  },
  clear() {
    state.alerts.length = 0;
  },
  remove(id: string) {
    state.alerts = state.alerts.filter((a) => id != a.id);
  },
  error(msg: string, resp?: unknown, timeout?: number) {
    return addAlert(new Alert(msg, resp, 'error', 'alert-danger', 'fa fa-warning'), timeout || 7500);
  },
  info(msg: string, resp?: unknown, timeout?: number) {
    return addAlert(new Alert(msg, resp, 'info', 'alert-info', 'fa fa-info'), timeout || 2500);
  },
  success(msg: string, resp?: unknown, timeout?: number) {
    return addAlert(new Alert(msg, resp, 'success', 'alert-success', 'fa fa-check'), timeout || 2500);
  },
  warn(msg: string, resp?: unknown, timeout?: number) {
    return addAlert(new Alert(msg, resp, 'warn', 'alert-warning', 'fa fa-info'), timeout || 5000);
  },
};
