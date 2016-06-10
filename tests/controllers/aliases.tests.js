describe('AliasesController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.DataService = $injector.get('DataService');
    this.AlertService = $injector.get('AlertService');
    this.AceEditorService = $injector.get('AceEditorService');
    this.createController = function() {
      return $controller('AliasesController',
        {$scope: this.scope}, this.AlertService, this.AceEditorService, this.DataService);
    };
    this._controller = this.createController();
  }));

  describe('initial controller state', function() {
    it('should have intial state correctly set', function() {
      expect(this.scope.editor).toEqual(undefined);
      expect(this.scope.paginator.getPageSize()).toEqual(15);
      expect(this.scope.paginator.getPage().total).toEqual(0);
      expect(this.scope.new_alias.index).toEqual('');
      expect(this.scope.new_alias.alias).toEqual('');
      expect(this.scope.new_alias.filter).toEqual('');
      expect(this.scope.new_alias.search_routing).toEqual('');
      expect(this.scope.new_alias.index_routing).toEqual('');
      expect(this.scope.displayAliasFilter).toEqual(false);
      expect(this.scope.changes).toEqual([]);
    });
  });

  describe('setup', function() {
    it('loads aliases and indices, and initializes ace editor', function () {
      spyOn(this.DataService, 'getData').andReturn({indices: ['fake', 'indices']});
      spyOn(this.scope, 'loadAliases').andReturn(true);
      spyOn(this.scope, 'initEditor').andReturn(true);
      this.scope.setup();
      expect(this.scope.loadAliases).toHaveBeenCalled();
      expect(this.scope.initEditor).toHaveBeenCalled();
      expect(this.scope.indices).toEqual(['fake', 'indices']);
    });
  });

  describe('revertChange', function() {
    it('removes an add operation from list of changes', function () {
      var change = {add: { index: 'someIndex', alias: 'someAlias'}}
      this.scope.changes = [{}, change, {}];
      this.scope.revertChange(change, 1);
      expect(this.scope.changes).toEqual([{}, {}]);
    });

    it('removes a remove operation from list of changes, and restores deleted flag on alias', function () {
      var change = {remove: { index: 'someIndex', alias: 'someAlias'}}
      this.scope.changes = [{}, change, {}];
      this.scope.revertChange(change, 1);
      expect(this.scope.changes).toEqual([{}, {}]);
      expect(change.remove.removed).toEqual(false);
    });
  });

  describe('loadAliases', function() {
    it('successfully loads aliases from cluster', function () {
      var aliases = {};
      this.DataService.getAliases = function(success, error) {
        success(aliases)
      };
      spyOn(this.DataService, 'getAliases').andCallThrough();
      spyOn(this.scope.paginator, 'setCollection').andReturn();
      spyOn(this.scope.paginator, 'getPage').andReturn(123);
      this.scope.loadAliases();
      expect(this.DataService.getAliases).toHaveBeenCalled();
      expect(this.scope.paginator.setCollection).toHaveBeenCalledWith(aliases);
      expect(this.scope.paginator.getPage).toHaveBeenCalled();
      expect(this.scope.page).toEqual(123);
    });
    it('handles failure while loading aliases from cluster', function () {
      var response = {error: 'failed'};
      this.DataService.getAliases = function(success, error) {
        error(response)
      };
      spyOn(this.AlertService, 'error').andReturn();
      this.scope.loadAliases();
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while fetching aliases', response);
    });
  });

  describe('removeIndexAlias', function() {
    it('removes an alias from the list of current aliases and marks it as deleted', function () {
      var alias = {index: 'name', alias: 'aliasName'};
      this.scope.removeIndexAlias(alias);
      expect(alias.removed).toEqual(true);
      expect(this.scope.changes[0]).toEqual({remove: alias});
    });
  });

  describe('saveChanges', function() {
    it('successfully saves changes', function () {
      var response = 'all good!';
      this.DataService.updateAliases = function(changes, success, error) {
        success(response)
      };
      spyOn(this.DataService, 'updateAliases').andCallThrough(true);
      spyOn(this.scope, 'loadAliases').andReturn(true);
      spyOn(this.AlertService, 'success').andReturn(true);
      this.scope.changes = [ 1, 2, 3 ];
      this.scope.saveChanges();
      expect(this.DataService.updateAliases).toHaveBeenCalledWith([ 1, 2, 3 ], jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.success).toHaveBeenCalledWith('Aliases successfully updated', response);
      expect(this.scope.loadAliases).toHaveBeenCalled();
      expect(this.scope.changes).toEqual([]);
    });
    it('handles failure while saving changes', function () {
      var response = 'not good!';
      this.DataService.updateAliases = function(changes, success, error) {
        error(response)
      };
      spyOn(this.DataService, 'updateAliases').andCallThrough(true);
      spyOn(this.AlertService, 'error').andReturn(true);
      this.scope.changes = [ 1, 2, 3 ];
      this.scope.saveChanges();
      expect(this.DataService.updateAliases).toHaveBeenCalledWith([ 1, 2, 3 ], jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while updating aliases', response);
    });
  });

  describe('addAlias', function() {
    it('successfully adds a new alias', function () {
      var alias = this.scope.new_alias;
      alias.alias = 'somealias';
      alias.index = 'someindex';
      var filter = {filter: 'value'};
      this.scope.editor = {getValue: function() { return filter;}};
      spyOn(this.scope.editor, 'getValue').andCallThrough();
      spyOn(alias, 'validate').andReturn(true);
      this.scope.addAlias();
      expect(alias.filter).toEqual(filter);
      var expected = {
        add: {
          alias: 'somealias',
          index: 'someindex',
          filter: { filter : 'value' },
          index_routing: undefined,
          search_routing: undefined
        }
      };
      expect(this.scope.changes[0]).toEqual(expected);
      expect(this.scope.new_alias).not.toEqual(alias);
      expect(alias.validate).toHaveBeenCalled();
    });
    it('validates alias before creation', function () {
      var filter = {filter: 'value'};
      this.scope.editor = {getValue: function() { return filter;}};
      spyOn(this.AlertService, 'error').andReturn(true);
      this.scope.addAlias();
      expect(this.AlertService.error).toHaveBeenCalledWith('Alias must have a non empty name');
    });
    it('validates filter before creation', function () {
      var filter = {filter: 'value'};
      this.scope.editor = {getValue: function() { throw 'wtf this broke';}};
      spyOn(this.AlertService, 'error').andReturn(true);
      this.scope.addAlias();
      expect(this.AlertService.error).toHaveBeenCalledWith('Malformed filter', 'wtf this broke');
    });

  });

  describe('initEditor', function() {
    it('initializes AceEditor', function () {
      spyOn(this.AceEditorService, 'init').andReturn('editor');
      this.scope.initEditor();
      expect(this.AceEditorService.init).toHaveBeenCalledWith('alias-filter-editor');
      expect(this.scope.editor).toEqual('editor');
    });
    it('initializes AceEditor only once', function () {
      this.scope.editor = 'already initialized';
      spyOn(this.AceEditorService, 'init').andReturn(true);
      this.scope.initEditor();
      expect(this.AceEditorService.init).not.toHaveBeenCalled();
    });
  });

  describe('load indices', function() {
    it('loads indices when data is available', function() {
      expect(this.scope.indices).toEqual(undefined);
      spyOn(this.DataService, 'getData').andReturn(
        {
          indices: [8, 9, 1]
        }
      );
      this.scope.$digest();
      expect(this.scope.indices).toEqual([8, 9, 1]);
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
      this.scope.paginator.filter.alias = 'a';
      this.scope.$digest();
      expect(this.scope.page).toEqual([8, 9, 1]);
      this.scope.page = []; // resets value
      this.scope.$digest(); // nothing changed
      expect(this.scope.page).toEqual([]);
      this.scope.paginator.filter.index = 'a';
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
