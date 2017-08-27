describe('IndexSettingsController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.IndexSettingsDataService = $injector.get('IndexSettingsDataService');
    this.AlertService = $injector.get('AlertService');
    this.$location = $injector.get('$location');
    this.$location.search('index', 'foo');
    this.createController = function() {
      return $controller('IndexSettingsController',
        {$scope: this.scope}, this.$location, this.IndexSettingsDataService, this.AlertService);
    };
    this._controller = this.createController();
  }));

  it('should have intial state correctly set', function () {
    expect(this.scope.originalSettings).toEqual(undefined);
    expect(this.scope.settings).toEqual(undefined);
    expect(this.scope.changes).toEqual(undefined);
    expect(this.scope.pendingChanges).toEqual(0);
  });

  describe('setup', function() {
    it('loads cluster settings', function () {
      var settings = {
        foo: {
          settings: {
            setting: 'some value',
            setting_2: 'other value'
          }
        }
      };
      this.IndexSettingsDataService.get = function(index, success, error) {
        success(settings);
      };
      spyOn(this.IndexSettingsDataService, "get").and.callThrough();
      this.scope.setup();
      expect(this.IndexSettingsDataService.get).toHaveBeenCalledWith('foo', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.settings).toEqual({setting: 'some value', setting_2: 'other value'});
      expect(this.scope.originalSettings).toEqual({setting: 'some value', setting_2: 'other value'});
      expect(this.scope.changes).toEqual({});
      expect(this.scope.pendingChanges).toEqual(0);
      expect(this.scope.index).toEqual('foo');
    });
    it('alerts if fails to laod cluster settings', function () {
      this.IndexSettingsDataService.get = function(index, success, error) {
        error('kaput');
      };
      spyOn(this.IndexSettingsDataService, "get").and.callThrough();
      spyOn(this.AlertService, "error").and.returnValue(true);
      this.scope.setup();
      expect(this.scope.index).toEqual('foo');
      expect(this.IndexSettingsDataService.get).toHaveBeenCalledWith('foo', jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error loading index settings', 'kaput');
    });
  });

  describe('save', function() {
    it('saves pending changes', function () {
      var changes = {
        some_property: 'some value',
        some_other_property: 'some other value',
        some_blank_property: ''
      };
      this.scope.changes = changes;
      this.IndexSettingsDataService.update = function(index, settings, success, error) {
        success({ok: 'value'});
      };
      spyOn(this.IndexSettingsDataService, "update").and.callThrough();
      spyOn(this.AlertService, "info").and.returnValue(true);
      spyOn(this.scope, "setup").and.returnValue(true);
      this.scope.save();
      expect(this.IndexSettingsDataService.update).toHaveBeenCalledWith(
        'foo',
        changes,
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(this.scope.setup).toHaveBeenCalled();
      expect(this.AlertService.info).toHaveBeenCalledWith('Settings successfully saved', {ok: 'value'});
    });
    it('alerts if saving changes fails', function () {
      var changes = {
              some_property: 'some value',
              some_other_property: 'some other value',
              some_blank_property: ''
            };
      this.scope.changes = changes;
      this.IndexSettingsDataService.update = function(index, settings, success, error) {
        error('boom!');
      };
      spyOn(this.IndexSettingsDataService, "update").and.callThrough();
      spyOn(this.AlertService, "error").and.returnValue(true);
      this.scope.save();
      expect(this.IndexSettingsDataService.update).toHaveBeenCalledWith(
        'foo',
        changes,
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while saving settings', 'boom!');
    });
  });

  describe('revert', function() {
    it('reverts change', function () {
      this.scope.settings = {some_setting: 'new value'};
      this.scope.originalSettings = {some_setting: 'old value'};
      spyOn(this.scope, "removeChange").and.returnValue(true);
      this.scope.revert('some_setting');
      expect(this.scope.removeChange).toHaveBeenCalled();
      expect(this.scope.settings['some_setting']).toEqual('old value')
    });
  });

  describe('removeChange', function() {
    it('remove an existing change', function () {
      this.scope.changes = {some_setting: {value: 'new value'}};
      spyOn(this.scope, "removeChange").and.callThrough();
      this.scope.removeChange('some_setting');
      expect(this.scope.changes).toEqual({});
    });
    it('remove a non existing change', function () {
      this.scope.changes = {some_setting: {value: 'new value'}};
      spyOn(this.scope, "removeChange").and.callThrough();
      this.scope.removeChange('random_setting');
      expect(this.scope.changes).toEqual({some_setting: {value: 'new value'}});
    });
  });

  describe('set', function() {
    it('sets new value for existing property', function () {
      this.scope.changes = {};
      this.scope.settings = {some_setting: 'value'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({some_setting: 'value'});
    });
    it('updates value for existing change', function () {
      this.scope.changes = {some_setting: 'value'};
      this.scope.settings = {some_setting: 'updated value'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({some_setting: 'updated value'});
    });
    it('clears changes for property', function () {
      this.scope.changes = {some_setting: 'value'};
      this.scope.settings = {some_setting: ''};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({});
    });
  });

});
