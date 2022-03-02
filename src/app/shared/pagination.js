angular.module('cerebro').directive('ngPagination', ['$document',
  function($document) {
    return {
      scope: {
        paginator: '=paginator',
        page: '=page',
        label: '=label',
      },
      templateUrl: 'pagination.html',
      link: function(scope, element, attrs) {
        var handler = function(event) {
          var $target = $(event.target);
          if ($target.is('input, textarea')) {
            return;
          }
          if (event.keyCode == 39 && scope.page.next) {
            scope.$apply(function() {
              scope.paginator.nextPage();
              event.preventDefault();
            });
          }
          if (event.keyCode == 37 && scope.page.previous) {
            scope.$apply(function() {
              scope.paginator.previousPage();
              event.preventDefault();
            });
          }
        };

        $document.bind('keydown', handler);
        element.on('$destroy', function() {
          $document.unbind('keydown', handler);
        });
      },
    };
  }]
);
