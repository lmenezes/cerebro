angular.module('cerebro').controller('AnalysisController', ['$scope',
  '$location', '$timeout', 'AlertService', 'AnalysisDataService',
  function($scope, $location, $timeout, AlertService, AnalysisDataService) {
    $scope.analyzerAnalysis = {index: undefined, analyzer: undefined};
    $scope.propertyAnalysis = {index: undefined, field: undefined};

    $scope.indices = [];
    $scope.fields = [];
    $scope.analyzers = [];

    $scope.loadAnalyzers = function(index) {
      AnalysisDataService.getIndexAnalyzers(index,
          function(analyzers) {
            $scope.analyzers = analyzers;
          },
          function(error) {
            $scope.analyzers = [];
            AlertService.error('Error loading index analyzers', error);
          }
      );
    };

    $scope.loadFields = function(index) {
      AnalysisDataService.getIndexFields(index,
          function(fields) {
            $scope.fields = fields;
          },
          function(error) {
            $scope.fields = [];
            AlertService.error('Error loading index fields', error);
          }
      );
    };

    $scope.analyzeByField = function(index, field, text) {
      if (text && field && text) {
        $scope.field_tokens = undefined;
        var success = function(response) {
          $scope.field_tokens = response;
        };
        var error = function(error) {
          AlertService.error('Error analyzing text by field', error);
        };
        AnalysisDataService.analyzeByField(index, field, text, success, error);
      }
    };

    $scope.analyzeByAnalyzer = function(index, analyzer, text) {
      if (text && analyzer && text) {
        $scope.analyzer_tokens = undefined;
        var success = function(response) {
          $scope.analyzer_tokens = response;
        };
        var error = function(error) {
          AlertService.error('Error analyzing text by analyzer', error);
        };
        AnalysisDataService.analyzeByAnalyzer(
            index,
            analyzer,
            text,
            success, error
        );
      }
    };

    $scope.setup = function() {
      AnalysisDataService.getOpenIndices(
          function(indices) {
            $scope.indices = indices;
          },
          function(error) {
            AlertService.error('Error loading indices', error);
          }
      );
    };
  },
]);
