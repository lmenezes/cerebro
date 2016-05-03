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
