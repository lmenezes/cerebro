angular.module('cerebro').factory('PageService', ['DataService', '$rootScope',
  '$document', function(DataService, $rootScope, $document) {

    var clusterName;
    var clusterStatus;

    var link = $document[0].querySelector('link[rel~=\'icon\']');

    var colors = {
      green: 'img/green-favicon.png',
      yellow: 'img/yellow-favicon.png',
      red: 'img/red-favicon.png',
      black: 'img/black-favicon.png'
    };

    this.setup = function(newName, newStatus) {
      setPageTitle(newName);
      setFavIconColor(newStatus);
    };

    var setPageTitle = function(newClusterName) {
      if (clusterName !== newClusterName) {
        if (newClusterName) {
          clusterName = newClusterName;
          $rootScope.title = 'cerebro[' + clusterName + ']';
        } else {
          clusterName = undefined;
          $rootScope.title = 'cerebro - no connection';
        }
      }
    };

    var setFavIconColor = function(newClusterStatus) {
      if (link) {
        clusterStatus = newClusterStatus;
        var url = clusterStatus ? colors[clusterStatus] : colors.black;
        link.type = 'image/png';
        link.href = url;
      }
    };

    return this;

  }]);
