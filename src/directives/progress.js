angular.module('cerebro').directive('ngProgress',
    function () {

      return {
        scope: {
          value: '=value',
          max: '=max',
          text: '=text'
        },
        template: function (elem, attrs) {
          return '<span class="detail">{{text}}</span>' +
              '<progress class="progress progress-thin" value="{{value}}" max="{{max}}"' +
              'ng-class="{\'progress-danger\': {{(value / max) > 0.75}}}">' +
              '{{value}}%' +
              '</progress>'
        }
      };
    }
);
