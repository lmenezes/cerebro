angular.module('cerebro').factory('DataService', ['$rootScope', '$timeout',
  '$http', '$location', 'RefreshService', 'AlertService', '$window',
  function($rootScope, $timeout, $http, $location, RefreshService,
           AlertService, $window) {

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
      clusterRequest('/navbar', {}, success, error);
    };

    // ---------- Overview ----------
    this.getOverview = function(success, error) {
      clusterRequest('/overview', {}, success, error);
    };

    this.closeIndex = function(index, success, error) {
      var data = {indices: index};
      clusterRequest('/overview/close_indices', data, success, error);
    };

    this.openIndex = function(index, success, error) {
      var data = {indices: index};
      clusterRequest('/overview/open_indices', data, success, error);
    };

    this.forceMerge = function(index, success, error) {
      var data = {indices: index};
      clusterRequest('/overview/force_merge', data, success, error);
    };

    this.refreshIndex = function(index, success, error) {
      var data = {indices: index};
      clusterRequest('/overview/refresh_indices', data, success, error);
    };

    this.clearIndexCache = function(index, success, error) {
      var params = {indices: index};
      clusterRequest('/overview/clear_indices_cache', params, success, error);
    };

    this.deleteIndex = function(index, success, error) {
      var data = {indices: index};
      clusterRequest('/overview/delete_indices', data, success, error);
    };

    this.enableShardAllocation = function(success, error) {
      clusterRequest('/overview/enable_shard_allocation', {}, success, error);
    };

    this.disableShardAllocation = function(success, error) {
      clusterRequest('/overview/disable_shard_allocation', {}, success, error);
    };

    this.getShardStats = function(index, node, shard, success, error) {
      var data = {index: index, node: node, shard: shard};
      clusterRequest('/overview/get_shard_stats', data, success, error);
    };

    this.relocateShard = function(shard, index, from, to, success, error) {
      var data = {shard: shard, index: index, from: from, to: to};
      clusterRequest('/overview/relocate_shard', data, success, error);
    };

    // ---------- Create index ----------
    this.createIndex = function(index, metadata, success, error) {
      var data = {index: index, metadata: metadata};
      clusterRequest('/create_index/create', data, success, error);
    };

    this.getIndexMetadata = function(index, success, error) {
      var data = {index: index};
      clusterRequest('/create_index/get_index_metadata', data, success, error);
    };

    // ---------- Commons ----------
    this.getIndices = function(success, error) {
      clusterRequest('/commons/indices', {}, success, error);
    };

    this.getNodes = function(success, error) {
      clusterRequest('/commons/nodes', {}, success, error);
    };

    this.getIndexSettings = function(index, success, error) {
      var data = {index: index};
      clusterRequest('/commons/get_index_settings', data, success, error);
    };

    this.getIndexMapping = function(index, success, error) {
      var data = {index: index};
      clusterRequest('/commons/get_index_mapping', data, success, error);
    };

    this.nodeStats = function(node, success, error) {
      clusterRequest('/commons/get_node_stats', {node: node}, success, error);
    };

    // ---------- Analysis ----------
    this.getOpenIndices = function(success, error) {
      clusterRequest('/analysis/indices', {}, success, error);
    };

    this.getIndexAnalyzers = function(index, success, error) {
      clusterRequest('/analysis/analyzers', {index: index}, success, error);
    };

    this.getIndexFields = function(index, success, error) {
      clusterRequest('/analysis/fields', {index: index}, success, error);
    };

    this.analyzeByField = function(index, field, text, success, error) {
      var data = {index: index, field: field, text: text};
      clusterRequest('/analysis/analyze/field', data, success, error);
    };

    this.analyzeByAnalyzer = function(index, analyzer, text, success, error) {
      var data = {index: index, analyzer: analyzer, text: text};
      clusterRequest('/analysis/analyze/analyzer', data, success, error);
    };

    // ---------- Aliases ----------

    this.getAliases = function(success, error) {
      clusterRequest('/aliases/get_aliases', {}, success, error);
    };

    this.updateAliases = function(changes, success, error) {
      var data = {changes: changes};
      clusterRequest('/aliases/update_aliases', data, success, error);
    };

    // ---------- Cluster State Changes ----------
    this.clusterChanges = function(success, error) {
      clusterRequest('/cluster_changes', {}, success, error);
    };

    // ---------- Connect ----------
    this.getHosts = function(success, error) {
      var config = {
        method: 'GET',
        url: baseUrl + '/connect/hosts'
      };
      request(config, success, error);
    };

    // ---------- Rest ----------

    this.getClusterMapping = function(success, error) {
      clusterRequest('/rest/get_cluster_mapping', {}, success, error);
    };

    this.execute = function(method, path, data, success, error) {
      var requestData = {method: method, data: data, path: path};
      clusterRequest('/rest/request', requestData, success, error);
    };

    // ---------- External API ----------

    this.send = function(path, data, success, error) {
      clusterRequest(path, data, success, error);
    };

    // ---------- Internal ----------

    var clusterRequest = function(path, data, success, error) {
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
        request(config, success, error);
      }
    };

    var request = function(config, success, error) {
      var handleSuccess = function(data) {
        if (data.status === 303) {
          $window.location.href = '/login';
        } else {
          if (data.status === 200) {
            success(data.body);
          } else {
            error(data.body);
          }
        }
      };
      var handleError = function(data) {
        AlertService.error('Error connecting to the server', data.error);
      };
      $http(config).success(handleSuccess).error(handleError);
    };

    return this;

  }
]);
