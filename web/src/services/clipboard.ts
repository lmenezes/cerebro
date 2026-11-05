// 对应旧前端 ClipboardService。
let textarea: HTMLTextAreaElement | undefined;

export const ClipboardService = {
  copy(value: string, success: () => void, failure: () => void) {
    if (!textarea) {
      textarea = document.createElement('textarea');
      textarea.id = 'clipboard';
      Object.assign(textarea.style, { width: '0px', height: '0px', position: 'absolute', left: '-10px', top: '-10px' });
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
    }
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
