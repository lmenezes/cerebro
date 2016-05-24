'use strict';
angular.module('cerebro', ['ngRoute', 'ngAnimate', 'ui.bootstrap']).config(['$routeProvider',
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
        when('/rest', {
            templateUrl: 'rest.html',
            controller: 'RestController'
        }).
        otherwise({redirectTo: '/connect'});
  }]);

function AceEditor(target) {
    // ace editor
    ace.config.set('basePath', '/');
    this.editor = ace.edit(target);
    this.editor.setFontSize('10px');
    this.editor.setTheme('ace/theme/cerebro');
    this.editor.getSession().setMode('ace/mode/json');
    this.editor.setOptions({
        fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
        fontSize: '12px',
        fontWeight: '400'
    });

    // validation error
    this.error = null;

    // sets value and moves cursor to beggining
    this.setValue = function(value) {
        this.editor.setValue(value, 1);
        this.editor.gotoLine(0, 0, false);
    };

    this.getValue = function() {
        return this.editor.getValue();
    };

    // formats the json content
    this.format = function() {
        var content = this.editor.getValue();
        try {
            if (content && content.trim().length > 0) {
                this.error = null;
                content = JSON.stringify(JSON.parse(content), undefined, 2);
                this.editor.setValue(content, 0);
                this.editor.gotoLine(0, 0, false);
            }
        } catch (error) {
            this.error = error.toString();
        }
        return content;
    };

    this.hasContent = function() {
        return this.editor.getValue().trim().length > 0;
    };
}

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

function Request(path, method, body) {

    this.path = path;

    this.method = method;

    this.body = body;

}

function URLAutocomplete(mappings) {

    var PATHS = [
        // Suggest
        '_suggest',
        '{index}/_suggest',
        // Multi Search
        '_msearch',
        '{index}/_msearch',
        '{index}/{type}/_msearch',
        '_msearch/template',
        '{index}/_msearch/template',
        '{index}/{type}/_msearch/template',
        // Search
        '_search',
        '{index}/_search',
        '{index}/{type}/_search',
        '_search/template',
        '{index}/_search/template',
        '{index}/{type}/_search/template',
        '_search/exists',
        '{index}/_search/exists',
        '{index}/{type}/_search/exists'
    ];

    var format = function(previousTokens, suggestedToken) {
        if (previousTokens.length > 1) {
            var prefix = previousTokens.slice(0, -1).join('/');
            if (prefix.length > 0) {
                return prefix + '/' + suggestedToken;
            } else {
                return suggestedToken;
            }
        } else {
            return suggestedToken;
        }
    };

    this.getAlternatives = function(path) {
        var pathTokens = path.split('/');
        var suggestedTokenIndex = pathTokens.length - 1;

        /**
         * Replaces the variables on suggestedPathTokens({index}, {type}...) for
         * actual values extracted from pathTokens
         * @param {Array} pathTokens tokens for the path to be suggested
         * @param {Array} suggestedPathTokens tokens for the suggested path
         * @returns {Array} a new array with the variables from suggestedPathTokens
         * replaced by the actual values from pathTokens
         */
        var replaceVariables = function(pathTokens, suggestedPathTokens) {
            var replaced = suggestedPathTokens.map(function(token, position) {
                if (position < pathTokens.length - 1 && token.indexOf('{') === 0) {
                    return pathTokens[position];
                } else {
                    return token;
                }
            });
            return replaced;
        };

        /**
         * Checks if a given path matches the definition and current state of
         * the path to be autocompleted
         *
         * @param {Array} pathTokens tokens of path to be autocompleted
         * @param {Array} suggestedPathTokens tokens of possible suggestion
         * @returns {boolean} if suggestion is valid
         */
        var isValidSuggestion = function(pathTokens, suggestedPathTokens) {
            var valid = true;
            suggestedPathTokens.forEach(function(token, index) {
                if (valid && index < pathTokens.length - 1) {
                    switch (token) {
                        case '{index}':
                            valid = Object.keys(mappings).indexOf(pathTokens[index]) >= 0;
                            break;
                        case '{type}':
                            valid = mappings[pathTokens[index - 1]]["types"].indexOf(pathTokens[index]) >= 0;
                            break;
                        default:
                            valid = pathTokens[index] === token;
                    }
                }
            });
            return valid;
        };

        var alternatives = [];

        var addIfNotPresent = function(collection, element) {
            if (collection.indexOf(element) === -1) {
                collection.push(element);
            }
        };

        PATHS.forEach(function(suggestedPath) {
            var suggestedPathTokens = suggestedPath.split('/');
            if (suggestedPathTokens.length > suggestedTokenIndex &&
                isValidSuggestion(pathTokens, suggestedPathTokens)) {
                suggestedPathTokens = replaceVariables(
                    pathTokens,
                    suggestedPathTokens
                );
                var suggestedToken = suggestedPathTokens[suggestedTokenIndex];
                switch (suggestedToken) {
                    case '{index}':
                        Object.keys(mappings).forEach(function(index) {
                            addIfNotPresent(alternatives, format(pathTokens, index));
                        });
                        break;
                    case '{type}':
                        var pathIndex = pathTokens[suggestedTokenIndex - 1];
                        mappings[pathIndex]["types"].forEach(function(type) {
                            addIfNotPresent(alternatives, format(pathTokens, type));
                        });
                        break;
                    default:
                        addIfNotPresent(alternatives, format(pathTokens, suggestedToken));
                }
            }
        });

        return alternatives.sort(function(a, b) {
            return a.localeCompare(b);
        });
    };

    return this;

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

angular.module('cerebro').controller('NavbarController', ['$scope', '$http', 'PageService', 'DataService',
  function ($scope, $http, PageService, DataService) {

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

angular.module('cerebro').controller('RestController', ['$scope', '$http', '$sce', 'DataService', 'AlertService',
    'ModalService', 'AceEditorService',
    function ($scope, $http, $sce, DataService, AlertService, ModalService, AceEditorService) {

        $scope.editor = undefined;
        $scope.response = undefined;

        $scope.mappings = undefined;

        $scope.method = "POST";
        $scope.path = "";
        $scope.options = [];

        var success = function(response) {
            $scope.response = $sce.trustAsHtml(JSONTree.create(response));
        };

        var failure = function(response) {
            $scope.response = $sce.trustAsHtml(JSONTree.create(response));
        };

        $scope.execute = function() {
            var data = $scope.editor.getValue();
            $scope.response = undefined;
            DataService.execute($scope.method, $scope.path, data, success, failure);
        };

        $scope.initializeController = function() {
            $scope.editor = AceEditorService.init('rest-client-editor');
            $scope.editor.setValue("{}");
            DataService.getClusterMapping(
                function(response) {
                    $scope.mappings = response;
                    $scope.updateOptions($scope.path);
                },
                function(error) {
                    AlertService.error('Error while loading cluster mappings', error);
                }
            );
        };

        $scope.updateOptions = function(text) {
            if ($scope.mappings) {
                $scope.options = new URLAutocomplete($scope.mappings).getAlternatives(text);
            }
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
          return '<span class="detail"><small>{{text}}</small></span>' +
                  '<div class="progress progress-thin">' +
              '<div class="progress-bar-info" style="width: {{value}}%"' +
              'ng-class="{\'progress-bar-danger\': {{(value / max) > 0.75}}}">' +
              '{{value}}%' +
              '</div></div>'
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

angular.module('cerebro').filter('startsWith', function() {

    console.log("created!");

    function strStartsWith(str, prefix) {
        return (str + '').indexOf(prefix) === 0;
    }

    return function(elements, prefix) {
        console.log("filtering...");
        var filtered = [];
        angular.forEach(elements, function(element) {
            if (strStartsWith(element, prefix)) {
                filtered.push(element);
            }
        });
        console.log("filtered!!");
        console.log(filtered);
        return filtered;
    };
});

angular.module('cerebro').factory('AceEditorService', function() {

    this.init = function(name) {
        return new AceEditor(name);
    };

    return this;
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
    var alert = new Alert(msg, resp, 'error', 'alert-danger', 'fa fa-warning');
    return this.addAlert(alert, timeout);
  };

  // creates an info alert
  this.info = function(msg, resp, timeout) {
    timeout = timeout ? timeout : 2500;
    var alert = new Alert(msg, resp, 'info', 'alert-info', 'fa fa-info');
    return this.addAlert(alert, timeout);
  };

  // creates success alert
  this.success = function(msg, resp, timeout) {
    timeout = timeout ? timeout : 2500;
    var alert = new Alert(msg, resp, 'success', 'alert-success', 'fa fa-check');
    return this.addAlert(alert, timeout);
  };

  // creates a warn alert
  this.warn = function(msg, resp, timeout) {
    timeout = timeout ? timeout : 5000;
    var alert = new Alert(msg, resp, 'warn', 'alert-warning', 'fa fa-info');
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

  this.getClusterMapping = function(success, error) {
    request('/apis/get_cluster_mapping', {}, success, error);
  };

  this.execute = function(method, path, data, success, error) {
    var requestData = {method: method, data: data, path: path};
    request('/apis/rest', requestData, success, error);
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