angular.module('cerebro').controller('CatController', ['$scope',
  'CatDataService', 'AlertService',
  function($scope, CatDataService, AlertService) {
    $scope.api = undefined;

    $scope.apis = [
      'aliases',
      'allocation',
      'count',
      'fielddata',
      'health',
      'indices',
      'master',
      'nodeattrs',
      'nodes',
      'pending tasks',
      'plugins',
      'recovery',
      'repositories',
      'thread pool',
      'shards',
      'segments',
    ];

    $scope.headers = undefined;
    $scope.data = undefined;
    $scope.sortCol = undefined;
    $scope.sortAsc = true;

    $scope.get = function(api) {
      CatDataService.get(
          api.replace(/ /g, '_'), // transforms thread pool into thread_pool, for example
          function(data) {
            if (data.length) {
              $scope.headers = Object.keys(data[0]);
              $scope.sort($scope.headers[0]);
              $scope.data = data;
            } else {
              $scope.headers = [];
              $scope.data = [];
            }
          },
          function(error) {
            AlertService.error('Error executing request', error);
          }
      );
    };

    $scope.sort = function(col) {
      if ($scope.sortCol === col) {
        $scope.sortAsc = !$scope.sortAsc;
      } else {
        $scope.sortAsc = true;
      }
      $scope.sortCol = col;
    };
  }]
);
