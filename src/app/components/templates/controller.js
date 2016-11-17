angular.module('cerebro').controller('TemplatesController', ['$scope',
  'AlertService', 'AceEditorService', 'TemplatesDataService', 'ModalService',
  function($scope, AlertService, AceEditorService, TemplatesDataService,
           ModalService) {

    var TemplateBase = JSON.stringify(
      {
        template: 'template pattern(e.g.: index_name_*)',
        settings: {},
        mappings: {},
        aliases: {}
      },
      undefined,
      2
    );

    $scope.editor = undefined;

    $scope.paginator = new Paginator(1, 10, [],
      new IndexTemplateFilter('', ''));

    $scope.init = function() {
      $scope.title = 'create new template';
      $scope.created = true;
    };

    $scope.$watch('paginator', function(filter, previous) {
      $scope.page = $scope.paginator.getPage();
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

    $scope.create = function(name) {
      try {
        var template = $scope.editor.getValue();
        var success = function(response) {
          AlertService.info('Template successfully created');
          $scope.loadTemplates();
        };
        var errorCallback = function(response) {
          AlertService.error('Error creating template', response);
        };
        TemplatesDataService.create(name, template, success, errorCallback);
      }
      catch
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

    $scope.updateWithoutModal = function(name) {
      try {
        var template = $scope.editor.getValue();
        var success = function(response) {
          AlertService.info('Template successfully updated');
          $scope.loadTemplates();
          $scope.init();
          $scope.name = '';
          $scope.editor.setValue(TemplateBase);
        };
        var errorCallback = function(response) {
          AlertService.error('Error updating template', response);
        };

        TemplatesDataService.create(name, template, success,
          errorCallback);
      }
      catch
          (error) {
        AlertService.error('Malformed template', error);
      }
    };

    $scope.update = function(name) {
      ModalService.promptConfirmation(
          'Update template ' + name + '?',
          function() {
            $scope.updateWithoutModal(name);
          }
      );
    };

    $scope.loadIndexTemplate = function(template) {
      $scope.name = template.name;
      $scope.title = 'edit template';
      $scope.created = false;
      $scope.editor.setValue(JSON.stringify(template.template, undefined, 2));
    };

    $scope.setup = function() {
      $scope.loadTemplates();
      $scope.initEditor();
      $scope.init();
    };
  }
]);
