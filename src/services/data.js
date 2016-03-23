angular.module('cerebro').factory('DataService', function ($rootScope, $timeout, $http, $location) {

  var data = undefined; // current data

  var host = undefined;

  var baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();

  var refresh = function(success, error) {
    if (host) {
      var config = {
        method: 'GET',
        url: baseUrl + '/apis/overview',
        params: {host: host}
      };
      $http(config).
          success(function(response) {
            data = response;
            if (success) {
              success(response);
            }
          }).
          error(function(response) {
            data = undefined;
            if (error) {
              error(response);
            }
          });
    } else {
      $location.path("/connect");
    }
  };

  var autoRefresh = function () {
    refresh();
    $timeout(autoRefresh, 3000);
  };

  this.getData = function() {
    return data;
  };

  this.forceRefresh = function() {
    refresh();
  };

  this.getHost = function() {
    return host;
  };

  this.setHost = function(newHost, success, error) {
    data = undefined;
    host = newHost;
    refresh(success, error);
  };

  autoRefresh();

  this.closeIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/' + index + '/_close',
      params: {host: host}
    };
    $http(config).
        success(success).
        error(error);
  };

  this.openIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/' + index + '/_open',
      params: {host: host}
    };
    $http(config).
        success(success).
        error(error);
  };

  this.optimizeIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/' + index + '/_optimize',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.refreshIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/' + index + '/_refresh',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.clearIndexCache = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/' + index + '/_cache/clear',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.deleteIndex = function(index, success, error) {
    var config = {
      method: 'DELETE',
      url: baseUrl + '/apis/' + index + '/_delete',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.getIndexSettings = function(index, success, error) {
    var config = {
      method: 'GET',
      url: baseUrl + '/apis/' + index + '/_settings',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.getIndexMapping = function(index, success, error) {
    var config = {
      method: 'GET',
      url: baseUrl + '/apis/' + index + '/_mapping',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.nodeStats = function(node, success, error) {
    var config = {
      method: 'GET',
      url: baseUrl + '/apis/_nodes/' + node + '/stats',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.enableShardAllocation = function(success, error) {
    var config = {
      method: 'PUT',
      url: baseUrl + '/apis/enable_allocation',
      params: {host: host}
    };
    $http(config).
    success(success).
    error(error);
  };

  this.disableShardAllocation = function(success, error) {
    var config = {
      method: 'PUT',
      url: baseUrl + '/apis/disable_allocation',
      params: {host: host}
    };
    $http(config).
        success(success).
        error(error);
  };

  this.getHosts = function (success, error) {
    var config = {
      method: 'GET',
      url: baseUrl + '/apis/hosts'
    };
    $http(config).success(success).error(error);
  };

  return this;

});
