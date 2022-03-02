angular.module('cerebro').factory('ClusterSettingsDataService', ['DataService',
  function(DataService) {
    this.getClusterSettings = function(success, error) {
      DataService.send('cluster_settings', {}, success, error);
    };

    this.saveSettings = function(settings, success, error) {
      var body = {settings: settings};
      DataService.send('cluster_settings/save', body, success, error);
    };

    return this;
  },
]);
