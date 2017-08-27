describe('CatController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.AlertService = $injector.get('AlertService');
    this.CatDataService = $injector.get('CatDataService');

    this.createController = function() {
      return $controller('CatController',
        {$scope: this.scope}, this.CatDataService, this.AlertService);
    };
    this._controller = this.createController();
  }));

  describe('setup', function() {
    it('has correct initial state', function() {
      expect(this.scope.headers).toEqual(undefined);
      expect(this.scope.data).toEqual(undefined);
      expect(this.scope.sortCol).toEqual(undefined);
      expect(this.scope.sortAsc).toEqual(true);
      expect(this.scope.api).toEqual(undefined);
      expect(this.scope.apis).toEqual([
            'aliases',
            'allocation',
            'count',
            'fielddata',
            'health',
            'indices',
            'master',
            'nodeattrs',
            'nodes',
            'pending tasks',
            'plugins',
            'recovery',
            'repositories',
            'thread pool',
            'shards',
            'segments'
      ])
    });
  });

  describe('get', function() {
    it('executes cat request', function() {
      var data = [{header: 'value', header2: 'value 2'}];
      this.CatDataService.get = function(api, success, error) {
        success(data);
      }
      spyOn(this.CatDataService, 'get').and.callThrough();
      spyOn(this.scope, 'sort').and.returnValue();
      this.scope.get('aliases');
      expect(this.CatDataService.get).toHaveBeenCalledWith(
        'aliases',
        jasmine.any(Function),
        jasmine.any(Function)
      );
      expect(this.scope.headers).toEqual(['header', 'header2']);
      expect(this.scope.data).toEqual(data);
      expect(this.scope.sort).toHaveBeenCalledWith('header')
    });
    it('replaces whitespaces with _ before requesting', function() {
      var data = [{header: 'value', header2: 'value 2'}];
      this.CatDataService.get = function(api, success, error) {
        success(data);
      }
      spyOn(this.CatDataService, 'get').and.callThrough();
      this.scope.get('thread pool');
      expect(this.CatDataService.get).toHaveBeenCalledWith(
        'thread_pool',
        jasmine.any(Function),
        jasmine.any(Function)
      );
    });
    it('cleans up in case of empty response', function() {
      this.scope.headers = [1, 2, 3];
      this.scope.data = [1, 2, 3];
      this.CatDataService.get = function(api, success, error) {
        success([]);
      };
      spyOn(this.CatDataService, 'get').and.callThrough();
      this.scope.get('foo');
      expect(this.scope.headers).toEqual([]);
      expect(this.scope.data).toEqual([]);
    });
    it('alerts in case of failure', function() {
      this.CatDataService.get = function(api, success, error) {
        error('failed!');
      }
      spyOn(this.AlertService, 'error').and.callThrough();
      spyOn(this.CatDataService, 'get').and.callThrough();
      this.scope.get('foo');
      expect(this.AlertService.error).toHaveBeenCalledWith('Error executing request', 'failed!');
    });
  });

  describe('sort', function() {
    it('sets sort column', function() {
      this.scope.sort('column1');
      expect(this.scope.sortCol).toEqual('column1');
      expect(this.scope.sortAsc).toEqual(true);
    });
    it('reverses sort direction if sorting on same column', function() {
      this.scope.sortCol = 'column1';
      this.scope.sortAsc = true;
      this.scope.sort('column1');
      expect(this.scope.sortCol).toEqual('column1');
      expect(this.scope.sortAsc).toEqual(false);
    });
    it('restores sorting direction if sorting on a new column', function() {
      this.scope.sortCol = 'column1';
      this.scope.sortAsc = false;
      this.scope.sort('column2');
      expect(this.scope.sortCol).toEqual('column2');
      expect(this.scope.sortAsc).toEqual(true);
    });
  });

});
