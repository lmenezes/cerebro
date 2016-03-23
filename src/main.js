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
