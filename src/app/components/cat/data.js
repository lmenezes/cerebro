angular.module('cerebro').factory('CatDataService', ['DataService',
  function(DataService) {
    this.get = function(api, success, error) {
      DataService.send('cat', {api: api}, success, error);
    };

    return this;
  },
]);
