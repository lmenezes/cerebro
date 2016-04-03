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
    request('/apis/close_indices', {indices: index}, success, error);
  };

  this.openIndex = function(index, success, error) {
    request('/apis/open_indices', {indices: index}, success, error);
  };

  this.optimizeIndex = function(index, success, error) {
    request('/apis/optimize_indices', {indices: index}, success, error);
  };

  this.refreshIndex = function(index, success, error) {
    request('/apis/refresh_indices', {indices: index}, success, error);
  };

  this.clearIndexCache = function(index, success, error) {
    request('/apis/clear_indices_cache', {indices: index}, success, error);
  };

  this.deleteIndex = function(index, success, error) {
    request('/apis/delete_indices', {indices: index}, success, error);
  };

  this.getIndexSettings = function(index, success, error) {
    request('/apis/get_index_settings', {index: index}, success, error);
  };

  this.getIndexMapping = function(index, success, error) {
    request('/apis/get_index_mapping', {index: index}, success, error);
  };

  this.nodeStats = function(node, success, error) {
    request('/apis/get_node_stats', {node: node}, success, error);
  };

  this.enableShardAllocation = function(success, error) {
    request('/apis/enable_shard_allocation', {}, success, error);
  };

  this.disableShardAllocation = function(success, error) {
    request('/apis/disable_shard_allocation', {}, success, error);
  };

  this.getShardStats = function(index, node, shard, success, error) {
    var data = {index: index, node: node, shard: shard};
    request('/apis/get_shard_stats', data, success, error);
  };

  var request = function(path, data, success, error) {
    var config = {
      method: 'POST',
      url: baseUrl + path,
      data: angular.merge(data, {host: host}) // adds host to data
    };
    $http(config).success(success).error(error);
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
