angular.module('cerebro').controller('ConnectController', [
  '$scope', '$location', 'DataService', 'AlertService',
  function($scope, $location, DataService, AlertService) {

    $scope.hosts = undefined;

    $scope.connecting = false;

    $scope.host = undefined;

    DataService.getHosts(
        function(hosts) {
          $scope.hosts = hosts;
        },
        function(error) {

        }
    );

    $scope.connect = function(host) {
      if (host) {
        $scope.connecting = true;
        DataService.setHost(
            host,
            function(response) {
              $location.path("/overview");
              $scope.host = DataService.getHost();
            },
            function(response) {
              $scope.connecting = false;
              AlertService.error("Error connecting to " + host, response);
            }
        );
      }
    };

  }]);
