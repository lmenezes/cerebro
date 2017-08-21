angular.module('cerebro').controller('ConnectController', [
  '$scope', '$location', 'DataService', 'AlertService',
  function($scope, $location, DataService, AlertService) {

    $scope.hosts = undefined;
    $scope.searchHost = '';

    $scope.connecting = false;

    $scope.setup = function() {
      DataService.getHosts(
        function(hosts) {
          $scope.hosts = hosts;
        },
        function(error) {
          AlertService.error('Error while fetching list of known hosts', error);
        }
      );
    };

    $scope.connect = function(host, username, password) {
      if (host) {
        $scope.connecting = true;
        DataService.setHost(host, username, password);
        $location.path('/overview');
      }
    };

  }]);
