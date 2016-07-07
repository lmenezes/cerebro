angular.module('cerebro').controller('CreateIndexController', ['$scope',
  'AlertService', 'DataService', 'AceEditorService',
  function($scope, AlertService, DataService, AceEditorService) {

    $scope.editor = undefined;
    $scope.shards = '';
    $scope.replicas = '';
    $scope.name = '';
    $scope.indices = [];

    $scope.setup = function() {
      if (!$scope.editor) {
        $scope.editor = AceEditorService.init('index-settings');
      }
      if (DataService.getData()) {
        $scope.indices = DataService.getData().indices;
      }
    };

    $scope.$watch(
      function() {
        return DataService.getData();
      },
      function(data) {
        if (data && !$scope.indices) {
          $scope.indices = data.indices;
        }
      },
      true
    );

    $scope.loadIndexMetadata = function(index) {
      console.log('loading');
      DataService.getIndexMetadata(index,
        function(meta) {
          console.log('loadded');
          console.log(meta);
          var body = {settings: meta.settings, mappings: meta.mappings};
          $scope.editor.setValue(JSON.stringify(body, null, 2));
        },
        function(error) {
          AlertService.error('Error while loading index settings', error);
        }
      );
    };

    $scope.createIndex = function() {
      if ($scope.name.trim()) {
        try {
          var data = $scope.editor.getValue();
          if (Object.keys(data).length === 0) {
            data = {settings: {index: {}}};
            if ($scope.shards.trim()) {
              data.settings.index.number_of_shards = $scope.shards;
            }
            if ($scope.replicas.trim()) {
              data.settings.index.number_of_replicas = $scope.replicas;
            }
          }
          DataService.createIndex($scope.name, data,
            function(response) {
              DataService.forceRefresh();
              AlertService.success('Index successfully created');
            },
            function(error) {
              AlertService.error('Error while creating index', error);
            }
          );
        } catch (error) {
          AlertService.error('Malformed filter', error);
        }
      } else {
        AlertService.error('You must specify a valid index name');
      }
    };

  }
]);
