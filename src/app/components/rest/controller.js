angular.module('cerebro').controller('RestController', ['$scope', '$http',
  '$sce', 'DataService', 'AlertService', 'ModalService', 'AceEditorService',
  function($scope, $http, $sce, DataService, AlertService, ModalService,
           AceEditorService) {

    $scope.editor = undefined;
    $scope.response = undefined;

    $scope.mappings = undefined;

    $scope.method = 'POST';
    $scope.path = '';
    $scope.options = [];

    var success = function(response) {
      $scope.response = $sce.trustAsHtml(JSONTree.create(response));
    };

    var failure = function(response) {
      $scope.response = $sce.trustAsHtml(JSONTree.create(response));
    };

    $scope.execute = function() {
      var data = $scope.editor.getValue();
      $scope.response = undefined;
      DataService.execute($scope.method, $scope.path, data, success, failure);
    };

    $scope.setup = function() {
      $scope.editor = AceEditorService.init('rest-client-editor');
      $scope.editor.setValue('{}');
      DataService.getClusterMapping(
        function(response) {
          $scope.mappings = response;
          $scope.updateOptions($scope.path);
        },
        function(error) {
          AlertService.error('Error while loading cluster mappings', error);
        }
      );
    };

    $scope.updateOptions = function(text) {
      if ($scope.mappings) {
        var autocomplete = new URLAutocomplete($scope.mappings);
        $scope.options = autocomplete.getAlternatives(text);
      }
    };
  }]
);
