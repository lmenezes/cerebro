angular.module('cerebro').factory('ClipboardService', ['AlertService',
  '$document',
  function(AlertService, $document) {
    var textarea = angular.element('<textarea id="clipboard"></textarea>');
    textarea.css({width: '0px', height: '0px', position: 'absolute', left: '-10px', top: '-10px'});
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
  },
]);
