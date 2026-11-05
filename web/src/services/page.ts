// 对应旧前端 PageService：标题和 favicon 颜色跟随集群状态。
const colors: Record<string, string> = {
  green: 'img/green-favicon.png',
  yellow: 'img/yellow-favicon.png',
  red: 'img/red-favicon.png',
  black: 'img/black-favicon.png',
};

export const PageService = {
  setup(name?: string, status?: string) {
    document.title = name ? name + '[' + status + ']' : 'cerebro - no connection';
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (link) {
      link.type = 'image/png';
      link.href = (status && colors[status]) || colors.black;
    }
  },
};
