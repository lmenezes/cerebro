'use strict';

angular.module('cerebro', ['ngRoute']).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/overview', {
          templateUrl: 'overview.html',
          controller: 'OverviewController'
        }).
        when('/connect', {
          templateUrl: 'connect.html',
          controller: 'ConnectController'
        }).
        otherwise({redirectTo: '/connect'});
  }]);

function IndexFilter(name, closed, special, healthy, asc, timestamp) {
  this.name = name;
  this.closed = closed;
  this.special = special;
  this.healthy = healthy;
  this.sort = 'name';
  this.asc = asc;
  this.timestamp = timestamp;

  this.getSorting = function() {
    var asc = this.asc;
    switch (this.sort) {
      case 'name':
        return function(a, b) {
          if (asc) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        };
      default:
        return undefined;
    }
  };

  this.clone = function() {
    return new IndexFilter(
        this.name,
        this.closed,
        this.special,
        this.healthy,
        this.asc,
        this.timestamp
    );
  };

  this.equals = function(other) {
    return (
        other !== null &&
        this.name === other.name &&
        this.closed === other.closed &&
        this.special === other.special &&
        this.healthy === other.healthy &&
        this.asc === other.asc &&
        this.timestamp === other.timestamp
    );
  };

  this.isBlank = function() {
    return (
        !this.name &&
        this.closed &&
        this.special &&
        this.healthy &&
        this.asc
    );
  };

  this.matches = function(index) {
    var matches = true;
    if (!this.special && index.special) {
      matches = false;
    }
    if (!this.closed && index.closed) {
      matches = false;
    }
    // Hide healthy == show unhealthy only
    if (!this.healthy && !index.unhealthy) {
      matches = false;
    }
    if (matches && this.name) {
      try {
        var regExp = new RegExp(this.name.trim(), 'i');
        matches = regExp.test(index.name);
        if (!matches && index.aliases) {
          for (var idx = 0; idx < index.aliases.length; idx++) {
            if ((matches = regExp.test(index.aliases[idx]))) {
              break;
            }
          }
        }
      }
      catch (err) { // if not valid regexp, still try normal matching
        matches = index.name.indexOf(this.name.toLowerCase()) != -1;
        if (!matches) {
          for (var idx = 0; idx < index.aliases.length; idx++) {
            var alias = index.aliases[idx].toLowerCase();
            matches = true;
            if ((matches = (alias.indexOf(this.name.toLowerCase()) != -1))) {
              break;
            }
          }
        }
      }
    }
    return matches;
  };

}

function NodeFilter(name, data, master, client, timestamp) {
  this.name = name;
  this.data = data;
  this.master = master;
  this.client = client;
  this.timestamp = timestamp;

  this.clone = function() {
    return new NodeFilter(this.name, this.data, this.master, this.client);
  };

  this.getSorting = function() {
    return undefined;
  };

  this.equals = function(other) {
    return (
        other !== null &&
        this.name == other.name &&
        this.data == other.data &&
        this.master == other.master &&
        this.client == other.client &&
        this.timestamp == other.timestamp
    );
  };

  this.isBlank = function() {
    return !this.name && (this.data && this.master && this.client);
  };

  this.matches = function(node) {
    if (this.isBlank()) {
      return true;
    } else {
      return this.matchesName(node.name) && this.matchesType(node);
    }
  };

  this.matchesType = function(node) {
    return (
        node.data && this.data ||
        node.master && this.master ||
        node.client && this.client
    );
  };

  this.matchesName = function(name) {
    if (this.name) {
      return name.toLowerCase().indexOf(this.name.toLowerCase()) != -1;
    } else {
      return true;
    }
  };

}

function Page(elements, total, first, last, next, previous) {
    this.elements = elements;
    this.total = total;
    this.first = first;
    this.last = last;
    this.next = next;
    this.previous = previous;
}

function Paginator(page, pageSize, collection, filter) {

    this.filter = filter;

    this.page = page;

    this.pageSize = pageSize;

    this.$collection = collection ? collection : [];

    this.nextPage = function() {
        this.page += 1;
    };

    this.previousPage = function() {
        this.page -= 1;
    };

    this.setPageSize = function(newSize) {
        this.pageSize = newSize;
    };

    this.getPageSize = function() {
        return this.pageSize;
    };

    this.getCurrentPage = function() {
        return this.page;
    };

    this.getPage = function() {
        var results = this.getResults();
        var total = results.length;

        var first = total > 0 ? ((this.page - 1) * this.pageSize) + 1 : 0;
        while (total < first) {
            this.previousPage();
            first = (this.page - 1) * this.pageSize + 1;
        }
        var lastPage = this.page * this.pageSize > total;
        var last = lastPage ? total : this.page * this.pageSize;

        var elements = total > 0 ? results.slice(first - 1, last) : [];

        var next = this.pageSize * this.page < total;
        var previous = this.page > 1;
        while (elements.length < this.pageSize) {
            elements.push(null);
        }
        return new Page(elements, total, first, last, next, previous);
    };

    this.setCollection = function(collection) {
        if (this.filter.getSorting()) {
            this.$collection = collection.sort(this.filter.getSorting());
        } else {
            this.$collection = collection;
        }
    };

    this.getResults = function() {
        var filter = this.filter;
        var collection = this.$collection;
        if (filter.isBlank()) {
            return collection;
        } else {
            var filtered = [];
            collection.forEach(function(item) {
                if (filter.matches(item)) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    };

    this.getCollection = function() {
        return this.$collection;
    };

}

angular.module('cerebro').controller('AlertsController', ['$scope', 'AlertService',
  function($scope, AlertService) {

    $scope.alerts = [];

    $scope.$watch(
        function() {
          return AlertService.alerts;
        },
        function(newValue, oldValue) {
          $scope.alerts = AlertService.alerts;
        }
    );

    $scope.remove = function(id) {
      AlertService.remove(id);
    };

  }

]);

angular.module('cerebro').controller('ConnectController', [
  '$scope', '$location', 'DataService', 'AlertService',
  function($scope, $location, DataService, AlertService) {

    $scope.hosts = undefined;

    $scope.connecting = false;

    $scope.host = undefined;

    DataService.getHosts(
        function(hosts) {
          $scope.hosts = hosts;
        },
        function(error) {

        }
    );

    $scope.connect = function(host) {
      if (host) {
        $scope.connecting = true;
        DataService.setHost(
            host,
            function(response) {
              $location.path("/overview");
              $scope.host = DataService.getHost();
            },
            function(response) {
              $scope.connecting = false;
              AlertService.error("Error connecting to " + host, response);
            }
        );
      }
    };

  }]);

angular.module('cerebro').controller('ModalController', ['$scope', 'ModalService',
  function($scope, ModalService) {

    $scope.service = ModalService;

    $scope.close = function() {
      $scope.service.close();
    };

    $scope.confirm = function() {
      $scope.service.confirm();
    };

  }
]);

angular.module('cerebro').controller('NavbarController', ['PageService', '$scope', '$http', 'DataService',
  function (PageService, $scope, $http, DataService) {

    $scope.status = undefined;
    $scope.cluster_name = undefined;
    $scope.host = undefined;

    $scope.$watch(
        function () {
          return DataService.getData();
        },
        function (data) {
          if (data) {
            $scope.status = data.status;
            $scope.cluster_name = data.cluster_name;
            $scope.host = DataService.getHost();
          } else {
            $scope.status = undefined;
            $scope.cluster_name = undefined;
            $scope.host = undefined;
          }
        }
    );

  }]);

angular.module('cerebro').controller('OverviewController', ['$scope', '$http', '$window', 'DataService', 'AlertService', 'ModalService',
  function ($scope, $http, $window, DataService, AlertService, ModalService) {

    $scope.indices = undefined;
    $scope.nodes = undefined;
    $scope.unassigned_shards = 0;
    $scope.indices_filter = new IndexFilter('', true, false, true, true, 0);
    $scope.nodes_filter = new NodeFilter('', true, false, false, 0);
    $scope.closed_indices = 0;
    $scope.special_indices = 0;
    $scope.expandedView = false;
    $scope.shardAllocation = true;

    $scope.getPageSize = function() {
      return Math.max(Math.round($window.innerWidth / 280), 1);
    };

    $scope.paginator = new Paginator(1, $scope.getPageSize(), [], $scope.indices_filter);

    $scope.page = $scope.paginator.getPage();

    $($window).resize(function() {
      $scope.$apply(function() {
        $scope.paginator.setPageSize($scope.getPageSize());
      });
    });

    $scope.$watch(
        function() {
          return DataService.getData();
        },
        function(data) {
          if (data) {
            $scope.setIndices(data.indices);
            $scope.setNodes(data.nodes);
            $scope.unassigned_shards = data.unassigned_shards;
            $scope.closed_indices = data.closed_indices;
            $scope.special_indices = data.special_indices;
            $scope.shardAllocation = data.shard_allocation;
          } else {
            $scope.indices = undefined;
            $scope.nodes = undefined;
          }
        }
    );

    $scope.$watch('paginator', function() {
      if (DataService.getData()) {
        $scope.setIndices(DataService.getData().indices);
      }
      }, true);

    $scope.setIndices = function(indices) {
      $scope.paginator.setCollection(indices);
      $scope.page = $scope.paginator.getPage();
    };

    $scope.$watch('nodes_filter', function() {
          if (DataService.getData()) {
            $scope.setNodes(DataService.getData().nodes);
          }
        },
        true);

    $scope.setNodes = function(nodes) {
      $scope.nodes = nodes.filter(function(node) {
        return $scope.nodes_filter.matches(node);
      });
    };

    var success = function(data) {
      DataService.forceRefresh();
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

    $scope.optimizeIndex = function(index) {
      ModalService.promptConfirmation(
          'Optimize index ' + index + '?',
          function() {
            DataService.optimizeIndex(index, success, error);
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
            DataService.closeIndex(indices.join(","), success, error);
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
            DataService.openIndex(indices.join(","), success, error);
          }
      );
    };

    $scope.optimizeIndices = function() {
      var indices = $scope.paginator.getResults().map(function(index) {
        return index.name;
      });
      ModalService.promptConfirmation(
          'Optimize all ' + indices.length + ' selected indices?',
          function() {
            DataService.optimizeIndex(indices.join(","), success, error);
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
            DataService.refreshIndex(indices.join(","), success, error);
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
            DataService.clearIndexCache(indices.join(","), success, error);
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
            DataService.deleteIndex(indices.join(","), success, error);
          }
      );
    };

    $scope.shardStats = function(index, node, shard) {
      DataService.getShardStats(index, node, shard, displayInfo, error);
    };

    $scope.nodeStats = function(node) {
      DataService.nodeStats(node, displayInfo, error);
    };

    $scope.getIndexSettings = function (index) {
      DataService.getIndexSettings(index, displayInfo, error);
    };

    $scope.getIndexMapping = function (index) {
      DataService.getIndexMapping(index, displayInfo, error);
    };

    $scope.disableShardAllocation = function () {
      DataService.disableShardAllocation(success, error);
    };

    $scope.enableShardAllocation = function () {
      DataService.enableShardAllocation(success, error);
    };

  }]);

angular.module('cerebro').directive('ngPagination', ['$document', function($document) {

  return {
    scope: {
      paginator: '=paginator',
      page: '=page',
      label: '=label'
    },
    templateUrl: 'pagination.html',
    link: function(scope, element, attrs) {
      var handler = function(event) {
        var $target = $(event.target);
        if ($target.is('input, textarea')) {
          return;
        }
        if (event.keyCode == 39 && scope.page.next) {
          scope.$apply(function() {
            scope.paginator.nextPage();
            event.preventDefault();
          });
        }
        if (event.keyCode == 37 && scope.page.previous) {
          scope.$apply(function() {
            scope.paginator.previousPage();
            event.preventDefault();
          });
        }
      };

      $document.bind('keydown', handler);
      element.on('$destroy', function() {
        $document.unbind('keydown', handler);
      });
    }
  };
}]);

angular.module('cerebro').directive('ngProgress',
    function () {

      return {
        scope: {
          value: '=value',
          max: '=max',
          text: '=text'
        },
        template: function (elem, attrs) {
          return '<span class="detail">{{text}}</span>' +
              '<progress class="progress progress-thin" value="{{value}}" max="{{max}}"' +
              'ng-class="{\'progress-danger\': {{(value / max) > 0.75}}}">' +
              '{{value}}%' +
              '</progress>'
        }
      };
    }
);

angular.module('cerebro').directive('ngShard',
    function () {

      return {
        scope: {
          shard: '=shard'
        },
        template: function (elem, attrs) {
          return '<span class="shard shard-{{shard.state.toLowerCase()}}" ng-class="{\'shard-replica\': !shard.primary && shard.node}">' +
              '<small>{{shard.shard}}</small>' +
              '</span>';
        }
      };
    }
);

angular.module('cerebro').filter('bytes', function() {

    var UNITS = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'];

    function stringify(bytes) {
        if (bytes > 0) {
            var e = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, e)).toFixed(2) + UNITS[e];
        } else {
            return 0 + UNITS[0];
        }
    }

    return function(bytes) {
        return stringify(bytes);
    };

});

var Alert = function(message, response, level, _class, icon) {
  var currentDate = new Date();
  this.message = message;
  this.response = response;
  this.level = level;
  this.class = _class;
  this.icon = icon;
  this.timestamp = currentDate;
  this.id = 'alert_box_' + currentDate.getTime();

  this.hasResponse = function() {
    return this.response;
  };

  this.getResponse = function() {
    if (this.response) {
      return JSON.stringify(this.response, undefined, 2);
    }
  };
};

angular.module('cerebro').factory('AlertService', function() {
  this.maxAlerts = 3;

  this.alerts = [];

  // removes ALL alerts
  this.clear = function() {
    this.alerts.length = 0;
  };

  // remove a particular alert message
  this.remove = function(id) {
    $('#' + id).fadeTo(1000, 0).slideUp(200, function() {
      $(this).remove();
    });
    this.alerts = this.alerts.filter(function(a) {
      return id != a.id;
    });
  };

  // creates an error alert
  this.error = function(msg, resp, timeout) {
    timeout = timeout ? timeout : 7500;
    var alert = new Alert(msg, resp, 'error', 'red', 'fa fa-warning');
    return this.addAlert(alert, timeout);
  };

  // creates an info alert
  this.info = function(msg, resp, timeout) {
    timeout = timeout ? timeout : 2500;
    var alert = new Alert(msg, resp, 'info', 'blue', 'fa fa-info');
    return this.addAlert(alert, timeout);
  };

  // creates success alert
  this.success = function(msg, resp, timeout) {
    timeout = timeout ? timeout : 2500;
    var alert = new Alert(msg, resp, 'success', 'green', 'fa fa-check');
    return this.addAlert(alert, timeout);
  };

  // creates a warn alert
  this.warn = function(msg, resp, timeout) {
    timeout = timeout ? timeout : 5000;
    var alert = new Alert(msg, resp, 'warn', 'yellow', 'fa fa-info');
    return this.addAlert(alert, timeout);
  };

  this.addAlert = function(alert, timeout) {
    this.alerts.unshift(alert);
    var service = this;
    setTimeout(function() {
      service.remove(alert.id);
    }, timeout);
    if (this.alerts.length >= this.maxAlerts) {
      this.alerts.length = 3;
    }
    return alert.id;
  };

  return this;
});

angular.module('cerebro').factory('DataService', function ($rootScope, $timeout, $http, $location) {

  var data = undefined; // current data

  var host = undefined;

  var baseUrl = $location.protocol() + '://' + $location.host() + ':' + $location.port();

  var successfulRefresh = function(success) {
    return function(response) {
      data = response;
      if (success) {
        success(response);
      }
    }
  };

  var failedRefresh = function(error) {
    return function(response) {
      data = undefined;
      if (error) {
        error(response);
      }
    }
  };

  var refresh = function(success, error) {
    if (host) {
      request('/apis/overview', {}, successfulRefresh(success), failedRefresh(error));
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

angular.module('cerebro').factory('ModalService', ['$sce', function ($sce) {

  this.text = undefined;
  this.info = undefined;

  var confirmCallback = undefined;

  this.promptConfirmation = function (body, callback) {
    this.text = body;
    confirmCallback = callback;
  };

  this.showInfo = function (info) {
    this.info = $sce.trustAsHtml(JSONTree.create(info));
  };

  this.close = function() {
    this.clean();
  };

  this.confirm = function() {
    if (confirmCallback) {
      confirmCallback();
    }
    this.clean();
  };

  this.needsConfirmation = function() {
    return confirmCallback ? true : false;
  };

  this.clean = function() {
    this.text = undefined;
    this.info = undefined;
    confirmCallback = undefined;
  };

  return this;
}]);

angular.module('cerebro').factory('PageService', ['DataService', '$rootScope', '$document',
  function (DataService, $rootScope, $document) {

    var link = $document[0].querySelector('link[rel~=\'icon\']');
    var clusterName = undefined;
    var clusterStatus = undefined;

    if (link) {
      var faviconUrl = link.href;
      var img = $document[0].createElement('img');
      img.src = faviconUrl;
    }

    $rootScope.$watch(
        function () {
          return DataService.getData();
        },
        function (data) {
          if (data) {
            setPageTitle(data.cluster_name);
            setFavIconColor(data.status);
          }
        }
    );

    var setPageTitle = function (newClusterName) {
      if (clusterName !== newClusterName) {
        if (newClusterName) {
          clusterName = newClusterName;
          $rootScope.title = 'cerebro[' + clusterName + ']';
        } else {
          clusterName = undefined;
          $rootScope.title = 'cerebro - no connection';
        }
      }
    };

    var setFavIconColor = function(newClusterStatus) {
      if (link && clusterStatus !== newClusterStatus) {
        clusterStatus = newClusterStatus;
        try {
          var colors = {green: '#1AC98E', yellow: '#E4D836', red: '#E64759'};
          var color = clusterStatus ? colors[clusterStatus] : '#222426';
          var canvas = $document[0].createElement('canvas');
          canvas.width = 16;
          canvas.height = 16;
          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          context.globalCompositeOperation = 'source-in';
          context.fillStyle = color;
          context.fillRect(0, 0, 16, 16);
          context.fill();
          link.type = 'image/png';
          link.href = canvas.toDataURL();
        } catch (exception) {
          //
        }
      }
    };

    return this;

  }]);

angular.module('cerebro').controller('StatsController', ['$scope', '$http', 'DataService',
  function ($scope, $http, DataService) {

    $scope.number_of_nodes = undefined;

    $scope.indices = undefined;

    $scope.active_primary_shards = undefined;
    $scope.active_shards = undefined;
    $scope.relocating_shards = undefined;
    $scope.initializing_shards = undefined;
    $scope.unassigned_shards = undefined;
    $scope.total_shards = undefined;

    $scope.docs_count = undefined;

    $scope.size_in_bytes = undefined;

    $scope.cluster_name = undefined;

    $scope.$watch(
        function () {
          return DataService.getData();
        },
        function (data) {
          if (data) {
            $scope.number_of_nodes = data.number_of_nodes;
            $scope.indices = data.indices.length;
            $scope.active_primary_shards = data.active_primary_shards;
            $scope.active_shards = data.active_shards;
            $scope.relocating_shards = data.relocating_shards;
            $scope.initializing_shards = data.initializing_shards;
            $scope.unassigned_shards = data.unassigned_shards;
            $scope.docs_count = data.docs_count;
            $scope.size_in_bytes = data.size_in_bytes;
            $scope.cluster_name = data.cluster_name;

            $scope.total_shards = $scope.active_shards +
                $scope.relocating_shards +
                $scope.initializing_shards +
                $scope.unassigned_shards;
          }
        }
    );

  }]);