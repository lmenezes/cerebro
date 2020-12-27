angular.module('cerebro').factory('OverviewDataService', ['DataService',
  function(DataService) {
    this.getOverview = function(success, error) {
      DataService.send('overview', {}, success, error);
    };

    this.closeIndex = function(index, success, error) {
      var data = {indices: index};
      DataService.send('overview/close_indices', data, success, error);
    };

    this.openIndex = function(index, success, error) {
      var data = {indices: index};
      DataService.send('overview/open_indices', data, success, error);
    };

    this.forceMerge = function(index, success, error) {
      var data = {indices: index};
      DataService.send('overview/force_merge', data, success, error);
    };

    this.refreshIndex = function(index, success, error) {
      var data = {indices: index};
      DataService.send('overview/refresh_indices', data, success, error);
    };

    this.flushIndex = function(index, success, error) {
      var data = {indices: index};
      DataService.send('overview/flush_indices', data, success, error);
    };

    this.clearIndexCache = function(index, success, error) {
      var params = {indices: index};
      DataService.send('overview/clear_indices_cache', params, success, error);
    };

    this.deleteIndex = function(index, success, error) {
      var data = {indices: index};
      DataService.send('overview/delete_indices', data, success, error);
    };

    this.enableShardAllocation = function(success, error) {
      DataService.send('overview/enable_shard_allocation', {}, success, error);
    };

    this.disableShardAllocation = function(kind, success, error) {
      DataService.send('overview/disable_shard_allocation', {kind: kind}, success, error);
    };

    this.getShardStats = function(index, node, shard, success, error) {
      var data = {index: index, node: node, shard: shard};
      DataService.send('overview/get_shard_stats', data, success, error);
    };

    this.relocateShard = function(shard, index, from, to, success, error) {
      var data = {shard: shard, index: index, from: from, to: to};
      DataService.send('overview/relocate_shard', data, success, error);
    };

    this.nodeStats = function(node, success, error) {
      DataService.send('commons/get_node_stats', {node: node}, success, error);
    };

    this.indexStats = function(index, success, error) {
      var data = {index: index};
      DataService.send('commons/get_index_stats', data, success, error);
    };

    this.getIndexMapping = function(index, success, error) {
      var data = {index: index};
      DataService.send('commons/get_index_mapping', data, success, error);
    };

    this.getIndexSettings = function(index, success, error) {
      var data = {index: index};
      DataService.send('commons/get_index_settings', data, success, error);
    };

    return this;
  },
]);
