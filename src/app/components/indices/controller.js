angular.module('cerebro').controller('IndicesController', ['$scope', '$http',
  'DataService', 'AlertService', 'ModalService', 'RefreshService',
  function($scope, $http, DataService, AlertService, ModalService,
           RefreshService) {

    $scope.data = undefined;
    $scope.indices = undefined;

    $scope.indices_filter = new IndexFilter('', true, false, true, true, 0);

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
        },
        function(error) {
          AlertService.error('Error while loading data', error);
          $scope.indices = undefined;
          $scope.data = undefined;
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

    $scope.indexStats = function(index) {
      DataService.indexStats(index, displayInfo, error);
    };

  }]);
