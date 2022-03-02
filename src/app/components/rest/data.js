angular.module('cerebro').factory('RestDataService', ['DataService',
  function(DataService) {
    this.load = function(success, error) {
      DataService.send('rest', {}, success, error);
    };

    this.history = function(success, error) {
      DataService.send('rest/history', {}, success, error);
    };

    this.execute = function(method, path, data, success, error) {
      var requestData = {method: method, data: data, path: path};
      DataService.send('rest/request', requestData, success, error);
    };

    this.getHost = function() {
      return DataService.getHost();
    };

    return this;
  },
]);
