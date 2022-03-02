angular.module('cerebro').factory('ConnectDataService', ['$http', 'DataService',
  function($http, DataService) {
    this.getHosts = function(success, error) {
      var config = {method: 'GET', url: 'connect/hosts'};
      var handleSuccess = function(response) {
        if (response.data.status >= 200 && response.data.status < 300) {
          success(response.data.body);
        } else {
          error(response.data.body);
        }
      };
      var handleError = function(response) {
        error(response.data.body);
      };
      $http(config).then(handleSuccess, handleError);
    };

    this.testConnection = function(host, success, error) {
      var config = {method: 'POST', url: 'connect', data: {host: host}};
      $http(config).then(success, error);
    };

    this.testCredentials = function(host, username, password, success, error) {
      var data = {host: host, username: username, password: password};
      var config = {method: 'POST', url: 'connect', data: data};
      $http(config).then(success, error);
    };

    this.connect = function(host) {
      DataService.setHost(host);
    };

    this.connectWithCredentials = function(host, username, password) {
      DataService.setHost(host, username, password);
    };

    return this;
  },
]);
