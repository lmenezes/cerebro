angular.module('cerebro').factory('DataService', ['$rootScope', '$timeout',
  '$http', '$location', 'RefreshService', 'AlertService',
  function($rootScope, $timeout, $http, $location, RefreshService,
           AlertService) {

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

    this.getHost = function() {
      return host;
    };

    this.setHost = function(newHost, newUsername, newPassword) {
      host = newHost;
      username = newUsername;
      password = newPassword;
      $location.search('host', newHost);
      RefreshService.refresh();
    };

    if ($location.search().host) {
      this.setHost($location.search().host);
    }

    // ---------- Navbar ----------
    this.getNavbarData = function(success, error) {
      request('/navbar', {}, success, error);
    };

    // ---------- Overview ----------
    this.getOverview = function(success, error) {
      request('/overview', {}, success, error);
    };

    this.closeIndex = function(index, success, error) {
      request('/overview/close_indices', {indices: index}, success, error);
    };

    this.openIndex = function(index, success, error) {
      request('/overview/open_indices', {indices: index}, success, error);
    };

    this.forceMerge = function(index, success, error) {
      request('/overview/force_merge', {indices: index}, success, error);
    };

    this.refreshIndex = function(index, success, error) {
      request('/overview/refresh_indices', {indices: index}, success, error);
    };

    this.clearIndexCache = function(index, success, error) {
      var params = {indices: index};
      request('/overview/clear_indices_cache', params, success, error);
    };

    this.deleteIndex = function(index, success, error) {
      request('/overview/delete_indices', {indices: index}, success, error);
    };

    this.enableShardAllocation = function(success, error) {
      request('/overview/enable_shard_allocation', {}, success, error);
    };

    this.disableShardAllocation = function(success, error) {
      request('/overview/disable_shard_allocation', {}, success, error);
    };

    this.getShardStats = function(index, node, shard, success, error) {
      var data = {index: index, node: node, shard: shard};
      request('/overview/get_shard_stats', data, success, error);
    };

    // ---------- Create index ----------
    this.createIndex = function(index, metadata, success, error) {
      var data = {index: index, metadata: metadata};
      request('/create_index/create', data, success, error);
    };

    this.getIndexMetadata = function(index, success, error) {
      var params = {index: index};
      request('/create_index/get_index_metadata', params, success, error);
    };

    // ---------- Commons ----------
    this.getIndices = function(success, error) {
      request('/commons/indices', {}, success, error);
    };

    this.getNodes = function(success, error) {
      request('/commons/nodes', {}, success, error);
    };

    this.getIndexSettings = function(index, success, error) {
      request('/commons/get_index_settings', {index: index}, success, error);
    };

    this.getIndexMapping = function(index, success, error) {
      request('/commons/get_index_mapping', {index: index}, success, error);
    };

    this.nodeStats = function(node, success, error) {
      request('/commons/get_node_stats', {node: node}, success, error);
    };

    // ---------- Analysis ----------
    this.getOpenIndices = function(success, error) {
      request('/analysis/indices', {}, success, error);
    };

    this.getIndexAnalyzers = function(index, success, error) {
      request('/analysis/analyzers', {index: index}, success, error);
    };

    this.getIndexFields = function(index, success, error) {
      request('/analysis/fields', {index: index}, success, error);
    };

    this.analyzeByField = function(index, field, text, success, error) {
      var data = {index: index, field: field, text: text};
      request('/analysis/analyze/field', data, success, error);
    };

    this.analyzeByAnalyzer = function(index, analyzer, text, success, error) {
      var data = {index: index, analyzer: analyzer, text: text};
      request('/analysis/analyze/analyzer', data, success, error);
    };

    // ---------- Aliases ----------

    this.getAliases = function(success, error) {
      request('/aliases/get_aliases', {}, success, error);
    };

    this.updateAliases = function(changes, success, error) {
      request('/aliases/update_aliases', {changes: changes}, success, error);
    };

    // ---------- Cluster State Changes ----------
    this.clusterChanges = function(success, error) {
      request('/cluster_changes', {}, success, error);
    };

    // ---------- Connect ----------
    this.getHosts = function(success, error) {
      var config = {
        method: 'GET',
        url: baseUrl + '/connect/hosts'
      };
      $http(config).success(success).error(error);
    };

    // ---------- Rest ----------

    this.getClusterMapping = function(success, error) {
      request('/rest/get_cluster_mapping', {}, success, error);
    };

    this.execute = function(method, path, data, success, error) {
      var requestData = {method: method, data: data, path: path};
      request('/rest/request', requestData, success, error);
    };

    // ---------- External API ----------

    this.send = function(path, data, success, error) {
      request(path, data, success, error);
    };

    // ---------- Internal ----------

    var request = function(path, data, success, error) {
      if (host) {
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
      } else {
        $location.path('/connect');
      }
    };

    return this;

  }
]);
