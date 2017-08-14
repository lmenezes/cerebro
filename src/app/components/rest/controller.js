angular.module('cerebro').controller('RestController', ['$scope', '$http',
  '$sce', 'RestDataService', 'AlertService', 'ModalService', 'AceEditorService',
  'ClipboardService',
  function($scope, $http, $sce, RestDataService, AlertService, ModalService,
           AceEditorService, ClipboardService) {

    $scope.editor = undefined;
    $scope.response = undefined;

    $scope.mappings = undefined;
    $scope.host = undefined;

    $scope.method = 'POST';
    $scope.path = '';
    $scope.options = [];

    var success = function(response) {
      $scope.response = $sce.trustAsHtml(JSONTree.create(response));
      $scope.loadHistory();
    };

    var failure = function(response) {
      $scope.response = $sce.trustAsHtml(JSONTree.create(response));
    };

    $scope.execute = function() {
      var data = $scope.editor.getStringValue();
      var method = $scope.method;
      $scope.response = undefined;
      try {
        data = $scope.editor.getValue();
      } catch (error) {
      }
      RestDataService.execute(method, $scope.path, data, success, failure);
    };

    $scope.setup = function() {
      $scope.editor = AceEditorService.init('rest-client-editor');
      $scope.editor.setValue('{}');
      RestDataService.load(
        function(response) {
          $scope.host = response.host;
          $scope.mappings = response.mappings;
          $scope.updateOptions($scope.path);
        },
        function(error) {
          AlertService.error('Error while loading cluster mappings', error);
        }
      );
      $scope.loadHistory();
    };

    $scope.loadRequest = function(request) {
      $scope.method = request.method;
      $scope.path = request.path;
      $scope.editor.setValue(request.body);
      $scope.editor.format();
    };

    $scope.loadHistory = function() {
      RestDataService.history(
        function(history) {
          $scope.history = history;
        },
        function(error) {
          AlertService.error('Error while loading request history', error);
        }
      );
    };

    $scope.updateOptions = function(text) {
      if ($scope.mappings) {
        var autocomplete = new URLAutocomplete($scope.mappings);
        $scope.options = autocomplete.getAlternatives(text);
      }
    };

    $scope.copyAsCURLCommand = function() {
      var method = $scope.method;
      var path = encodeURI($scope.path);
      if (path.substring(0, 1) !== '/') {
        path = '/' + path;
      }
      var body = JSON.stringify($scope.editor.getValue(), undefined, 1);
      var curl = 'curl -X' + method + ' \'' + $scope.host + path + '\'';
      if (['POST', 'PUT'].indexOf(method) >= 0) {
        curl += ' -d \'' + body + '\'';
      }
      ClipboardService.copy(
        curl,
        function() {
          AlertService.info('cURL request successfully copied to clipboard');
        },
        function() {
          AlertService.error('Error while copying request to clipboard');
        }
      );
    };

  }]
);
