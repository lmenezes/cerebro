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
    expect(this.scope.form).toEqual(undefined);
    expect(this.scope.settings).toEqual(undefined);
    expect(this.scope.changes).toEqual(undefined);
    expect(this.scope.pendingChanges).toEqual(0);
    expect(this.scope.groupedSettings).toEqual(undefined);
    expect(this.scope.settingsFilter).toEqual({name: '', showStatic: false});
  });

  describe('setup', function() {
    it('loads cluster settings', function () {
      var settings = {
        foo: {
          settings: {
            'index.setting': 'some value',
            'index.setting_2': 'other value'
          }
        }
      };
      this.IndexSettingsDataService.get = function(index, success, error) {
        success(settings);
      };
      spyOn(this.IndexSettingsDataService, "get").and.callThrough();
      this.scope.setup();
      expect(this.IndexSettingsDataService.get).toHaveBeenCalledWith('foo', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.settings).toEqual({'index.setting': 'some value', 'index.setting_2': 'other value'});
      expect(this.scope.form).toEqual({'index.setting': 'some value', 'index.setting_2': 'other value'});
      expect(this.scope.changes).toEqual({});
      expect(this.scope.pendingChanges).toEqual(0);
      expect(this.scope.index).toEqual('foo');
      expect(this.scope.groupedSettings.groups).toEqual(
        [
          { 'name': 'setting', "settings": [ { "name": "index.setting", "static": true } ] },
          { 'name': 'setting_2', "settings": [ {"name": "index.setting_2", "static": true } ] }
        ]
      );
    });
    it('alerts if fails to load cluster settings', function () {
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
      this.scope.settings = {some_setting: 'old value'};
      this.scope.form = {some_setting: 'new value'};
      spyOn(this.scope, "removeChange").and.returnValue(true);
      this.scope.revertSetting('some_setting');
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
      this.scope.form = {some_setting: 'new value'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({some_setting: 'new value'});
    });
    it('updates value for existing change', function () {
      this.scope.changes = {some_setting: 'value'};
      this.scope.form = {some_setting: 'updated value'};
      this.scope.settings = {some_setting: 'old value'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({some_setting: 'updated value'});
    });
    it('clears changes for property', function () {
      this.scope.changes = {some_setting: 'value'};
      this.scope.form = {some_setting: 'previous_setting'};
      this.scope.settings = {some_setting: 'previous_setting'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({});
    });
  });

});
