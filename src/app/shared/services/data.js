angular.module('cerebro').factory('DataService', ['$rootScope', '$timeout',
  '$http', '$location', 'RefreshService', 'AlertService', '$window',
  function($rootScope, $timeout, $http, $location, RefreshService,
      AlertService, $window) {
    var host;

    var username;

    var password;

    var onGoingRequests = {};

    this.getHost = function() {
      return host;
    };

    this.setHost = function(newHost, newUsername, newPassword) {
      host = newHost;
      username = newUsername;
      password = newPassword;
      $location.search('host', newHost);
      RefreshService.refresh();
    };

    this.disconnect = function() {
      host = undefined;
      username = undefined;
      password = undefined;
      onGoingRequests = {};
      $location.path('/connect');
    };

    if ($location.search().host) {
      this.setHost($location.search().host);
    }

    // ---------- Navbar ----------
    this.getNavbarData = function(success, error) {
      clusterRequest('navbar', {}, success, error);
    };

    // ---------- Create index ----------
    this.createIndex = function(index, metadata, success, error) {
      var data = {index: index, metadata: metadata};
      clusterRequest('create_index/create', data, success, error);
    };

    this.getIndexMetadata = function(index, success, error) {
      var data = {index: index};
      clusterRequest('create_index/get_index_metadata', data, success, error);
    };

    // ---------- Commons ----------
    this.getIndices = function(success, error) {
      clusterRequest('commons/indices', {}, success, error);
    };

    this.getNodes = function(success, error) {
      clusterRequest('commons/nodes', {}, success, error);
    };

    // ---------- Aliases ----------
    this.getAliases = function(success, error) {
      clusterRequest('aliases/get_aliases', {}, success, error);
    };

    this.updateAliases = function(changes, success, error) {
      var data = {changes: changes};
      clusterRequest('aliases/update_aliases', data, success, error);
    };

    // ---------- Cluster State Changes ----------
    this.clusterChanges = function(success, error) {
      clusterRequest('cluster_changes', {}, success, error);
    };

    // ---------- External API ----------

    this.send = function(path, data, success, error) {
      clusterRequest(path, data, success, error);
    };

    // ---------- Internal ----------

    var clusterRequest = function(path, data, success, error) {
      if (host) {
        var defaultData = {
          host: host,
          username: username,
          password: password,
        };
        var config = {
          method: 'POST',
          url: path,
          data: angular.merge(data, defaultData), // adds host to data
        };
        request(config, success, error);
      }
    };

    var request = function(config, success, error) {
      var handleSuccess = function(response) {
        onGoingRequests[config.url] = undefined;
        switch (response.data.status) {
          case 303: // unauthorized in cerebro
            $window.location.href = './login';
            break;
          case 401: // unauthorized in ES instance
            $location.path('/connect').search({host: host, unauthorized: true});
            break;
          default:
            if (response.data.status >= 200 && response.data.status < 300) {
              success(response.data.body);
            } else {
              error(response.data.body);
            }
        }
      };
      var handleError = function(response) {
        onGoingRequests[config.url] = undefined;
        AlertService.error('Error connecting to the server', response.data.error);
      };
      var activeRequest = onGoingRequests[config.url] !== undefined;
      var now = new Date().getTime();
      var interval = RefreshService.getInterval();
      if (!activeRequest || now - onGoingRequests[config.url] < interval) {
        $http(config).then(handleSuccess, handleError);
        onGoingRequests[config.url] = new Date().getTime();
      }
    };

    return this;
  },
]);
