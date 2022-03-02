angular.module('cerebro').controller('IndexSettingsController', ['$scope',
  '$location', 'IndexSettingsDataService', 'AlertService',
  function($scope, $location, IndexSettingsDataService, AlertService) {
    $scope.form = undefined;
    $scope.settings = undefined;
    $scope.groupedSettings = undefined;
    $scope.changes = undefined;
    $scope.pendingChanges = 0;
    $scope.settingsFilter = {name: '', showStatic: false};
    $scope.index = $location.search().index;

    $scope.set = function(setting) {
      var value = $scope.form[setting];
      if (value !== $scope.settings[setting]) {
        if ($scope.changes[setting]) {
          $scope.changes[setting] = value;
        } else {
          $scope.changes[setting] = value;
          $scope.pendingChanges += 1;
        }
      } else {
        $scope.removeChange(setting);
      }
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
      IndexSettingsDataService.get(
          $scope.index,
          function(response) {
            $scope.settings = {};
            $scope.form = {};
            $scope.changes = {};
            $scope.pendingChanges = 0;
            var settings = response[$scope.index];
            ['defaults', 'settings'].forEach(function(group) {
              angular.forEach(settings[group], function(value, setting) {
                if (ValidIndexSettings.valid(setting)) {
                  $scope.settings[setting] = value;
                  $scope.form[setting] = value;
                }
              });
            });
            if (!$scope.groupedSettings) {
              $scope.groupedSettings = new GroupedSettings(
                  Object.keys($scope.form).map(function(setting) {
                    var dynamic = DynamicIndexSettings.valid(setting);
                    return {name: setting, static: !dynamic};
                  })
              );
            }
          },
          function(error) {
            AlertService.error('Error loading index settings', error);
          }
      );
    };
  },
]);
