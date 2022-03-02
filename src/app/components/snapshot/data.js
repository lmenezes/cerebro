angular.module('cerebro').factory('SnapshotsDataService', ['DataService',
  function(DataService) {
    this.load = function(success, error) {
      DataService.send('snapshots', {}, success, error);
    };

    this.loadSnapshots = function(repository, success, error) {
      var data = {repository: repository};
      DataService.send('snapshots/load', data, success, error);
    };

    this.delete = function(repository, snapshot, success, error) {
      var data = {repository: repository, snapshot: snapshot};
      DataService.send('snapshots/delete', data, success, error);
    };

    this.create = function(repository, snapshot, ignoreUnavailable,
        includeGlobalState, indices, success, error) {
      var data = {
        repository: repository,
        snapshot: snapshot,
        ignoreUnavailable: ignoreUnavailable,
        includeGlobalState: includeGlobalState,
        indices: indices,
      };
      DataService.send('snapshots/create', data, success, error);
    };

    this.restore = function(repository, snapshot, renamePattern,
        renameReplacement, ignoreUnavailable, includeAliases, includeGlobalState,
        indices, success, error) {
      var data = {
        repository: repository,
        snapshot: snapshot,
        renamePattern: renamePattern,
        renameReplacement: renameReplacement,
        ignoreUnavailable: ignoreUnavailable,
        includeAliases: includeAliases,
        includeGlobalState: includeGlobalState,
        indices: indices,
      };
      DataService.send('snapshots/restore', data, success, error);
    };

    return this;
  },
]);
