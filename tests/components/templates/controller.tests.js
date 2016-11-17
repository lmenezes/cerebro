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
      spyOn(this.scope, 'loadTemplates').andReturn();
      spyOn(this.scope, 'initEditor').andReturn();
      spyOn(this.scope, 'init').andReturn();
      this.scope.setup();
      expect(this.scope.loadTemplates).toHaveBeenCalled();
      expect(this.scope.initEditor).toHaveBeenCalled();
      expect(this.scope.init).toHaveBeenCalled();
    });
  });

  describe('loadTemplates', function() {
    it('load templates', function() {
      var templates = [{name: 'a'}, {name: 'b'}];
      this.TemplatesDataService.getTemplates = function(success, error) {
        success(templates);
      };
      spyOn(this.TemplatesDataService, 'getTemplates').andCallThrough();
      spyOn(this.scope.paginator, 'setCollection').andCallThrough();
      spyOn(this.scope.paginator, 'getPage').andReturn('page!');
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
      spyOn(this.AlertService, 'error').andReturn();
      spyOn(this.TemplatesDataService, 'getTemplates').andCallThrough();
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
      spyOn(this.TemplatesDataService, 'create').andCallThrough();
      spyOn(this.scope.editor, 'getValue').andReturn({key: 'value'});
      spyOn(this.AlertService, 'info').andReturn();
      this.scope.create('someTemplate');
      expect(this.TemplatesDataService.create).toHaveBeenCalledWith('someTemplate', {key: 'value'}, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.info).toHaveBeenCalledWith('Template successfully created');
    });
    it('alerts about malformed template', function() {
      this.scope.editor = {
        getValue: function() {
          throw 'pffff';
        }
      };
      spyOn(this.TemplatesDataService, 'create').andCallThrough();
      spyOn(this.AlertService, 'error').andReturn();
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
      spyOn(this.TemplatesDataService, 'create').andCallThrough();
      spyOn(this.scope.editor, 'getValue').andReturn({key: 'value'});
      spyOn(this.AlertService, 'error').andReturn();
      this.scope.create('someTemplate');
      expect(this.TemplatesDataService.create).toHaveBeenCalledWith('someTemplate', {key: 'value'}, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error creating template', 'ko');
    });
  });

  describe('update', function() {
    it('update template', function() {
      this.TemplatesDataService.create = function(name, template, success, error) {
        success('ok');
      };
      this.scope.editor = {
        getValue: function() {
        }
      };
      spyOn(this.TemplatesDataService, 'create').andCallThrough();
      spyOn(this.scope.editor, 'getValue').andReturn({key: 'value'});
      spyOn(this.AlertService, 'info').andReturn();
      this.scope.updateWithoutModal('template');
      expect(this.TemplatesDataService.create).toHaveBeenCalledWith('template', {key: 'value'}, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.info).toHaveBeenCalledWith('Template successfully updated');
    });
    it('alerts about malformed template', function() {
      this.scope.editor = {
        getValue: function() {
          throw 'pffff';
        }
      };
      spyOn(this.TemplatesDataService, 'create').andCallThrough();
      spyOn(this.AlertService, 'error').andReturn();
      this.scope.updateWithoutModal('template');
      expect(this.TemplatesDataService.create).not.toHaveBeenCalled();
      expect(this.AlertService.error).toHaveBeenCalledWith('Malformed template', 'pffff');
    });
    it('alerts on error while update', function() {
      this.TemplatesDataService.create = function(name, template, success, error) {
        error('ko');
      };
      this.scope.editor = {
        getValue: function() {
        }
      };
      spyOn(this.TemplatesDataService, 'create').andCallThrough();
      spyOn(this.scope.editor, 'getValue').andReturn({key: 'value'});
      spyOn(this.AlertService, 'error').andReturn();
      this.scope.updateWithoutModal('template');
      expect(this.TemplatesDataService.create).toHaveBeenCalledWith('template', {key: 'value'}, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error updating template', 'ko');
    });
  });

  describe('pagination', function() {
    it('refreshes page when paginator/filter information changes', function() {
      var elements = [8, 9, 1];
      spyOn(this.scope.paginator, 'getPage').andReturn(elements);
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

});
