angular.module('cerebro').controller('OverviewController', ['$scope', '$http',
  '$window', '$location', 'OverviewDataService', 'AlertService', 'ModalService',
  'RefreshService',
  function($scope, $http, $window, $location, OverviewDataService, AlertService,
      ModalService, RefreshService) {
    $scope.data = undefined;

    $scope.indices = undefined;
    $scope.nodes = undefined;
    $scope.unassigned_shards = 0;
    $scope.relocating_shards = 0;
    $scope.initializing_shards = 0;
    $scope.closed_indices = 0;
    $scope.special_indices = 0;
    $scope.shardAllocation = true;

    $scope.indices_filter = new IndexFilter('', false, false, true, true, 0);
    $scope.nodes_filter = new NodeFilter('', true, false, false, false, 0);

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
      OverviewDataService.getOverview(
          function(data) {
            $scope.data = data;
            $scope.setIndices(data.indices);
            $scope.setNodes(data.nodes);
            $scope.unassigned_shards = data.unassigned_shards;
            $scope.relocating_shards = data.relocating_shards;
            $scope.initializing_shards = data.initializing_shards;
            $scope.closed_indices = data.closed_indices;
            $scope.special_indices = data.special_indices;
            $scope.shardAllocation = data.shard_allocation;
            if (!$scope.unassigned_shards &&
            !$scope.relocating_shards &&
            !$scope.initializing_shards) {
              $scope.indices_filter.healthy = true;
            }
          },
          function(error) {
            AlertService.error('Error while loading data', error);
            $scope.data = undefined;
            $scope.indices = undefined;
            $scope.nodes = undefined;
            $scope.unassigned_shards = 0;
            $scope.relocating_shards = 0;
            $scope.initializing_shards = 0;
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
            OverviewDataService.openIndex(index, success, error);
          }
      );
    };

    $scope.closeIndex = function(index) {
      ModalService.promptConfirmation(
          'Close ' + index + '?',
          function() {
            OverviewDataService.closeIndex(index, success, error);
          }
      );
    };

    $scope.deleteIndex = function(index) {
      ModalService.promptConfirmation(
          'Delete ' + index + '?',
          function() {
            OverviewDataService.deleteIndex(index, success, error);
          }
      );
    };

    $scope.clearIndexCache = function(index) {
      ModalService.promptConfirmation(
          'Clear ' + index + ' cache?',
          function() {
            OverviewDataService.clearIndexCache(index, success, error);
          }
      );
    };

    $scope.refreshIndex = function(index) {
      ModalService.promptConfirmation(
          'Refresh index ' + index + '?',
          function() {
            OverviewDataService.refreshIndex(index, success, error);
          }
      );
    };

    $scope.flushIndex = function(index) {
      ModalService.promptConfirmation(
          'Flush index ' + index + '?',
          function() {
            OverviewDataService.flushIndex(index, success, error);
          }
      );
    };

    $scope.forceMerge = function(index) {
      ModalService.promptConfirmation(
          'Optimize index ' + index + '?',
          function() {
            OverviewDataService.forceMerge(index, success, error);
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
            OverviewDataService.closeIndex(indices.join(','), success, error);
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
            OverviewDataService.openIndex(indices.join(','), success, error);
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
            OverviewDataService.forceMerge(indices.join(','), success, error);
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
            OverviewDataService.refreshIndex(indices.join(','), success, error);
          }
      );
    };

    $scope.flushIndices = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
          'Flush all ' + indices.length + ' selected indices?',
          function() {
            OverviewDataService.flushIndex(indices.join(','), success, error);
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
            OverviewDataService.clearIndexCache(
                indices.join(','), success, error
            );
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
            OverviewDataService.deleteIndex(indices.join(','), success, error);
          }
      );
    };

    $scope.shardStats = function(index, node, shard) {
      OverviewDataService.getShardStats(index, node, shard, displayInfo, error);
    };

    $scope.nodeStats = function(node) {
      OverviewDataService.nodeStats(node, displayInfo, error);
    };

    $scope.indexStats = function(index) {
      OverviewDataService.indexStats(index, displayInfo, error);
    };

    $scope.getIndexSettings = function(index) {
      OverviewDataService.getIndexSettings(index, displayInfo, error);
    };

    $scope.getIndexMapping = function(index) {
      OverviewDataService.getIndexMapping(index, displayInfo, error);
    };

    $scope.disableShardAllocation = function(kind) {
      OverviewDataService.disableShardAllocation(kind, success, error);
    };

    $scope.enableShardAllocation = function() {
      OverviewDataService.enableShardAllocation(success, error);
    };

    $scope.showIndexSettings = function(index) {
      $location.path('index_settings').search('index', index);
    };

    $scope.select = function(shard) {
      $scope.relocatingShard = shard;
    };

    $scope.relocateShard = function(node) {
      var s = $scope.relocatingShard;
      OverviewDataService.relocateShard(s.shard, s.index, s.node, node.id,
          function(response) {
            $scope.relocatingShard = undefined;
            RefreshService.refresh();
            AlertService.info('Relocation successfully started', response);
          },
          function(error) {
            AlertService.error('Error while starting relocation', error);
          }
      );
    };

    $scope.isSelected = function(shard) {
      var relocating = $scope.relocatingShard;
      return relocating && shard.index === relocating.index &&
        shard.node === relocating.node && shard.shard === relocating.shard;
    };

    $scope.canReceiveShard = function(index, node) {
      var shard = $scope.relocatingShard;
      if (shard && index) { // in case num indices < num columns
        if (shard.node !== node.id && shard.index === index.name) {
          var shards = index.shards[node.id];
          if (shards) {
            var sameShard = function(s) {
              return s.shard === shard.shard;
            };
            if (shards.filter(sameShard).length === 0) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
      return false;
    };
  }]);
