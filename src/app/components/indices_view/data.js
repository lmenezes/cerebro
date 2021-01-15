angular.module('cerebro').factory('IndicesDataService', ['DataService',
  function(DataService) {
    this.load = function(success, error) {
      DataService.send('indices', {}, success, error);
    };

    return this;
  },
]);
