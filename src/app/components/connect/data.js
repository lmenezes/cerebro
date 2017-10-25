angular.module('cerebro').factory('ConnectDataService', ['$http',
  function($http) {

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

    this.connect = function(host, success, error) {
      var config = {method: 'POST', url: 'connect', data: {host: host}};
      $http(config).success(success).error(error);
    };

    this.authorize = function(host, username, password, success, error) {
      var data = {host: host, username: username, password: password};
      var config = {method: 'POST', url: 'connect', data: data};
      $http(config).success(success).error(error);
    };

    return this;

  }
]);
