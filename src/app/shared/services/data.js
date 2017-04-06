angular.module('cerebro').factory('DataService', ['$rootScope', '$timeout',
  '$http', '$location', 'RefreshService', 'AlertService', '$window',
  function($rootScope, $timeout, $http, $location, RefreshService,
           AlertService, $window) {

    var host;

    var username;

    var password;

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

    // ---------- Connect ----------
    this.getHosts = function(success, error) {
      var config = {
        method: 'GET',
        url: 'connect/hosts'
      };
      request(config, success, error);
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
          password: password
        };
        var config = {
          method: 'POST',
          url: path,
          data: angular.merge(data, defaultData) // adds host to data
        };
        request(config, success, error);
      }
    };

    var request = function(config, success, error) {
      var handleSuccess = function(data) {
        if (data.status === 303) {
          $window.location.href = 'login';
        } else {
          if (data.status >= 200 && data.status < 300) {
            success(data.body);
          } else {
            error(data.body);
          }
        }
      };
      var handleError = function(data) {
        AlertService.error('Error connecting to the server', data.error);
      };
      $http(config).success(handleSuccess).error(handleError);
    };

    return this;

  }
]);
