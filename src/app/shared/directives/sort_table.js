angular.module('cerebro').directive('ngSortBy',
    function() {
      function updateSortingIcon(scope, elem, attrs) {
        var sorts = scope.sortBy === attrs.property;
        var sortIcon = elem.find('i');
        sortIcon.removeClass('fa-sort-asc fa-sort-desc');
        if (sorts) {
          if (scope.reverse) {
            sortIcon.addClass('fa-sort-desc');
          } else {
            sortIcon.addClass('fa-sort-asc');
          }
        }
      }

      function link(scope, elem, attrs) {
        scope.$watch(
            function() {
              return scope.sortBy;
            },
            function() {
              updateSortingIcon(scope, elem, attrs);
            });

        scope.$watch(
            function() {
              return scope.reverse;
            },
            function() {
              updateSortingIcon(scope, elem, attrs);
            }
        );
      }

      return {
        link: link,
        template: function(elem, attrs) {
          return '<a href="" target="_self" ng-click=setSortBy(\'' +
          attrs.property + '\')>' + attrs.text +
          '<i class="fa fa-fw fa-sort-asc"></i></a>';
        },
      };
    }
);
