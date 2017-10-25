angular.module('cerebro').factory('ConnectDataService', ['$http', 'DataService',
  function($http, DataService) {

    this.getHosts = function(success, error) {
      var config = {method: 'GET', url: 'connect/hosts'};
      var handleSuccess = function(data) {
        if (data.status >= 200 && data.status < 300) {
          success(data.body);
        } else {
          error(data.body);
        }
      };
      $http(config).success(handleSuccess).error(error);
    };

    this.testConnection = function(host, success, error) {
      var config = {method: 'POST', url: 'connect', data: {host: host}};
      $http(config).success(success).error(error);
    };

    this.testCredentials = function(host, username, password, success, error) {
      var data = {host: host, username: username, password: password};
      var config = {method: 'POST', url: 'connect', data: data};
      $http(config).success(success).error(error);
    };

    this.connect = function(host) {
      DataService.setHost(host);
    };

    this.connectWithCredentials = function(host, username, password) {
      DataService.setHost(host, username, password);
    };

    return this;

  }
]);
