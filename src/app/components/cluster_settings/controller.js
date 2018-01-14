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

    $scope.changeSettingPersistence = function(setting) {
      $scope.changes[setting].transient = !$scope.changes[setting].transient;
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
          ['defaults', 'persistent', 'transient'].forEach(function(group) {
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
