angular.module('cerebro').controller('RepositoriesController', ['$scope',
  'RepositoriesDataService', 'AlertService', 'ModalService',
  function($scope, RepositoriesDataService, AlertService, ModalService) {
    $scope.name = '';
    $scope.type = '';
    $scope.settings = {};
    $scope.repositories = [];
    $scope.update = false;

    $scope.$watch(
        'name',
        function(newValue, oldValue) {
          var repositories = $scope.repositories.map(function(r) {
            return r.name;
          });
          $scope.update = repositories.indexOf(newValue) !== -1;
        },
        true
    );

    $scope.create = function(name, type, settings) {
      RepositoriesDataService.create(name, type, settings,
          function(response) {
            $scope.setup();
            AlertService.info('Repository successfully created', response);
          },
          function(error) {
            AlertService.error('Error creating repository', error);
          }
      );
    };

    $scope.edit = function(name, type, settings) {
      $scope.name = name;
      $scope.type = type;
      angular.copy(settings, $scope.settings);
    };

    $scope.remove = function(name) {
      ModalService.promptConfirmation(
          'Delete repository ' + name + '?',
          function() {
            RepositoriesDataService.delete(name,
                function(data) {
                  $scope.setup();
                  AlertService.success('Operation successfully executed', data);
                },
                function(data) {
                  AlertService.error('Operation failed', data);
                }
            );
          }
      );
    };

    $scope.save = function(name, type, settings) {
      ModalService.promptConfirmation(
          'Save settings for repository ' + name + '?',
          function() {
            RepositoriesDataService.create(name, type, settings,
                function(response) {
                  $scope.setup();
                  AlertService.info('Successfully updated', response);
                },
                function(error) {
                  AlertService.error('Error updating repository', error);
                }
            );
          }
      );
    };

    $scope.setup = function() {
      RepositoriesDataService.load(
          function(repositories) {
            $scope.repositories = repositories;
          },
          function(error) {
            AlertService.error('Error loading repositories', error);
          }
      );
    };
  }]
);
