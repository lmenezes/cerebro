'use strict';
angular.module('cerebro', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/overview', {
          templateUrl: 'overview.html',
          controller: 'OverviewController'
        })
        .when('/connect', {
          templateUrl: 'connect.html',
          controller: 'ConnectController'
        })
        .when('/rest', {
          templateUrl: 'rest.html',
          controller: 'RestController'
        })
        .when('/aliases', {
          templateUrl: 'aliases.html',
          controller: 'AliasesController'
        })
        .when('/create', {
          templateUrl: 'create_index.html',
          controller: 'CreateIndexController'
        })
        .when('/analysis', {
          templateUrl: 'analysis/index.html',
          controller: 'AnalysisController'
        })
        .when('/templates', {
          templateUrl: 'templates/index.html',
          controller: 'TemplatesController'
        })
        .when('/cluster_settings', {
          templateUrl: 'cluster_settings/index.html',
          controller: 'ClusterSettingsController'
        })
        .when('/index_settings', {
          templateUrl: 'index_settings/index.html',
          controller: 'IndexSettingsController'
        })
        .otherwise({
            redirectTo: '/connect'
          }
        );
    }
  ]);

angular.module('cerebro').controller('AlertsController', ['$scope',
  'AlertService', function($scope, AlertService) {

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

angular.module('cerebro').controller('AliasesController', ['$scope',
  'AlertService', 'AceEditorService', 'DataService', 'RefreshService',
  function($scope, AlertService, AceEditorService, DataService,
           RefreshService) {

    $scope.editor = undefined;

    $scope.paginator = new Paginator(1, 15, [], new AliasFilter('', ''));
    $scope.page = $scope.paginator.getPage();

    $scope.new_alias = new Alias('', '', '', '', '');
    $scope.displayAliasFilter = false;

    $scope.changes = [];

    $scope.$watch('paginator', function(filter, previous) {
      $scope.page = $scope.paginator.getPage();
    }, true);

    $scope.initEditor = function() {
      if (!$scope.editor) {
        $scope.editor = AceEditorService.init('alias-filter-editor');
      }
    };

    $scope.addAlias = function() {
      try {
        var alias = $scope.new_alias;
        alias.filter = $scope.editor.getValue();
        try {
          alias.validate();
          $scope.new_alias = new Alias('', '', '', '', '');
          $scope.changes.push({add: alias.toJson()});
        } catch (error) {
          AlertService.error(error);
        }
      } catch (error) {
        AlertService.error('Malformed filter', error);
      }
    };

    $scope.removeIndexAlias = function(alias) {
      alias.removed = true;
      $scope.changes.push({remove: alias});
    };

    $scope.saveChanges = function() {
      var success = function(body) {
        $scope.changes = [];
        $scope.loadAliases();
        AlertService.success('Aliases successfully updated', body);
      };
      var error = function(body) {
        AlertService.error('Error while updating aliases', body);
      };
      DataService.updateAliases($scope.changes, success, error);
    };

    $scope.loadAliases = function() {
      DataService.getAliases(
        function(aliases) {
          $scope.paginator.setCollection(aliases);
          $scope.page = $scope.paginator.getPage();
        },
        function(error) {
          AlertService.error('Error while fetching aliases', error);
        }
      );
    };

    $scope.loadIndices = function() {
      DataService.getIndices(
        function(indices) {
          $scope.indices = indices;
        },
        function(error) {
          AlertService.error('Error loading indices', error);
        }
      );
    };

    $scope.setup = function() {
      $scope.loadIndices();
      $scope.loadAliases();
      $scope.initEditor();
    };

    $scope.revertChange = function(change, position) {
      if (change.remove) {
        change.remove.removed = false;
      }
      $scope.changes.splice(position, 1);
    };
  }
]);

angular.module('cerebro').controller('AnalysisController', ['$scope',
  '$location', '$timeout', 'AlertService', 'DataService',
  function($scope, $location, $timeout, AlertService, DataService) {

    $scope.analyzerAnalysis = {index: undefined, analyzer: undefined};
    $scope.propertyAnalysis = {index: undefined, field: undefined};

    $scope.indices = [];
    $scope.fields = [];
    $scope.analyzers = [];

    $scope.loadAnalyzers = function(index) {
      DataService.getIndexAnalyzers(index,
        function(analyzers) {
          $scope.analyzers = analyzers;
        },
        function(error) {
          $scope.analyzers = [];
          AlertService.error('Error loading index analyzers', error);
        }
      );
    };

    $scope.loadFields = function(index) {
      DataService.getIndexFields(index,
        function(fields) {
          $scope.fields = fields;
        },
        function(error) {
          $scope.fields = [];
          AlertService.error('Error loading index fields', error);
        }
      );
    };

    $scope.analyzeByField = function(index, field, text) {
      if (text && field && text) {
        $scope.field_tokens = undefined;
        var success = function(response) {
          $scope.field_tokens = response;
        };
        var error = function(error) {
          AlertService.error('Error analyzing text by field', error);
        };
        DataService.analyzeByField(index, field, text, success, error);
      }
    };

    $scope.analyzeByAnalyzer = function(index, analyzer, text) {
      if (text && analyzer && text) {
        $scope.analyzer_tokens = undefined;
        var success = function(response) {
          $scope.analyzer_tokens = response;
        };
        var error = function(error) {
          AlertService.error('Error analyzing text by analyzer', error);
        };
        DataService.analyzeByAnalyzer(index, analyzer, text, success, error);
      }
    };

    $scope.setup = function() {
      DataService.getOpenIndices(
        function(indices) {
          $scope.indices = indices;
        },
        function(error) {
          AlertService.error('Error loading indices', error);
        }
      );
    };

  }
]);

angular.module('cerebro').directive('analysisTokens', function() {
  return {
    scope: {
      tokens: '=tokens'
    },
    templateUrl: 'analysis/tokens.html'
  };
});

angular.module('cerebro').directive('clusterSetting', function() {
  return {
    restrict: 'EA',
    scope: {
      'set': '&',
      'property': '=',
      'settings': '='
    },
    templateUrl: 'cluster_settings/cluster_setting.html'
  };
});

angular.module('cerebro').controller('ClusterSettingsController', ['$scope',
  'ClusterSettingsDataService', 'AlertService',
  function($scope, ClusterSettingsDataService, AlertService) {

    $scope.originalSettings = undefined;
    $scope.settings = undefined;
    $scope.changes = undefined;
    $scope.pendingChanges = 0;

    $scope.set = function(property) {
      var value = $scope.settings[property];
      if (value) {
        if ($scope.changes[property]) {
          $scope.changes[property].value = value;
        } else {
          $scope.changes[property] = {value: value, transient: true};
          $scope.pendingChanges += 1;
        }
      } else {
        $scope.removeChange(property);
      }
    };

    $scope.removeChange = function(property) {
      if ($scope.changes[property]) {
        $scope.pendingChanges -= 1;
        delete $scope.changes[property];
      }
    };

    $scope.revert = function(property) {
      $scope.settings[property] = $scope.originalSettings[property];
      $scope.removeChange(property);
    };

    $scope.save = function() {
      var settings = {transient: {}, persistent: {}};
      angular.forEach($scope.changes, function(value, property) {
        if (value.value) {
          var settingType = value.transient ? 'transient' : 'persistent';
          settings[settingType][property] = value.value;
        }
      });
      ClusterSettingsDataService.saveSettings(settings,
        function(response) {
          AlertService.info('Settings successfully saved', response);
          $scope.setup();
        },
        function(error) {
          AlertService.error('Error while saving settings', error);
        }
      );
    };

    $scope.setup = function() {
      $scope.settings = {};
      $scope.originalSettings = {};
      $scope.changes = {};
      $scope.pendingChanges = 0;
      ClusterSettingsDataService.getClusterSettings(
        function(response) {
          ['persistent', 'transient', 'defaults'].forEach(function(group) {
            angular.forEach(response[group], function(value, property) {
              $scope.settings[property] = value;
              $scope.originalSettings[property] = value;
            });
          });
        },
        function(error) {
          AlertService.error('Error loading cluster settings', error);
        }
      );
    };
  }
]);

angular.module('cerebro').factory('ClusterSettingsDataService', ['DataService',
  function(DataService) {

    this.getClusterSettings = function(success, error) {
      DataService.send('/cluster_settings', {}, success, error);
    };

    this.saveSettings = function(settings, success, error) {
      var body = {settings: settings};
      DataService.send('/cluster_settings/save', body, success, error);
    };

    return this;

  }
]);

angular.module('cerebro').controller('ConnectController', [
  '$scope', '$location', 'DataService', 'AlertService',
  function($scope, $location, DataService, AlertService) {

    $scope.hosts = undefined;

    $scope.connecting = false;

    $scope.setup = function() {
      DataService.getHosts(
        function(hosts) {
          $scope.hosts = hosts;
        },
        function(error) {
          AlertService.error('Error while fetching list of known hosts', error);
        }
      );
    };

    $scope.connect = function(host, username, password) {
      if (host) {
        $scope.connecting = true;
        DataService.setHost(host, username, password);
        $location.path('/overview');
      }
    };

  }]);

angular.module('cerebro').controller('CreateIndexController', ['$scope',
  'AlertService', 'DataService', 'AceEditorService', 'RefreshService',
  function($scope, AlertService, DataService, AceEditorService,
           RefreshService) {

    $scope.editor = undefined;
    $scope.shards = '';
    $scope.replicas = '';
    $scope.name = '';
    $scope.indices = undefined;

    $scope.setup = function() {
      if (!$scope.editor) {
        $scope.editor = AceEditorService.init('index-settings');
      }
      DataService.getIndices(
        function(indices) {
          $scope.indices = indices;
        },
        function(error) {
          AlertService.error('Error loading indices', error);
        }
      );
    };

    $scope.loadIndexMetadata = function(index) {
      DataService.getIndexMetadata(index,
        function(meta) {
          var body = {settings: meta.settings, mappings: meta.mappings};
          $scope.editor.setValue(JSON.stringify(body, null, 2));
        },
        function(error) {
          AlertService.error('Error while loading index settings', error);
        }
      );
    };

    $scope.createIndex = function() {
      if ($scope.name.trim()) {
        try {
          var data = $scope.editor.getValue() || {};
          if (Object.keys(data).length === 0) {
            data = {settings: {index: {}}};
            if ($scope.shards.trim()) {
              data.settings.index.number_of_shards = $scope.shards;
            }
            if ($scope.replicas.trim()) {
              data.settings.index.number_of_replicas = $scope.replicas;
            }
          }
          DataService.createIndex($scope.name, data,
            function(response) {
              RefreshService.refresh();
              AlertService.success('Index successfully created');
            },
            function(error) {
              AlertService.error('Error while creating index', error);
            }
          );
        } catch (error) {
          AlertService.error('Malformed settings', error);
        }
      } else {
        AlertService.error('You must specify a valid index name');
      }
    };

  }
]);

angular.module('cerebro').controller('IndexSettingsController', ['$scope',
  '$location', 'IndexSettingsDataService', 'AlertService',
  function($scope, $location, IndexSettingsDataService, AlertService) {

    $scope.originalSettings = undefined;
    $scope.settings = undefined;
    $scope.changes = undefined;
    $scope.pendingChanges = 0;
    $scope.index = $location.search().index;

    $scope.set = function(property) {
      var value = $scope.settings[property];
      if (value) {
        if (!$scope.changes[property]) {
          $scope.pendingChanges += 1;
        }
        $scope.changes[property] = value;
      } else {
        $scope.removeChange(property);
      }
    };

    $scope.removeChange = function(property) {
      if ($scope.changes[property]) {
        $scope.pendingChanges -= 1;
        delete $scope.changes[property];
      }
    };

    $scope.revert = function(property) {
      $scope.settings[property] = $scope.originalSettings[property];
      $scope.removeChange(property);
    };

    $scope.save = function() {
      IndexSettingsDataService.update(
        $scope.index,
        $scope.changes,
        function(response) {
          AlertService.info('Settings successfully saved', response);
          $scope.setup();
        },
        function(error) {
          AlertService.error('Error while saving settings', error);
        }
      );
    };

    $scope.setup = function() {
      $scope.settings = {};
      $scope.originalSettings = {};
      $scope.changes = {};
      $scope.pendingChanges = 0;
      var loadSetting = function(value, property) {
        $scope.settings[property] = value;
        $scope.originalSettings[property] = value;
      };

      IndexSettingsDataService.get(
        $scope.index,
        function(response) {
          angular.forEach(response[$scope.index].settings, loadSetting);
          angular.forEach(response[$scope.index].defaults, loadSetting);
        },
        function(error) {
          AlertService.error('Error loading index settings', error);
        }
      );
    };
  }
]);

angular.module('cerebro').factory('IndexSettingsDataService', ['DataService',
  function(DataService) {

    this.get = function(index, success, error) {
      DataService.send('/index_settings', {index: index}, success, error);
    };

    this.update = function(index, settings, success, error) {
      var body = {index: index, settings: settings};
      DataService.send('/index_settings/update', body, success, error);
    };

    return this;
  }
]);

angular.module('cerebro').controller('ModalController', ['$scope',
  'ModalService', function($scope, ModalService) {

    $scope.service = ModalService;

    $scope.close = function() {
      $scope.service.close();
    };

    $scope.confirm = function() {
      $scope.service.confirm();
    };

  }
]);

angular.module('cerebro').controller('NavbarController', ['$scope', '$http',
  'PageService', 'DataService', 'RefreshService',
  function($scope, $http, PageService, DataService, RefreshService) {

    $scope.status = undefined;
    $scope.cluster_name = undefined;
    $scope.host = undefined;

    $scope.$watch(
      function() {
        return RefreshService.lastUpdate();
      },
      function() {
        DataService.getNavbarData(
          function(data) {
            $scope.status = data.status;
            $scope.cluster_name = data.cluster_name;
            $scope.host = DataService.getHost();
            PageService.setup($scope.cluster_name, $scope.status);
          },
          function(error) {
            $scope.status = undefined;
            $scope.cluster_name = undefined;
            $scope.host = undefined;
            PageService.setup();
          }
        );
      }
    );

  }
]);

angular.module('cerebro').controller('OverviewController', ['$scope', '$http',
  '$window', '$location', 'DataService', 'AlertService', 'ModalService',
  'RefreshService',
  function($scope, $http, $window, $location, DataService, AlertService,
           ModalService, RefreshService) {

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

    $scope.showIndexSettings = function(index) {
      $location.path('index_settings').search('index', index);
    };

  }]);

angular.module('cerebro').controller('RestController', ['$scope', '$http',
  '$sce', 'DataService', 'AlertService', 'ModalService', 'AceEditorService',
  function($scope, $http, $sce, DataService, AlertService, ModalService,
           AceEditorService) {

    $scope.editor = undefined;
    $scope.response = undefined;

    $scope.mappings = undefined;

    $scope.method = 'POST';
    $scope.path = '';
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

    $scope.setup = function() {
      $scope.editor = AceEditorService.init('rest-client-editor');
      $scope.editor.setValue('{}');
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
        var autocomplete = new URLAutocomplete($scope.mappings);
        $scope.options = autocomplete.getAlternatives(text);
      }
    };
  }]
);

angular.module('cerebro').controller('TemplatesController', ['$scope',
  'AlertService', 'AceEditorService', 'TemplatesDataService', 'ModalService',
  function($scope, AlertService, AceEditorService, TemplatesDataService,
           ModalService) {

    var TemplateBase = JSON.stringify(
      {
        template: 'template pattern(e.g.: index_name_*)',
        settings: {},
        mappings: {},
        aliases: {}
      },
      undefined,
      2
    );

    $scope.editor = undefined;

    $scope.paginator = new Paginator(1, 10, [],
      new IndexTemplateFilter('', ''));

    $scope.$watch('paginator', function(filter, previous) {
      $scope.page = $scope.paginator.getPage();
    }, true);

    $scope.initEditor = function() {
      if (!$scope.editor) {
        $scope.editor = AceEditorService.init('template-body-editor');
        $scope.editor.setValue(TemplateBase);
      }
    };

    $scope.loadTemplates = function() {
      TemplatesDataService.getTemplates(
        function(templates) {
          $scope.paginator.setCollection(templates);
          $scope.page = $scope.paginator.getPage();
        },
        function(error) {
          AlertService.error('Error while loading templates', error);
        }
      );
    };

    $scope.create = function(name) {
      try {
        var template = $scope.editor.getValue();
        var success = function(response) {
          AlertService.info('Template successfully created');
          $scope.loadTemplates();
        };
        var errorCallback = function(response) {
          AlertService.error('Error creating template', response);
        };
        TemplatesDataService.create(name, template, success, errorCallback);
      }
      catch
        (error) {
        AlertService.error('Malformed template', error);
      }
    };

    $scope.delete = function(name) {
      var success = function(response) {
        AlertService.info('Template successfully deleted');
        $scope.loadTemplates();
      };
      var errorCallback = function(response) {
        AlertService.error('Error deleting template', response);
      };
      ModalService.promptConfirmation(
        'Delete template ' + name + '?',
        function() {
          TemplatesDataService.delete(name, success, errorCallback);
        }
      );
    };

    $scope.setup = function() {
      $scope.loadTemplates();
      $scope.initEditor();
    };
  }
]);

angular.module('cerebro').factory('TemplatesDataService', ['DataService',
  function(DataService) {

    this.getTemplates = function(success, error) {
      DataService.send('/templates', {}, success, error);
    };

    this.delete = function(name, success, error) {
      DataService.send('/templates/delete', {name: name}, success, error);
    };

    this.create = function(name, template, success, error) {
      var data = {name: name, template: template};
      DataService.send('/templates/create', data, success, error);
    };

    return this;

  }
]);

function IndexTemplateFilter(name, pattern) {

  this.name = name;
  this.pattern = pattern;

  this.clone = function() {
    return new IndexTemplateFilter(name, pattern);
  };

  this.getSorting = function() {
    return function(a, b) {
      return a.name.localeCompare(b.name);
    };
  };

  this.equals = function(other) {
    return (other !== null &&
    this.name === other.name &&
    this.pattern === other.pattern);
  };

  this.isBlank = function() {
    return !this.name && !this.pattern;
  };

  this.matches = function(template) {
    if (this.isBlank()) {
      return true;
    } else {
      var matches = true;
      if (this.name) {
        matches = template.name.indexOf(this.name) != -1;
      }
      if (matches && this.pattern) {
        matches = template.template.template.indexOf(this.pattern) != -1;
      }
      return matches;
    }
  };

}

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

  // sets value and moves cursor to beggining
  this.setValue = function(value) {
    this.editor.setValue(value, 1);
    this.editor.gotoLine(0, 0, false);
  };

  this.getValue = function() {
    var content = this.editor.getValue();
    if (content.trim()) {
      return JSON.parse(content);
    }
  };

  // formats the json content
  this.format = function() {
    try {
      var content = this.getValue();
      if (content) {
        this.editor.setValue(JSON.stringify(content, undefined, 2), 0);
        this.editor.gotoLine(0, 0, false);
      }
    } catch (error) { // nothing to do
    }
  };

}

function Alias(alias, index, filter, indexRouting, searchRouting) {
  this.alias = alias ? alias.toLowerCase() : '';
  this.index = index ? index.toLowerCase() : '';
  this.filter = filter ? filter : '';
  this.index_routing = indexRouting ? indexRouting : '';
  this.search_routing = searchRouting ? searchRouting : '';

  this.validate = function() {
    if (!this.alias) {
      throw 'Alias must have a non empty name';
    }
    if (!this.index) {
      throw 'Alias must have a valid index name';
    }
  };

  var cleanInput = function(input) {
    return input ? input.trim() : undefined;
  };

  this.toJson = function() {
    return {
      alias: this.alias,
      index: this.index,
      filter: this.filter,
      index_routing: cleanInput(this.index_routing),
      search_routing: cleanInput(this.search_routing)
    };
  };
}

function AliasFilter(index, alias) {

  this.index = index;
  this.alias = alias;

  this.clone = function() {
    return new AliasFilter(this.index, this.alias);
  };

  this.getSorting = function() {
    return function(a, b) {
      if (a.alias === b.alias) {
        return a.index.localeCompare(b.index);
      }
      return a.alias.localeCompare(b.alias);
    };
  };

  this.equals = function(other) {
    return (other !== null &&
    this.index == other.index &&
    this.alias == other.alias);
  };

  this.isBlank = function() {
    return !this.index && !this.alias;
  };

  this.matches = function(alias) {
    if (this.isBlank()) {
      return true;
    } else {
      var matches = true;
      if (this.index) {
        matches = alias.index.indexOf(this.index) != -1;
      }
      if (matches && this.alias) {
        matches = alias.alias.indexOf(this.alias) != -1;
      }
      return matches;
    }
  };

}

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

angular.module('cerebro').directive('ngPagination', ['$document',
  function($document) {

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
  }]
);

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

angular.module('cerebro').directive('ngProgress',
  function() {

    return {
      scope: {
        value: '=value',
        max: '=max',
        text: '=text'
      },
      template: function(elem, attrs) {
        return '<span class="detail"><small>{{text}}</small></span>' +
          '<div class="progress progress-thin">' +
          '<div class="progress-bar-info" style="width: {{value}}%"' +
          'ng-class="{\'progress-bar-danger\': {{(value / max) > 0.75}}}">' +
          '{{value}}%' +
          '</div></div>';
      }
    };
  }
);

function Request(path, method, body) {

  this.path = path;

  this.method = method;

  this.body = body;

}

angular.module('cerebro').filter('startsWith', function() {

  function strStartsWith(str, prefix) {
    return (str + '').indexOf(prefix) === 0;
  }

  return function(elements, prefix) {
    var filtered = [];
    angular.forEach(elements, function(element) {
      if (strStartsWith(element, prefix)) {
        filtered.push(element);
      }
    });
    return filtered;
  };
});

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
              var types = mappings[pathTokens[index - 1]].types;
              valid = types.indexOf(pathTokens[index]) >= 0;
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
            mappings[pathIndex].types.forEach(function(type) {
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

angular.module('cerebro').factory('ClusterChangesService', [
  '$rootScope', 'AlertService', 'RefreshService', 'DataService',
  function($rootScope, AlertService, RefreshService, DataService) {

    var current = {
      indices: undefined,
      noeds: undefined,
      clusterName: undefined
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
      function() { return RefreshService.lastUpdate(); },
      function() { process(); },
      true
    );

    return this;
  }]
);

angular.module('cerebro').run(['ClusterChangesService', angular.noop]);

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

angular.module('cerebro').factory('ModalService', ['$sce', function($sce) {

  var confirmCallback;

  this.promptConfirmation = function(body, callback) {
    this.text = body;
    this.info = undefined;
    confirmCallback = callback;
  };

  this.showInfo = function(info) {
    this.text = undefined;
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

angular.module('cerebro').factory('PageService', ['DataService', '$rootScope',
  '$document', function(DataService, $rootScope, $document) {

    var link = $document[0].querySelector('link[rel~=\'icon\']');
    var clusterName;
    var clusterStatus;

    if (link) {
      var faviconUrl = link.href;
      var img = $document[0].createElement('img');
      img.src = faviconUrl;
    }

    this.setup = function(newName, newStatus) {
      setPageTitle(newName);
      setFavIconColor(newStatus);
    };

    var setPageTitle = function(newClusterName) {
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
      if (link) {
        clusterStatus = newClusterStatus;
        try {
          var colors = {green: '#1AC98E', yellow: '#E4D836', red: '#E64759'};
          var color = clusterStatus ? colors[clusterStatus] : '#222426';
          var canvas = $document[0].createElement('canvas');
          canvas.width = 32;
          canvas.height = 34;
          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          context.globalCompositeOperation = 'source-in';
          context.fillStyle = color;
          context.fillRect(0, 0, 32, 34);
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

angular.module('cerebro').factory('RefreshService',
  function($rootScope, $timeout) {

    var timestamp = new Date().getTime();

    this.lastUpdate = function() {
      return timestamp;
    };

    this.refresh = function() {
      timestamp = Math.max(timestamp, new Date().getTime()) + 1;
    };

    var autoRefresh = function(instance) {
      instance.refresh();
      $timeout(function() { autoRefresh(instance); }, 3000);
    };

    autoRefresh(this);

    return this;
  }
);
