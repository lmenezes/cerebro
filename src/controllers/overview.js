angular.module('cerebro').controller('OverviewController', ['$scope', '$http',
  '$window', 'DataService', 'AlertService', 'ModalService', 'RefreshService',
  function($scope, $http, $window, DataService, AlertService, ModalService,
           RefreshService) {

    $scope.data = undefined;

    $scope.indices = undefined;
    $scope.nodes = undefined;
    $scope.unassigned_shards = 0;
    $scope.closed_indices = 0;
    $scope.special_indices = 0;
    $scope.expandedView = false;
    $scope.shardAllocation = true;

    $scope.indices_filter = new IndexFilter('', true, false, true, true, 0);
    $scope.nodes_filter = new NodeFilter('', true, false, false, 0);

    $scope.getPageSize = function() {
      return Math.max(Math.round($window.innerWidth / 280), 1);
    };

    $scope.paginator = new Paginator(
      1,
      $scope.getPageSize(),
      [],
      $scope.indices_filter)
    ;

    $scope.page = $scope.paginator.getPage();

    $($window).resize(function() {
      $scope.$apply(function() {
        $scope.paginator.setPageSize($scope.getPageSize());
      });
    });

    $scope.$watch(
      function() {
        return RefreshService.lastUpdate();
      },
      function() {
        $scope.refresh();
      },
      true
    );

    $scope.refresh = function() {
      DataService.getOverview(
        function(data) {
          $scope.data = data;
          $scope.setIndices(data.indices);
          $scope.setNodes(data.nodes);
          $scope.unassigned_shards = data.unassigned_shards;
          $scope.closed_indices = data.closed_indices;
          $scope.special_indices = data.special_indices;
          $scope.shardAllocation = data.shard_allocation;
        },
        function(error) {
          AlertService.error('Error while loading data', error);
          $scope.data = undefined;
          $scope.indices = undefined;
          $scope.nodes = undefined;
          $scope.unassigned_shards = 0;
          $scope.closed_indices = 0;
          $scope.special_indices = 0;
          $scope.shardAllocation = true;
        }
      );
    };

    $scope.$watch('paginator', function() {
      if ($scope.data) {
        $scope.setIndices($scope.data.indices);
      }
    }, true);

    $scope.setIndices = function(indices) {
      $scope.paginator.setCollection(indices);
      $scope.page = $scope.paginator.getPage();
    };

    $scope.$watch('nodes_filter', function() {
        if ($scope.data) {
          $scope.setNodes($scope.data.nodes);
        }
      },
      true);

    $scope.setNodes = function(nodes) {
      $scope.nodes = nodes.filter(function(node) {
        return $scope.nodes_filter.matches(node);
      });
    };

    var success = function(data) {
      RefreshService.refresh();
      AlertService.success('Operation successfully executed', data);
    };

    var error = function(data) {
      AlertService.error('Operation failed', data);
    };

    var displayInfo = function(info) {
      ModalService.showInfo(info);
    };

    $scope.openIndex = function(index) {
      ModalService.promptConfirmation(
        'Open ' + index + '?',
        function() {
          DataService.openIndex(index, success, error);
        }
      );
    };

    $scope.closeIndex = function(index) {
      ModalService.promptConfirmation(
        'Close ' + index + '?',
        function() {
          DataService.closeIndex(index, success, error);
        }
      );
    };

    $scope.deleteIndex = function(index) {
      ModalService.promptConfirmation(
        'Delete ' + index + '?',
        function() {
          DataService.deleteIndex(index, success, error);
        }
      );
    };

    $scope.clearIndexCache = function(index) {
      ModalService.promptConfirmation(
        'Clear ' + index + ' cache?',
        function() {
          DataService.clearIndexCache(index, success, error);
        }
      );
    };

    $scope.refreshIndex = function(index) {
      ModalService.promptConfirmation(
        'Refresh index ' + index + '?',
        function() {
          DataService.refreshIndex(index, success, error);
        }
      );
    };

    $scope.forceMerge = function(index) {
      ModalService.promptConfirmation(
        'Optimize index ' + index + '?',
        function() {
          DataService.forceMerge(index, success, error);
        }
      );
    };

    // Mass actions

    $scope.closeIndices = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
        'Close all ' + indices.length + ' selected indices?',
        function() {
          DataService.closeIndex(indices.join(','), success, error);
        }
      );
    };

    $scope.openIndices = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
        'Open all ' + indices.length + ' selected indices?',
        function() {
          DataService.openIndex(indices.join(','), success, error);
        }
      );
    };

    $scope.forceMerges = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
        'Optimize all ' + indices.length + ' selected indices?',
        function() {
          DataService.forceMerge(indices.join(','), success, error);
        }
      );
    };

    $scope.refreshIndices = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
        'Refresh all ' + indices.length + ' selected indices?',
        function() {
          DataService.refreshIndex(indices.join(','), success, error);
        }
      );
    };

    $scope.clearIndicesCache = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
        'Clear all ' + indices.length + ' selected indices cache?',
        function() {
          DataService.clearIndexCache(indices.join(','), success, error);
        }
      );
    };

    $scope.deleteIndices = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
        'Delete all ' + indices.length + ' selected indices?',
        function() {
          DataService.deleteIndex(indices.join(','), success, error);
        }
      );
    };

    $scope.shardStats = function(index, node, shard) {
      DataService.getShardStats(index, node, shard, displayInfo, error);
    };

    $scope.nodeStats = function(node) {
      DataService.nodeStats(node, displayInfo, error);
    };

    $scope.getIndexSettings = function(index) {
      DataService.getIndexSettings(index, displayInfo, error);
    };

    $scope.getIndexMapping = function(index) {
      DataService.getIndexMapping(index, displayInfo, error);
    };

    $scope.disableShardAllocation = function() {
      DataService.disableShardAllocation(success, error);
    };

    $scope.enableShardAllocation = function() {
      DataService.enableShardAllocation(success, error);
    };

  }]);
