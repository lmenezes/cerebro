function AceEditor(target) {
  // ace editor
  ace.config.set('basePath', '/');
  this.editor = ace.edit(target);
  this.editor.setFontSize('10px');
  this.editor.setTheme('ace/theme/cerebro');
  this.editor.getSession().setMode('ace/mode/json');
  this.editor.setOptions({
    fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
    fontSize: '12px',
    fontWeight: '400'
  });

  // sets value and moves cursor to beggining
  this.setValue = function(value) {
    this.editor.setValue(value, 1);
    this.editor.gotoLine(0, 0, false);
  };

  this.getValue = function() {
    var content = this.editor.getValue();
    if (content.trim()) {
      return JSON.parse(content);
    }
  };

  // formats the json content
  this.format = function() {
    try {
      var content = this.editor.getValue();
      this.editor.setValue(content, 0);
      this.editor.gotoLine(0, 0, false);
    } catch (error) { // nothing to do
    }
  };

}
