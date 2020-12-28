angular.module('cerebro').controller('ConnectController', [
  '$scope', '$location', 'ConnectDataService', 'AlertService',
  function($scope, $location, ConnectDataService, AlertService) {
    $scope.hosts = undefined;

    $scope.connecting = false;

    $scope.unauthorized = false;

    $scope.feedback = undefined;

    $scope.setup = function() {
      ConnectDataService.getHosts(
          function(hosts) {
            $scope.hosts = hosts;
          },
          function(error) {
            AlertService.error('Error while fetching list of known hosts', error);
          }
      );
      $scope.host = $location.search().host;
      $scope.unauthorized = $location.search().unauthorized;
    };

    $scope.connect = function(host) {
      $scope.feedback = undefined;
      $scope.host = host;
      $scope.connecting = true;
      var success = function(response) {
        $scope.connecting = false;
        switch (response.data.status) {
          case 200:
            ConnectDataService.connect(host);
            $location.path('/overview');
            break;
          case 401:
            $scope.unauthorized = true;
            break;
          default:
            feedback('Unexpected response status: [' + response.data.status + ']');
        }
      };
      var error = function(response) {
        $scope.connecting = false;
        AlertService.error('Error connecting to [' + host + ']', response.data);
      };
      ConnectDataService.testConnection(host, success, error);
    };

    $scope.authorize = function(host, username, pwd) {
      $scope.feedback = undefined;
      $scope.connecting = true;
      var success = function(response) {
        $scope.connecting = false;
        switch (response.data.status) {
          case 401:
            feedback('Invalid username or password');
            break;
          case 200:
            ConnectDataService.connectWithCredentials(host, username, pwd);
            $location.path('/overview');
            break;
          default:
            feedback('Unexpected response status: [' + response.data.status + ']');
        }
      };
      var error = function(response) {
        $scope.connecting = false;
        AlertService.error('Error connecting to [' + host + ']', response.data);
      };
      ConnectDataService.testCredentials(host, username, pwd, success, error);
    };

    var feedback = function(message) {
      $scope.feedback = message;
    };
  }]);
