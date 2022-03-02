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
  },

]);
