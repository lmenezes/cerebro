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
