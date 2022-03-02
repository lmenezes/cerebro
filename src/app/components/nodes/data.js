angular.module('cerebro').factory('NodesDataService', ['DataService',
  function(DataService) {
    this.load = function(success, error) {
      DataService.send('nodes', {}, success, error);
    };

    return this;
  },
]);
