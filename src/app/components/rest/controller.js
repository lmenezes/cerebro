angular.module('cerebro').controller('RestController', ['$scope', '$http',
  '$sce', 'RestDataService', 'AlertService', 'ModalService', 'AceEditorService',
  'ClipboardService',
  function($scope, $http, $sce, RestDataService, AlertService, ModalService,
      AceEditorService, ClipboardService) {
    $scope.editor = undefined;
    $scope.response = undefined;

    $scope.indices = undefined;
    $scope.host = undefined;

    $scope.method = 'GET';
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
            $scope.indices = response.indices;
            $scope.updateOptions($scope.path);
          },
          function(error) {
            AlertService.error('Error while loading cluster indices', error);
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
      if ($scope.indices) {
        var autocomplete = new URLAutocomplete($scope.indices);
        $scope.options = autocomplete.getAlternatives(text);
      }
    };

    $scope.copyAsCURLCommand = function() {
      var method = $scope.method;
      var path = encodeURI($scope.path);
      if (path.substring(0, 1) !== '/') {
        path = '/' + path;
      }

      var matchesAPI = function(path, api) {
        return path.indexOf(api) === (path.length - api.length);
      };

      var contentType = 'application/json';
      var body = '';

      try {
        if (matchesAPI(path, '_bulk') || matchesAPI(path, '_msearch')) {
          contentType = 'application/x-ndjson';
          body = $scope.editor.getStringValue().split('\n').map(function(line) {
            return line === '' ? '\n' : JSON.stringify(JSON.parse(line));
          }).join('\n');
        } else {
          body = JSON.stringify($scope.editor.getValue(), undefined, 1);
        }
      } catch (e) {
        AlertService.error('Unexpected content format for [' + path + ']');
        return;
      }

      var curl = 'curl';
      curl += ' -H \'Content-type: ' + contentType + '\'';
      curl += ' -X' + method + ' \'' + $scope.host + path + '\'';
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
