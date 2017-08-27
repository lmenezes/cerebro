describe('TemplatesController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.AlertService = $injector.get('AlertService');
    this.AceEditorService = $injector.get('AceEditorService');
    this.TemplatesDataService = $injector.get('TemplatesDataService');
    this.ModalService = $injector.get('ModalService');

    this.createController = function() {
      return $controller('TemplatesController',
        {$scope: this.scope}, this.AlertService, this.AceEditorService, this.TemplatesDataService, this.ModalService);
    };
    this._controller = this.createController();
  }));

  describe('setup', function() {
    it('loads aliases and indices, and initializes ace editor', function() {
      spyOn(this.scope, 'loadTemplates').and.returnValue();
      spyOn(this.scope, 'initEditor').and.returnValue();
      this.scope.setup();
      expect(this.scope.loadTemplates).toHaveBeenCalled();
      expect(this.scope.initEditor).toHaveBeenCalled();
    });
  });

  describe('loadTemplates', function() {
    it('load templates', function() {
      var templates = [{name: 'a'}, {name: 'b'}];
      this.TemplatesDataService.getTemplates = function(success, error) {
        success(templates);
      };
      spyOn(this.TemplatesDataService, 'getTemplates').and.callThrough();
      spyOn(this.scope.paginator, 'setCollection').and.callThrough();
      spyOn(this.scope.paginator, 'getPage').and.returnValue('page!');
      this.scope.loadTemplates();
      expect(this.TemplatesDataService.getTemplates).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.paginator.setCollection).toHaveBeenCalledWith(templates);
      expect(this.scope.paginator.getPage).toHaveBeenCalled();
      expect(this.scope.page).toEqual('page!');
    });
    it('alert on failure loading templates', function() {
      this.TemplatesDataService.getTemplates = function(success, error) {
        error('failed!');
      };
      spyOn(this.AlertService, 'error').and.returnValue();
      spyOn(this.TemplatesDataService, 'getTemplates').and.callThrough();
      this.scope.loadTemplates();
      expect(this.TemplatesDataService.getTemplates).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while loading templates', 'failed!');
    });
  });

  describe('create', function() {
    it('create template', function() {
      this.TemplatesDataService.create = function(name, template, success, error) {
        success('ok');
      };
      this.scope.editor = {
        getValue: function() {
        }
      };
      spyOn(this.TemplatesDataService, 'create').and.callThrough();
      spyOn(this.scope.editor, 'getValue').and.returnValue({key: 'value'});
      spyOn(this.AlertService, 'info').and.returnValue();
      this.scope.create('someTemplate');
      expect(this.TemplatesDataService.create).toHaveBeenCalledWith('someTemplate', {key: 'value'}, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.info).toHaveBeenCalledWith('Template successfully created');
    });
    it('updates existing template', function() {
       this.scope.editMode = true;
       this.TemplatesDataService.create = function(name, template, success, error) {
         success('ok');
       };
       this.scope.editor = {
         getValue: function() {
         }
       };
       spyOn(this.TemplatesDataService, 'create').and.callThrough();
       spyOn(this.scope.editor, 'getValue').and.returnValue({key: 'value'});
       spyOn(this.AlertService, 'info').and.returnValue();
       this.scope.create('someTemplate');
       expect(this.TemplatesDataService.create).toHaveBeenCalledWith('someTemplate', {key: 'value'}, jasmine.any(Function), jasmine.any(Function));
       expect(this.AlertService.info).toHaveBeenCalledWith('Template successfully updated');
     });
    it('alerts about malformed template', function() {
      this.scope.editor = {
        getValue: function() {
          throw 'pffff';
        }
      };
      spyOn(this.TemplatesDataService, 'create').and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue();
      this.scope.create('someTemplate');
      expect(this.TemplatesDataService.create).not.toHaveBeenCalled();
      expect(this.AlertService.error).toHaveBeenCalledWith('Malformed template', 'pffff');
    });
    it('alerts on error while creation', function() {
      this.TemplatesDataService.create = function(name, template, success, error) {
        error('ko');
      };
      this.scope.editor = {
        getValue: function() {
        }
      };
      spyOn(this.TemplatesDataService, 'create').and.callThrough();
      spyOn(this.scope.editor, 'getValue').and.returnValue({key: 'value'});
      spyOn(this.AlertService, 'error').and.returnValue();
      this.scope.create('someTemplate');
      expect(this.TemplatesDataService.create).toHaveBeenCalledWith('someTemplate', {key: 'value'}, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error creating template', 'ko');
    });
  });

  describe('pagination', function() {
    it('refreshes page when paginator/filter information changes', function() {
      var elements = [8, 9, 1];
      spyOn(this.scope.paginator, 'getPage').and.returnValue(elements);
      this.scope.$digest();
      expect(this.scope.page).toEqual([8, 9, 1]);
      this.scope.page = []; // resets value
      this.scope.$digest(); // nothing changed
      expect(this.scope.page).toEqual([]);
      this.scope.paginator.filter.name = 'a';
      this.scope.$digest();
      expect(this.scope.page).toEqual([8, 9, 1]);
      this.scope.page = []; // resets value
      this.scope.$digest(); // nothing changed
      expect(this.scope.page).toEqual([]);
      this.scope.paginator.filter.template = 'a';
      this.scope.$digest();
      expect(this.scope.page).toEqual([8, 9, 1]);
      this.scope.page = []; // resets value
      this.scope.$digest(); // nothing changed
      expect(this.scope.page).toEqual([]);
      this.scope.paginator.nextPage();
      this.scope.$digest();
      expect(this.scope.page).toEqual([8, 9, 1]);
    });
  });

  describe('editMode', function() {
    it('enables editMode when name changes to existing template', function() {
      var templates = [{name: 'tmp'}, {name: 'tmp2'}];
      spyOn(this.scope.paginator, 'getCollection').and.returnValue(templates);
      this.scope.name = 'tmp';
      this.scope.$digest();
      expect(this.scope.editMode).toEqual(true);
    });
    it('disables editMode when name changes to non existing template', function() {
      var templates = [{name: 'tmp'}, {name: 'tmp2'}];
      spyOn(this.scope.paginator, 'getCollection').and.returnValue(templates);
      this.scope.name = 'tm';
      this.scope.$digest();
      expect(this.scope.editMode).toEqual(false);
    });
  });

  describe('edit', function() {
    it('loads templates into form', function() {
      this.scope.editor = {setValue: function(){}};
      spyOn(this.scope.editor, 'setValue').and.returnValue();
      this.scope.edit('some name', {some: 'obj'});
      expect(this.scope.name).toEqual('some name');
      expect(this.scope.editor.setValue).toHaveBeenCalledWith('{\n  "some": "obj"\n}');
    });
  });

});
