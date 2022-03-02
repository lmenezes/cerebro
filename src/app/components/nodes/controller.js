angular.module('cerebro').controller('NodesController', ['$scope',
  'NodesDataService', 'AlertService', 'RefreshService',
  function($scope, NodesDataService, AlertService, RefreshService) {
    $scope._nodes = undefined; // keeps unfiltered list of nodes
    $scope.nodes = undefined;

    $scope.sortBy = 'name';
    $scope.reverse = false;

    $scope.filter = new NodeFilter('', true, true, true, true, 0);

    $scope.$watch(
        function() {
          return RefreshService.lastUpdate();
        },
        function() {
          $scope.refresh();
        },
        true
    );

    $scope.$watch('filter', function() {
      $scope.refreshVisibleNodes();
    },
    true);

    $scope.setSortBy = function(field) {
      if ($scope.sortBy === field) {
        $scope.reverse = !$scope.reverse;
      }
      $scope.sortBy = field;
    };

    $scope.refreshVisibleNodes = function() {
      if ($scope._nodes) {
        $scope.nodes = $scope._nodes.filter(function(node) {
          return $scope.filter.matches(node);
        });
      } else {
        $scope.nodes = undefined;
      }
    };

    $scope.setNodes = function(nodes) {
      $scope._nodes = nodes;
      $scope.refreshVisibleNodes();
    };

    $scope.refresh = function() {
      NodesDataService.load(
          function(nodes) {
            $scope.setNodes(nodes);
          },
          function(error) {
            $scope.setNodes(undefined);
            AlertService.error('Error while loading nodes data', error);
          }
      );
    };
  }]
);
