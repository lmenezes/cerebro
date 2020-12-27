angular.module('cerebro').factory('RefreshService',
    function($rootScope, $timeout) {
      var timestamp = new Date().getTime();

      var interval = 15000;

      this.getInterval = function() {
        return interval;
      };

      this.setInterval = function(newInterval) {
        if (interval > newInterval) {
          this.refresh(); // makes change apparent quicker
        }
        interval = newInterval;
      };

      this.lastUpdate = function() {
        return timestamp;
      };

      this.refresh = function() {
        timestamp = Math.max(timestamp, new Date().getTime()) + 1;
      };

      var autoRefresh = function(instance) {
        instance.refresh();
        $timeout(function() {
          autoRefresh(instance);
        }, interval);
      };

      autoRefresh(this);

      return this;
    }
);
