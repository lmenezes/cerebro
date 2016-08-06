angular.module('cerebro').factory('RefreshService',
  function($rootScope, $timeout) {

    var timestamp = new Date().getTime();

    this.lastUpdate = function() {
      return timestamp;
    };

    this.refresh = function() {
      timestamp = Math.max(timestamp, new Date().getTime()) + 1;
    };

    var autoRefresh = function(instance) {
      instance.refresh();
      $timeout(function() { autoRefresh(instance); }, 3000);
    };

    autoRefresh(this);

    return this;
  }
);
