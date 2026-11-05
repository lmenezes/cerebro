// 对应旧前端 shared/ace_editor.js 和 AceEditorService，ace 版本与主题与旧前端相同。
export class AceEditor {
  editor: any;

  constructor(target: string | HTMLElement) {
    this.editor = ace.edit(target);
    this.editor.setFontSize('10px');
    this.editor.setTheme('ace/theme/cerebro');
    this.editor.getSession().setMode('ace/mode/json');
    this.editor.setOptions({
      fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
      fontSize: '12px',
      fontWeight: '400',
    });
  }

  // 设置内容并把光标移到开头
  setValue(value: string) {
    this.editor.setValue(value, 1);
    this.editor.gotoLine(0, 0, false);
  }

  getValue(): any {
    const content = this.editor.getValue();
    if (content.trim()) {
      return JSON.parse(content);
    }
  }

  getStringValue(): string {
    return this.editor.getValue();
  }

  // 格式化 JSON
  format() {
    try {
      const content = this.getValue();
      if (content) {
        this.editor.setValue(JSON.stringify(content, undefined, 2), 0);
        this.editor.gotoLine(0, 0, false);
      }
    } catch {
      // 不是合法 JSON 就不处理
    }
  }
}

export const AceEditorService = {
  init: (name: string) => new AceEditor(name),
};
