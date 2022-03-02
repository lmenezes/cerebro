angular.module('cerebro').directive('ngProgress',
    function() {
      return {
        scope: {
          value: '=value',
          max: '=max',
          text: '=text',
          tooltip: '=tooltip',
        },
        templateUrl: 'shared/progress.html',
      };
    }
);
