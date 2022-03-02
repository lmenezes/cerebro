'use strict';
angular.module('cerebro', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
            .when('/overview', {
              templateUrl: 'overview.html',
              controller: 'OverviewController',
            })
            .when('/nodes', {
              templateUrl: 'nodes/index.html',
              controller: 'NodesController',
            })
            .when('/connect', {
              templateUrl: 'connect.html',
              controller: 'ConnectController',
            })
            .when('/rest', {
              templateUrl: 'rest/index.html',
              controller: 'RestController',
            })
            .when('/aliases', {
              templateUrl: 'aliases.html',
              controller: 'AliasesController',
            })
            .when('/create', {
              templateUrl: 'create_index.html',
              controller: 'CreateIndexController',
            })
            .when('/analysis', {
              templateUrl: 'analysis/index.html',
              controller: 'AnalysisController',
            })
            .when('/templates', {
              templateUrl: 'templates/index.html',
              controller: 'TemplatesController',
            })
            .when('/cluster_settings', {
              templateUrl: 'cluster_settings/index.html',
              controller: 'ClusterSettingsController',
            })
            .when('/index_settings', {
              templateUrl: 'index_settings/index.html',
              controller: 'IndexSettingsController',
            })
            .when('/snapshot', {
              templateUrl: 'snapshot/index.html',
              controller: 'SnapshotController',
            })
            .when('/repository', {
              templateUrl: 'repositories/index.html',
              controller: 'RepositoriesController',
            })
            .when('/cat', {
              templateUrl: 'cat/index.html',
              controller: 'CatController',
            })
            .otherwise({
              redirectTo: '/connect',
            }
            );
      },
    ]);
