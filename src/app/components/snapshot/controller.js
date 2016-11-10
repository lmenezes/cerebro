angular.module('cerebro').controller('SnapshotController', ['$scope',
'SnapshotsDataService', 'AlertService', 'ModalService',
  function($scope, SnapshotsDataService, AlertService, ModalService) {

    $scope.indices = [];
    $scope.repositories = [];

    $scope.repository = undefined;
    $scope.snapshots = [];
    $scope.form = {
      snapshot: '',
      repository: '',
      ignoreUnavailable: false,
      includeGlobalState: true
    };

    $scope.$watch(
      'repository',
      function(newValue, oldValue) {
        $scope.loadSnapshots(newValue);
      },
      true
    );

    $scope.loadSnapshots = function(repository) {
      if (repository) {
        SnapshotsDataService.loadSnapshots(
          repository,
          function(snapshots) {
            $scope.snapshots = snapshots;
          },
          function(error) {
            AlertService.error('Error loading snapshots', error);
          }
        );
      }
    };

    $scope.create = function(repository, snapshot, ignoreUnavailable,
      includeGlobalState, indices) {
      SnapshotsDataService.create(
        repository,
        snapshot,
        ignoreUnavailable,
        includeGlobalState,
        indices,
        function(response) {
          $scope.loadSnapshots($scope.repository);
          AlertService.info('Snapshot successfully created', response);
        },
        function(error) {
          AlertService.error('Error creating snapshot', error);
        }
      );
    };

    $scope.delete = function(repository, snapshot) {
      ModalService.promptConfirmation(
        'Delete snapshot ' + snapshot + '?',
        function() {
          SnapshotsDataService.delete(
            repository,
            snapshot,
            function(response) {
              $scope.loadSnapshots($scope.repository);
              AlertService.info('Snapshot successfully deleted');
            },
            function(error) {
              AlertService.error('Error loading repositories', error);
            }
          );
        }
      );
    };

    $scope.restore = function(repository, snapshot, form) {
      SnapshotsDataService.restore(
        repository,
        snapshot,
        form.renamePattern,
        form.renameReplacement,
        form.ignoreUnavailable,
        form.includeAliases,
        form.includeGlobalState,
        form.indices,
        function(response) {
          AlertService.info('Snapshot successfully restored', response);
        },
        function(error) {
          AlertService.error('Error restoring snapshot', error);
        }
      );
    };

    $scope.setup = function() {
      SnapshotsDataService.load(
        function(data) {
          $scope.indices = data.indices;
          $scope.repositories = data.repositories;
        },
        function(error) {
          AlertService.error('Error loading repositories', error);
        }
      );
    };
  }]
);
