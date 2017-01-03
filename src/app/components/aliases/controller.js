angular.module('cerebro').controller('AliasesController', ['$scope',
  'AlertService', 'AceEditorService', 'DataService', 'RefreshService',
  function($scope, AlertService, AceEditorService, DataService,
           RefreshService) {

    $scope.editor = undefined;

    $scope.paginator = new Paginator(1, 15, [], new AliasFilter('', ''));
    $scope.page = $scope.paginator.getPage();

    $scope.new_alias = new Alias('', '', '', '', '');
    $scope.displayAliasFilter = false;

    $scope.changes = [];

    $scope.$watch('paginator', function(filter, previous) {
      $scope.page = $scope.paginator.getPage();
    }, true);

    $scope.initEditor = function() {
      if (!$scope.editor) {
        $scope.editor = AceEditorService.init('alias-filter-editor');
      }
    };

    $scope.addAlias = function() {
      try {
        var alias = $scope.new_alias;
        alias.filter = $scope.editor.getValue();
        try {
          alias.validate();
          $scope.new_alias = new Alias('', '', '', '', '');
          $scope.changes.push({add: alias});
        } catch (error) {
          AlertService.error(error);
        }
      } catch (error) {
        AlertService.error('Malformed filter', error);
      }
    };

    $scope.removeIndexAlias = function(alias) {
      alias.removed = true;
      $scope.changes.push({remove: alias});
    };

    $scope.saveChanges = function() {
      var success = function(body) {
        $scope.changes = [];
        $scope.loadAliases();
        AlertService.success('Aliases successfully updated', body);
      };
      var error = function(body) {
        AlertService.error('Error while updating aliases', body);
      };
      var changes = [];
      for (var i = 0; i < $scope.changes.length; i++) {
        if (angular.isObject($scope.changes[i])) {
          var operation = Object.keys($scope.changes[i])[0];
          var change = {};
          change[operation] = $scope.changes[i][operation].toJson();
          changes.push(change);
        }
      }
      DataService.updateAliases(changes, success, error);
    };

    $scope.loadAliases = function() {
      DataService.getAliases(
        function(items) {
          var aliases = [];
          for (var i = 0; i < items.length; i++) {
            var alias = new Alias(items[i].alias, items[i].index,
                items[i].filter, items[i].indexRouting, items[i].searchRouting);
            aliases.push(alias);
          }
          $scope.paginator.setCollection(aliases);
          $scope.page = $scope.paginator.getPage();
        },
        function(error) {
          AlertService.error('Error while fetching aliases', error);
        }
      );
    };

    $scope.loadIndices = function() {
      DataService.getIndices(
        function(indices) {
          $scope.indices = indices;
        },
        function(error) {
          AlertService.error('Error loading indices', error);
        }
      );
    };

    $scope.setup = function() {
      $scope.loadIndices();
      $scope.loadAliases();
      $scope.initEditor();
    };

    $scope.revertChange = function(change, position) {
      if (change.remove) {
        change.remove.removed = false;
      }
      $scope.changes.splice(position, 1);
    };
  }
]);
