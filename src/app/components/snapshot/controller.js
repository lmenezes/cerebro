angular.module('cerebro').controller('SnapshotController', ['$scope',
  'SnapshotsDataService', 'AlertService', 'ModalService',
  function($scope, SnapshotsDataService, AlertService, ModalService) {
    $scope._indices = [];
    $scope.indices = [];
    $scope.repositories = [];

    $scope.showSpecialIndices = false;

    $scope.repository = undefined;
    $scope.snapshots = [];
    $scope.form = {
      snapshot: '',
      repository: '',
      ignoreUnavailable: false,
      includeGlobalState: true,
    };

    $scope.$watch(
        'repository',
        function(newValue, oldValue) {
          $scope.loadSnapshots(newValue);
        },
        true
    );

    $scope.$watch('showSpecialIndices', function(current, previous) {
      $scope.refreshIndices();
    });

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

    $scope.refreshIndices = function() {
      if (!$scope.showSpecialIndices) {
        $scope.indices = $scope._indices.filter(function(i) {
          return !i.special;
        });
      } else {
        $scope.indices = $scope._indices;
      }
    };

    $scope.setup = function() {
      SnapshotsDataService.load(
          function(data) {
            $scope._indices = data.indices;
            $scope.refreshIndices();
            $scope.repositories = data.repositories;
          },
          function(error) {
            AlertService.error('Error loading repositories', error);
          }
      );
    };
  }]
);
