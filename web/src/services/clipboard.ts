// 对应旧前端 ClipboardService：和旧版一样，服务一加载（第一次进入 REST 页）就在 body 末尾放一个隐藏的 textarea。
// 创建时机会影响整页截图，所以不能等到第一次复制时才创建。
const textarea = document.createElement('textarea');
textarea.id = 'clipboard';
Object.assign(textarea.style, { width: '0px', height: '0px', position: 'absolute', left: '-10px', top: '-10px' });
textarea.setAttribute('readonly', '');
document.body.appendChild(textarea);

export const ClipboardService = {
  copy(value: string, success: () => void, failure: () => void) {
    try {
      textarea.value = value;
      textarea.select();
      document.execCommand('copy');
      success();
    } catch {
      failure();
    }
  },
};
