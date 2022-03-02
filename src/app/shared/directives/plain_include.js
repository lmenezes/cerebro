angular.module('cerebro').directive('ngPlainInclude', function() {
  return {
    templateUrl: function(elem, attr) {
      return attr.file;
    },
  };
});
