describe('RepositoriesController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.AlertService = $injector.get('AlertService');
    this.RepositoriesDataService = $injector.get('RepositoriesDataService');
    this.ModalService = $injector.get('ModalService');

    this.createController = function() {
      return $controller('RepositoriesController',
        {$scope: this.scope}, this.RepositoriesDataService, this.AlertService, this.ModalService);
    };
    this._controller = this.createController();
  }));

  describe('setup', function() {
    it('loads repositories', function() {
      var repos = ['repo1', 'repo2'];
      this.RepositoriesDataService.load = function(success, error) {
        success(repos);
      }
      spyOn(this.RepositoriesDataService, 'load').and.callThrough();
      this.scope.setup();
      expect(this.RepositoriesDataService.load).toHaveBeenCalled();
      expect(this.scope.repositories).toEqual(repos);
    });
    it('handles error while loading repositories', function() {
      this.RepositoriesDataService.load = function(success, error) {
        error("kaput");
      }
      spyOn(this.RepositoriesDataService, 'load').and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue();
      this.scope.setup();
      expect(this.RepositoriesDataService.load).toHaveBeenCalled();
      expect(this.scope.repositories).toEqual([]);
      expect(this.AlertService.error).toHaveBeenCalledWith('Error loading repositories', 'kaput');
    });
  });

  describe('edit', function() {
    it('loads repository data onto form', function() {
      expect(this.scope.name).toEqual('');
      expect(this.scope.type).toEqual('');
      expect(this.scope.settings).toEqual({});
      this.scope.edit('repo name', 'repo type', {setting: 'setting1'});
      expect(this.scope.name).toEqual('repo name');
      expect(this.scope.type).toEqual('repo type');
      expect(this.scope.settings).toEqual({setting: 'setting1'});
    });
  });

  describe('create', function() {
    it('creates a new repository', function() {
      this.RepositoriesDataService.create = function(name, type, settings, success, error) {
        success('success');
      }
      spyOn(this.RepositoriesDataService, 'create').and.callThrough();
      spyOn(this.AlertService, 'info').and.returnValue();
      spyOn(this.scope, 'setup').and.returnValue();
      this.scope.create('new repo', 'and type', {some: 'setting'});
      expect(this.RepositoriesDataService.create).toHaveBeenCalledWith(
        'new repo',
        'and type',
        {some: 'setting'},
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(this.scope.setup).toHaveBeenCalled();
      expect(this.AlertService.info).toHaveBeenCalledWith('Repository successfully created', 'success');
    });
    it('handles failure creating a new repository', function() {
      this.RepositoriesDataService.create = function(name, type, settings, success, error) {
        error('boom!');
      }
      spyOn(this.RepositoriesDataService, 'create').and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue();
      this.scope.create('new repo', 'and type', {some: 'setting'});
      expect(this.RepositoriesDataService.create).toHaveBeenCalledWith(
        'new repo',
        'and type',
        {some: 'setting'},
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(this.AlertService.error).toHaveBeenCalledWith('Error creating repository', 'boom!');
    });
  });

});
