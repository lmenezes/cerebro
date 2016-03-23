angular.module('cerebro').controller('StatsController', ['$scope', '$http', 'DataService',
  function ($scope, $http, DataService) {

    $scope.number_of_nodes = undefined;

    $scope.indices = undefined;

    $scope.active_primary_shards = undefined;
    $scope.active_shards = undefined;
    $scope.relocating_shards = undefined;
    $scope.initializing_shards = undefined;
    $scope.unassigned_shards = undefined;
    $scope.total_shards = undefined;

    $scope.docs_count = undefined;

    $scope.size_in_bytes = undefined;

    $scope.cluster_name = undefined;

    $scope.$watch(
        function () {
          return DataService.getData();
        },
        function (data) {
          if (data) {
            $scope.number_of_nodes = data.number_of_nodes;
            $scope.indices = data.indices.length;
            $scope.active_primary_shards = data.active_primary_shards;
            $scope.active_shards = data.active_shards;
            $scope.relocating_shards = data.relocating_shards;
            $scope.initializing_shards = data.initializing_shards;
            $scope.unassigned_shards = data.unassigned_shards;
            $scope.docs_count = data.docs_count;
            $scope.size_in_bytes = data.size_in_bytes;
            $scope.cluster_name = data.cluster_name;

            $scope.total_shards = $scope.active_shards +
                $scope.relocating_shards +
                $scope.initializing_shards +
                $scope.unassigned_shards;
          }
        }
    );

  }]);