angular.module('cerebro').controller('NavbarController', ['$scope', '$http',
  'PageService', 'DataService',
  function($scope, $http, PageService, DataService) {

    $scope.status = undefined;
    $scope.cluster_name = undefined;
    $scope.host = undefined;

    $scope.$watch(
      function() {
        return DataService.getData();
      },
      function(data) {
        if (data) {
          $scope.status = data.status;
          $scope.cluster_name = data.cluster_name;
          $scope.host = DataService.getHost();
        } else {
          $scope.status = undefined;
          $scope.cluster_name = undefined;
          $scope.host = undefined;
        }
      }
    );

  }]
);
