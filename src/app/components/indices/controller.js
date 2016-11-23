angular.module('cerebro').controller('IndicesController', ['$scope', '$http',
  'DataService', 'AlertService', 'ModalService', 'RefreshService',
  function($scope, $http, DataService, AlertService, ModalService,
           RefreshService) {

    $scope.data = undefined;
    $scope.indices = undefined;
    $scope.closed_indices = 0;
    $scope.special_indices = 0;

    $scope.sortBy = 'name';
    $scope.reverse = true;

    $scope.indices_filter = new IndexFilter('', false, false, true, true, 0);

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
          $scope.setIndices(data.indices);
          $scope.closed_indices = data.closed_indices;
          $scope.special_indices = data.special_indices;
        },
        function(error) {
          AlertService.error('Error while loading data', error);
          $scope.indices = undefined;
          $scope.data = undefined;
          $scope.closed_indices = 0;
          $scope.special_indices = 0;
        }
      );
    };

    $scope.$watch('indices_filter', function() {
        if ($scope.data) {
          $scope.setIndices($scope.data.indices);
        }
      },
      true);

    $scope.setIndices = function(indices) {
      $scope.indices = indices.filter(function(index) {
        return $scope.indices_filter.matches(index);
      });
    };

    var displayInfo = function(info) {
      ModalService.showInfo(info);
    };

    var error = function(data) {
      AlertService.error('Operation failed', data);
    };

    $scope.getIndexSettings = function(index) {
      DataService.getIndexSettings(index, displayInfo, error);
    };

  }]);
