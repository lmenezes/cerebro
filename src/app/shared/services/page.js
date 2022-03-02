angular.module('cerebro').factory('PageService', ['DataService', '$rootScope',
  '$document', function(DataService, $rootScope, $document) {
    var link = $document[0].querySelector('link[rel~=\'icon\']');

    var colors = {
      green: 'img/green-favicon.png',
      yellow: 'img/yellow-favicon.png',
      red: 'img/red-favicon.png',
      black: 'img/black-favicon.png',
    };

    this.setup = function(name, status) {
      setPageTitle(name, status);
      setFavIconColor(status);
    };

    var setPageTitle = function(name, status) {
      if (name) {
        $rootScope.title = name + '[' + status + ']';
      } else {
        $rootScope.title = 'cerebro - no connection';
      }
    };

    var setFavIconColor = function(status) {
      if (link) {
        link.type = 'image/png';
        link.href = colors[status] || colors.black;
      }
    };

    return this;
  },
]);
