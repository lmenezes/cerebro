angular.module('cerebro').directive('ngProgress',
  function() {

    return {
      scope: {
        value: '=value',
        max: '=max',
        text: '=text'
      },
      template: function(elem, attrs) {
        return '<span class="detail"><small>{{text}}</small></span>' +
          '<div class="progress progress-thin">' +
          '<div class="progress-bar-info" style="width: {{value}}%"' +
          'ng-class="{\'progress-bar-danger\': {{(value / max) > 0.75}}}">' +
          '{{value}}%' +
          '</div></div>';
      }
    };
  }
);
