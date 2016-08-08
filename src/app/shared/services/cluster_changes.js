angular.module('cerebro').factory('ClusterChangesService', [
  '$rootScope', 'AlertService', 'RefreshService', 'DataService',
  function($rootScope, AlertService, RefreshService, DataService) {

    var indices;
    var nodes;

    var process = function() {
      var successIndices = function(currentIndices) {
        if (indices) {
          var created = difference(currentIndices, indices);
          var deleted = difference(indices, currentIndices);
          if (created.length > 0) {
            info(created, ' indices created');
          }
          if (deleted.length > 0) {
            warn(deleted, ' indices deleted');
          }
        }
        indices = currentIndices;
      };
      DataService.getIndices(successIndices, angular.noop);

      var successNodes = function(currentNodes) {
        if (nodes) {
          var joined = difference(currentNodes, nodes);
          var left = difference(nodes, currentNodes);
          if (joined.length > 0) {
            info(joined, ' nodes joined the cluster');
          }
          if (left.length > 0) {
            warn(left, ' nodes left the cluster');
          }
        }
        nodes = currentNodes;
      };
      DataService.getNodes(successNodes, angular.noop);
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
