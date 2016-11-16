angular.module('cerebro').controller('NodesController', ['$scope', '$http',
  'DataService', 'AlertService', 'ModalService', 'RefreshService',
  function($scope, $http, DataService, AlertService, ModalService,
           RefreshService) {

    $scope.data = undefined;
    $scope.nodes = undefined;

    $scope.sortBy = 'name';
    $scope.reverse = false;

    $scope.nodes_filter = new NodeFilter('', true, true, true, 0);

    $scope.setSortBy = function(field) {
      if ($scope.sortBy === field) {
        $scope.reverse = !$scope.reverse;
      }
      $scope.sortBy = field;
    };

    $scope.$watch(
      function() {
        return RefreshService.lastUpdate();
      },
      function() {
        $scope.refresh();
      },
      true
    );

    $scope.refresh = function() {
      DataService.getOverview(
        function(data) {
          $scope.data = data;
          $scope.setNodes(data.nodes);
        },
        function(error) {
          AlertService.error('Error while loading data', error);
          $scope.nodes = undefined;
          $scope.data = undefined;
        }
      );
    };

    $scope.$watch('nodes_filter', function() {
        if ($scope.data) {
          $scope.setNodes($scope.data.nodes);
        }
      },
      true);

    $scope.setNodes = function(nodes) {
      $scope.nodes = nodes.filter(function(node) {
        return $scope.nodes_filter.matches(node);
      });
    };

    var displayInfo = function(info) {
      ModalService.showInfo(info);
    };

    var error = function(data) {
      AlertService.error('Operation failed', data);
    };

    $scope.nodeStats = function(node) {
      DataService.nodeStats(node, displayInfo, error);
    };

  }]);
