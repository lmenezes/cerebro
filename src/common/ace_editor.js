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

    // validation error
    this.error = null;

    // sets value and moves cursor to beggining
    this.setValue = function(value) {
        this.editor.setValue(value, 1);
        this.editor.gotoLine(0, 0, false);
    };

    this.getValue = function() {
        return this.editor.getValue();
    };

    // formats the json content
    this.format = function() {
        var content = this.editor.getValue();
        try {
            if (isDefined(content) && content.trim().length > 0) {
                this.error = null;
                content = JSON.stringify(JSON.parse(content), undefined, 2);
                this.editor.setValue(content, 0);
                this.editor.gotoLine(0, 0, false);
            }
        } catch (error) {
            this.error = error.toString();
        }
        return content;
    };

    this.hasContent = function() {
        return this.editor.getValue().trim().length > 0;
    };
}
