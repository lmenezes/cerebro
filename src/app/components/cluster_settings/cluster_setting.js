angular.module('cerebro').directive('clusterSetting', function() {
  return {
    restrict: 'EA',
    scope: {
      'set': '&',
      'property': '=',
      'settings': '='
    },
    templateUrl: 'cluster_settings/cluster_setting.html'
  };
});
