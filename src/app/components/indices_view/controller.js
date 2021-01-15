angular.module('cerebro').controller('IndicesController', ['$scope',
  'IndicesDataService', 'AlertService', 'RefreshService', 'OverviewDataService',
  function($scope, IndicesDataService, AlertService, RefreshService, OverviewDataService) {
    $scope.paginator = new Paginator(1, 20, [],
        new IndicesFilter(''));
    $scope.$watch('paginator', function(filter, previous) {
      $scope.page = $scope.paginator.getPage();
    }, true);

    $scope._indices = undefined; // keeps unfiltered list of nodes
    $scope.indices = undefined;

    $scope.sortBy = 'totalSize';
    $scope.reverse = true;
    $scope.data = undefined;
    $scope.merge = true;
    $scope.special = false;

    $scope.pattern = '[^a-z]+$';

    $scope.$watch(
        function() {
          return RefreshService.lastUpdate();
        },
        function() {
          $scope.refresh();
        },
        true
    );

    $scope.$watch('paginator', function() {
      $scope.page = $scope.paginator.getPage();
    },
    true);
    $scope.$watch('merge', function() {
      $scope.paginator.setCollection($scope.refreshMergeIndices());
      $scope.page = $scope.paginator.getPage();
    },
    true);
    $scope.$watch('special', function() {
      $scope.paginator.setCollection($scope.refreshMergeIndices());
      $scope.page = $scope.paginator.getPage();
    },
    true);

    $scope.refreshMergeIndices = function() {
      var arr;
      if ($scope.merge) {
        arr = $scope.mergetIndexName($scope._indices, $scope.pattern);
      } else {
        arr = $scope.reBuildOriginData($scope._indices);
      }
      arr.sort(function(v1, v2) {
        var number;
        if (typeof v1[$scope.sortBy] !== 'string' || typeof v2[$scope.sortBy] !== 'string') {
          number = (v1[$scope.sortBy] < v2[$scope.sortBy]) ? -1 : 1;
        } else {
          number = v1.index.localeCompare(v2.index);
        }
        if ($scope.reverse) {
          return 0 - number;
        } else {
          return number;
        }
      });
      if (!$scope.special) {
        var result = arr.filter(function(value) {
          return !value.index.startsWith('.');
        });
        return result;
      }
      return arr;
    };
    $scope.setSortBy = function(field) {
      if ($scope.sortBy === field) {
        $scope.reverse = !$scope.reverse;
      }
      $scope.sortBy = field;
      $scope.paginator = new Paginator(1, 20, $scope.refreshMergeIndices(),
          new IndicesFilter($scope.paginator.filter.index));
      $scope.page = $scope.paginator.getPage();
    };

    $scope.setindices = function(indices) {
      $scope._indices = indices;
    };

    $scope.refresh = function() {
      OverviewDataService.getOverview(
          function(data) {
            $scope.data = data;
          },
          function(error) {
            AlertService.error('Error while loading data', error);
            $scope.data = undefined;
          }
      );
      IndicesDataService.load(
          function(data) {
            $scope.setindices(data.indices);
            $scope.paginator.setCollection($scope.refreshMergeIndices());
            $scope.page = $scope.paginator.getPage();
          },
          function(error) {
            $scope.setindices(undefined);
            AlertService.error('Error while loading nodes data', error);
          }
      );
    };
    $scope.mergetIndexName = function(tempData, pattern) {
      var resultDataArray = [];
      var map = new Map();
      var regx = new RegExp(pattern);
      for (var key in tempData) {
        if (tempData.hasOwnProperty(key)) {
          var result = regx.exec(key);
          var prefix = '';
          if (result != null && result.index > 0) {
            prefix = key.substring(0, result.index);
          } else {
            prefix = key;
          }
          if (map.has(prefix)) {
            var temp = map.get(prefix);
            temp.push(tempData[key]);
            map.set(prefix, temp);
          } else {
            var temp1 = [];
            temp1.push(tempData[key]);
            map.set(prefix, temp1);
          }
        }
      }
      map.forEach(function(value, key) {
        var size = 0;
        var totalDocs = 0;
        var primariesSize = 0;
        var primariesDocs = 0;
        var search = 0;
        var get = 0;
        var query = 0;
        for (var i = 0, len = value.length; i < len; i++) {
          var data = value[i];
          var indexSize = data.total.store.size_in_bytes;
          size = size + indexSize;
          totalDocs = totalDocs + data.total.docs.count;
          primariesSize = primariesSize + data.primaries.store.size_in_bytes;
          primariesDocs = primariesDocs + data.primaries.docs.count;
          search = search + data.total.search.query_total;
          get = get + data.total.get.total;
          query = query + data.total.query_cache.total_count;
        }
        var obj = {
          index: key + '*(' + value.length + ')',
          totalSize: size,
          totalDocs: totalDocs,
          primariesSize: primariesSize,
          primariesDocs: primariesDocs,
          searchCount: search,
          getCount: get,
          queryCount: query,
        };
        resultDataArray.push(obj);
      });

      return resultDataArray;
    };
    $scope.reBuildOriginData = function(orignData) {
      var arr1 = [];
      for (var key in orignData) {
        if (orignData.hasOwnProperty(key)) {
          var element = orignData[key];
          var obj = {
            index: key,
            totalSize: element.total.store.size_in_bytes,
            totalDocs: element.total.docs.count,
            primariesSize: element.primaries.store.size_in_bytes,
            primariesDocs: element.primaries.docs.count,
            searchCount: element.total.search.query_total,
            getCount: element.total.get.total,
            queryCount: element.total.query_cache.total_count,
          };
          arr1.push(obj);
        }
      }
      return arr1;
    };
    $scope.formatBytes = function(size) {
      if (size == undefined) {
        return '';
      }
      var kb = 1024;
      var mb = 1024 * 1024;
      var gb = 1024 * 1024 * 1024;
      var tb = 1024 * 1024 * 1024 * 1024;
      if (size > tb) {
        size = (size / tb).toFixed(2) + ' TB';
      } else if (size > gb) {
        size = (size / gb).toFixed(2) + ' GB';
      } else if (size > mb) {
        size = (size / mb).toFixed(2) + ' MB';
      } else {
        size = (size / kb).toFixed(2) + ' KB';
      }
      return size;
    };
    $scope.renderNum = function(numValue) {
      if (numValue == undefined) {
        return '';
      }
      var num = (numValue || 0).toString();
      var result = '';
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) {
        result = num + result;
      }
      return result;
    };
  }]
);
