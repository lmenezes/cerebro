describe('ClusterSettingsController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.ClusterSettingsDataService = $injector.get('ClusterSettingsDataService');
    this.AlertService = $injector.get('AlertService');
    this.createController = function() {
      return $controller('ClusterSettingsController',
        {$scope: this.scope}, this.ClusterSettingsDataService, this.AlertService);
    };
    this._controller = this.createController();
  }));

  it('should have intial state correctly set', function () {
    expect(this.scope.form).toEqual(undefined);
    expect(this.scope.settings).toEqual(undefined);
    expect(this.scope.groupedSettings).toEqual(undefined);
    expect(this.scope.changes).toEqual(undefined);
    expect(this.scope.pendingChanges).toEqual(0);
    expect(this.scope.settingsFilter.name).toEqual('');
    expect(this.scope.settingsFilter).toEqual({name: '', showStatic: false});
  });

  describe('setup', function() {
    it('loads cluster settings', function () {
      var settings = {
        persistent: {setting: 'some value', setting_2: 'other value'},
        transient: {setting: 'some other value'},
        defaults: { setting_3: 'still another'}
      };
      this.ClusterSettingsDataService.getClusterSettings = function(success, error) {
        success(settings);
      };
      spyOn(this.ClusterSettingsDataService, "getClusterSettings").and.callThrough();
      this.scope.setup();
      expect(this.ClusterSettingsDataService.getClusterSettings).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.settings).toEqual({setting: 'some other value', setting_2: 'other value', setting_3: 'still another'});
      expect(this.scope.form).toEqual({setting: 'some other value', setting_2: 'other value', setting_3: 'still another'});
      expect(this.scope.changes).toEqual({});
      expect(this.scope.pendingChanges).toEqual(0);
    });
    it('alerts if fails to laod cluster settings', function () {
      this.ClusterSettingsDataService.getClusterSettings = function(success, error) {
        error('kaput');
      };
      spyOn(this.ClusterSettingsDataService, "getClusterSettings").and.callThrough();
      spyOn(this.AlertService, "error").and.returnValue(true);
      this.scope.setup();
      expect(this.ClusterSettingsDataService.getClusterSettings).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error loading cluster settings', 'kaput');
    });
  });

  describe('save', function() {
    it('saves pending changes', function () {
      this.scope.changes = {
        some_property: {value: 'some value', transient: true},
        some_other_property: {value: 'some other value', transient: false},
        some_blank_property: {value: '', transient: true}
      };
      this.ClusterSettingsDataService.saveSettings = function(settings, success, error) {
        success({ok: 'value'});
      };
      spyOn(this.ClusterSettingsDataService, "saveSettings").and.callThrough();
      spyOn(this.AlertService, "info").and.returnValue(true);
      spyOn(this.scope, "setup").and.returnValue(true);
      this.scope.save();
      expect(this.ClusterSettingsDataService.saveSettings).toHaveBeenCalledWith(
        {transient: {some_property: 'some value', some_blank_property: null}, persistent: {some_other_property: 'some other value'}},
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(this.scope.setup).toHaveBeenCalled();
      expect(this.AlertService.info).toHaveBeenCalledWith('Settings successfully saved', {ok: 'value'});
    });
    it('alerts if saving changes fails', function () {
      this.scope.changes = {
        some_property: {value: 'some value', transient: true},
        some_other_property: {value: 'some other value', transient: false},
        some_blank_property: {value: '', transient: true}
      };
      this.ClusterSettingsDataService.saveSettings = function(settings, success, error) {
        error('boom!');
      };
      spyOn(this.ClusterSettingsDataService, "saveSettings").and.callThrough();
      spyOn(this.AlertService, "error").and.returnValue(true);
      this.scope.save();
      expect(this.ClusterSettingsDataService.saveSettings).toHaveBeenCalledWith(
        {transient: {some_property: 'some value', some_blank_property: null}, persistent: {some_other_property: 'some other value'}},
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while saving settings', 'boom!');
    });
  });

  describe('revert', function() {
    it('reverts change', function () {
      this.scope.form = {some_setting: 'new value'};
      this.scope.settings = {some_setting: 'old value'};
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
      this.scope.form = {some_setting: 'new value'};
      this.scope.settings = {some_setting: 'value'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({some_setting: { value: 'new value', transient: true}});
    });
    it('updates value for existing change', function () {
      this.scope.changes = {some_setting: { value: 'new value', transient: true}};
      this.scope.settings = {some_setting: 'original alue'};
      this.scope.form = {some_setting: 'updated new value'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({some_setting: { value: 'updated new value', transient: true}});
    });
    it('clears changes for property', function () {
      this.scope.changes = {some_setting: { value: 'value', transient: true}};
      this.scope.settings = {some_setting: 'original value'};
      this.scope.form = {some_setting: 'original value'};
      this.scope.set('some_setting');
      expect(this.scope.changes).toEqual({});
    });
  });

});
