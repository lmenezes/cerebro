angular.module('cerebro').factory('AceEditorService', function() {
  this.init = function(name) {
    return new AceEditor(name);
  };

  return this;
});
