angular.module('cerebro').factory('RepositoriesDataService', ['DataService',
  function(DataService) {
    this.load = function(success, error) {
      DataService.send('repositories', {}, success, error);
    };

    this.create = function(name, type, settings, success, error) {
      var data = {
        name: name,
        type: type,
        settings: settings,
      };
      DataService.send('repositories/create', data, success, error);
    };

    this.delete = function(name, success, error) {
      DataService.send('repositories/delete', {name: name}, success, error);
    };

    return this;
  },
]);
