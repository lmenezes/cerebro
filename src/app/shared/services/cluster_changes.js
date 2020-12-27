angular.module('cerebro').factory('ClusterChangesService', [
  '$rootScope', 'AlertService', 'RefreshService', 'DataService',
  function($rootScope, AlertService, RefreshService, DataService) {
    var current = {
      indices: undefined,
      noeds: undefined,
      clusterName: undefined,
    };

    var processNodeChanges = function(nodes) {
      var joined = difference(nodes, current.nodes);
      var left = difference(current.nodes, nodes);
      if (joined.length > 0) {
        info(joined, ' nodes joined the cluster');
      }
      if (left.length > 0) {
        warn(left, ' nodes left the cluster');
      }
      current.nodes = nodes;
    };

    var processIndicesChanges = function(indices) {
      var created = difference(indices, current.indices);
      var deleted = difference(current.indices, indices);
      if (created.length > 0) {
        info(created, ' indices created');
      }
      if (deleted.length > 0) {
        warn(deleted, ' indices deleted');
      }
      current.indices = indices;
    };

    var process = function() {
      var success = function(data) {
        if (current.clusterName === data.cluster_name) {
          processNodeChanges(data.nodes);
          processIndicesChanges(data.indices);
        } else {
          current.clusterName = data.cluster_name;
          current.indices = data.indices;
          current.nodes = data.nodes;
        }
      };
      DataService.clusterChanges(success, angular.noop);
    };

    var difference = function(set1, set2) {
      return set1.filter(function(s) {
        return set2.indexOf(s) < 0;
      });
    };

    var info = function(elements, text) {
      AlertService.info(elements.length + text, elements.join(',\n'));
    };

    var warn = function(elements, text) {
      AlertService.warn(elements.length + text, elements.join(',\n'));
    };

    $rootScope.$watch(
        function() {
          return RefreshService.lastUpdate();
        },
        function() {
          process();
        },
        true
    );

    return this;
  }]
);

angular.module('cerebro').run(['ClusterChangesService', angular.noop]);
