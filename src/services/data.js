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
      url: baseUrl + '/apis/close_indices',
      data: {
        host: host,
        indices: index
      }
    };
    $http(config).
        success(success).
        error(error);
  };

  this.openIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/open_indices',
      data: {
        host: host,
        indices: index
      }
    };
    $http(config).
        success(success).
        error(error);
  };

  this.optimizeIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/optimize_indices',
      data: {
        host: host,
        indices: index
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.refreshIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/refresh_indices',
      data: {
        host: host,
        indices: index
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.clearIndexCache = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/clear_indices_cache',
      data: {
        host: host,
        indices: index
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.deleteIndex = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/delete_indices',
      data: {
        host: host,
        indices: index
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.getIndexSettings = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/get_index_settings',
      data: {
        host: host,
        index: index
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.getIndexMapping = function(index, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/get_index_mapping',
      data: {
        host: host,
        index: index
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.nodeStats = function(node, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/get_node_stats',
      data: {
        host: host,
        node: node
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.enableShardAllocation = function(success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/enable_shard_allocation',
      data: {
        host: host
      }
    };
    $http(config).
    success(success).
    error(error);
  };

  this.disableShardAllocation = function(success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + '/apis/disable_shard_allocation',
      data: {
        host: host
      }
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
