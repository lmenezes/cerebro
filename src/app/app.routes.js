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
        .otherwise({
            redirectTo: '/connect'
          }
        );
    }
  ]);
