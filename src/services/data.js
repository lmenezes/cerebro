angular.module('cerebro').factory('DataService',
  function($rootScope, $timeout, $http, $location) {

    var data; // current data

    var host;

    var username;

    var password;

    var buildBaseUrl = function() {
      var protocol = $location.protocol();
      var host = $location.host();
      var port = $location.port();
      return protocol + '://' + host + ':' + port;
    };

    var baseUrl = buildBaseUrl();

    var successfulRefresh = function(success) {
      return function(response) {
        data = response;
        if (success) {
          success(response);
        }
      };
    };

    var failedRefresh = function(error) {
      return function(response) {
        data = undefined;
        if (error) {
          error(response);
        }
      };
    };

    var refresh = function(success, error) {
      if (host) {
        request(
          '/apis/overview',
          {},
          successfulRefresh(success),
          failedRefresh(error)
        );
      } else {
        $location.path('/connect');
      }
    };

    var autoRefresh = function() {
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

    this.setHost = function(newHost, newUsername, newPassword, success, error) {
      data = undefined;
      host = newHost;
      username = newUsername;
      password = newPassword;
      refresh(success, error);
    };

    this.closeIndex = function(index, success, error) {
      request('/apis/close_indices', {indices: index}, success, error);
    };

    this.openIndex = function(index, success, error) {
      request('/apis/open_indices', {indices: index}, success, error);
    };

    this.forceMerge = function(index, success, error) {
      request('/apis/force_merge', {indices: index}, success, error);
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

    this.getClusterMapping = function(success, error) {
      request('/apis/get_cluster_mapping', {}, success, error);
    };

    this.getAliases = function(success, error) {
      request('/apis/get_aliases', {}, success, error);
    };

    this.updateAliases = function(changes, success, error) {
      request('/apis/update_aliases', {changes: changes}, success, error);
    };

    this.execute = function(method, path, data, success, error) {
      var requestData = {method: method, data: data, path: path};
      request('/apis/rest', requestData, success, error);
    };

    this.getIndexMetadata = function(index, success, error) {
      request('/apis/get_index_metadata', {index: index}, success, error);
    };

    this.createIndex = function(index, metadata, success, error) {
      var data = {index: index, metadata: metadata};
      request('/apis/create_index', data, success, error);
    };

    var request = function(path, data, success, error) {
      var defaultData = {
        host: host,
        username: username,
        password: password
      };
      var config = {
        method: 'POST',
        url: baseUrl + path,
        data: angular.merge(data, defaultData) // adds host to data
      };
      $http(config).success(success).error(error);
    };

    this.getHosts = function(success, error) {
      var config = {
        method: 'GET',
        url: baseUrl + '/apis/hosts'
      };
      $http(config).success(success).error(error);
    };

    if ($location.search().location) {
      this.setHost($location.search().location);
    }

    autoRefresh();

    return this;

  });
