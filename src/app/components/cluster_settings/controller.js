angular.module('cerebro').controller('ClusterSettingsController', ['$scope',
  'ClusterSettingsDataService', 'AlertService',
  function($scope, ClusterSettingsDataService, AlertService) {
    $scope.form = undefined;
    $scope.settings = undefined;
    $scope.groupedSettings = undefined;
    $scope.changes = undefined;
    $scope.pendingChanges = 0;
    $scope.settingsFilter = {name: '', showStatic: false};

    $scope.set = function(setting) {
      var value = $scope.form[setting];
      if (value !== $scope.settings[setting]) {
        if ($scope.changes[setting]) {
          $scope.changes[setting].value = value;
        } else {
          $scope.changes[setting] = {value: value, transient: true};
          $scope.pendingChanges += 1;
        }
      } else {
        $scope.removeChange(setting);
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

    $scope.revertSetting = function(setting) {
      $scope.form[setting] = $scope.settings[setting];
      $scope.removeChange(setting);
    };

    $scope.displayGroup = function(group) {
      var matchedSettings = 0;
      group.settings.forEach(function(s) {
        matchedSettings += $scope.displaySetting(s) ? 1 : 0;
      });
      return matchedSettings > 0;
    };

    $scope.displaySetting = function(setting) {
      var matchesName = setting.name.indexOf($scope.settingsFilter.name) >= 0;
      var matchesType = (!setting.static || $scope.settingsFilter.showStatic);
      return matchesName && matchesType;
    };

    $scope.save = function() {
      var settings = {transient: {}, persistent: {}};
      angular.forEach($scope.changes, function(setting, name) {
        var settingType = setting.transient ? 'transient' : 'persistent';
        var value = setting.value.length > 0 ? setting.value : null;
        settings[settingType][name] = value;
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
      ClusterSettingsDataService.getClusterSettings(
          function(response) {
            $scope.settings = {};
            $scope.form = {};
            $scope.changes = {};
            $scope.pendingChanges = 0;
            ['defaults', 'persistent', 'transient'].forEach(function(group) {
              angular.forEach(response[group], function(value, setting) {
                $scope.settings[setting] = value;
                $scope.form[setting] = value;
              });
            });
            if (!$scope.groupedSettings) {
              $scope.groupedSettings = new GroupedSettings(
                  Object.keys($scope.form).map(function(setting) {
                    return {name: setting, static: !DynamicSettings.valid(setting)};
                  })
              );
            }
          },
          function(error) {
            AlertService.error('Error loading cluster settings', error);
          }
      );
    };
  },
]);
