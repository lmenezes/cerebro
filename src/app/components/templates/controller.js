angular.module('cerebro').controller('TemplatesController', ['$scope',
  'AlertService', 'AceEditorService', 'TemplatesDataService', 'ModalService',
  function($scope, AlertService, AceEditorService, TemplatesDataService,
      ModalService) {
    var TemplateBase = JSON.stringify(
        {
          template: 'template pattern(e.g.: index_name_*)',
          settings: {},
          mappings: {},
          aliases: {},
        },
        undefined,
        2
    );

    $scope.editor = undefined;
    $scope.editMode = false;

    $scope.paginator = new Paginator(1, 10, [],
        new IndexTemplateFilter('', ''));

    $scope.$watch('paginator', function(filter, previous) {
      $scope.page = $scope.paginator.getPage();
    }, true);

    $scope.$watch('name', function(current, previous) {
      var isExistingTemplate = false;
      var templates = $scope.paginator.getCollection();
      templates.forEach(function(t) {
        if (t.name === current) {
          isExistingTemplate = true;
        }
      });
      $scope.editMode = isExistingTemplate;
    }, true);

    $scope.initEditor = function() {
      if (!$scope.editor) {
        $scope.editor = AceEditorService.init('template-body-editor');
        $scope.editor.setValue(TemplateBase);
      }
    };

    $scope.loadTemplates = function() {
      TemplatesDataService.getTemplates(
          function(templates) {
            $scope.paginator.setCollection(templates);
            $scope.page = $scope.paginator.getPage();
          },
          function(error) {
            AlertService.error('Error while loading templates', error);
          }
      );
    };

    $scope.edit = function(name, template) {
      $scope.name = name;
      $scope.editor.setValue(JSON.stringify(template, undefined, 2));
    };

    $scope.create = function(name) {
      try {
        var template = $scope.editor.getValue();
        var success = function(response) {
          if ($scope.editMode) {
            AlertService.info('Template successfully updated');
          } else {
            AlertService.info('Template successfully created');
          }
          $scope.loadTemplates();
        };
        var errorCallback = function(response) {
          AlertService.error('Error creating template', response);
        };
        TemplatesDataService.create(name, template, success, errorCallback);
      } catch
      (error) {
        AlertService.error('Malformed template', error);
      }
    };

    $scope.delete = function(name) {
      var success = function(response) {
        AlertService.info('Template successfully deleted');
        $scope.loadTemplates();
      };
      var errorCallback = function(response) {
        AlertService.error('Error deleting template', response);
      };
      ModalService.promptConfirmation(
          'Delete template ' + name + '?',
          function() {
            TemplatesDataService.delete(name, success, errorCallback);
          }
      );
    };

    $scope.setup = function() {
      $scope.loadTemplates();
      $scope.initEditor();
    };
  },
]);
