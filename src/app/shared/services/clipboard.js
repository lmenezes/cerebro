angular.module('cerebro').factory('ClipboardService', ['AlertService',
  '$document', '$window',
  function(AlertService, $document, $window) {
    var textarea = angular.element($document[0].createElement('textarea'));
    textarea.css({
      position: 'absolute',
      left: '-9999px',
      top: (
          $window.pageYOffset || $document[0].documentElement.scrollTop
      ) + 'px'
    });
    textarea.attr({readonly: ''});
    angular.element($document[0].body).append(textarea);

    this.copy = function(value, success, failure) {
      try {
        textarea.val(value);
        textarea.select();
        $document[0].execCommand('copy');
        success();
      } catch (error) {
        failure();
      }
    };

    return this;
  }
]);
