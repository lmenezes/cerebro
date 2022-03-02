angular.module('cerebro').controller('ModalController', ['$scope',
  'ModalService', function($scope, ModalService) {
    $scope.service = ModalService;

    $scope.close = function() {
      $scope.service.close();
    };

    $scope.confirm = function() {
      $scope.service.confirm();
    };
  },
]);
