angular.module('cerebro').factory('IndexSettingsDataService', ['DataService',
  function(DataService) {
    this.get = function(index, success, error) {
      DataService.send('index_settings', {index: index}, success, error);
    };

    this.update = function(index, settings, success, error) {
      var body = {index: index, settings: settings};
      DataService.send('index_settings/update', body, success, error);
    };

    return this;
  },
]);
