describe('NavbarController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.$http = $injector.get('$http');
    this.$sce = $injector.get('$sce');
    this.DataService = $injector.get('DataService');
    this.PageService = $injector.get('PageService');
    this.RefreshService = $injector.get('RefreshService');
    this.createController = function() {
      return $controller('NavbarController',
        {$scope: this.scope}, this.$http, this.PageService, this.DataService, this.RefreshService);
    };
    this._controller = this.createController();
  }));

  it('should have intial state correctly set', function() {
    expect(this.scope.status).toEqual(undefined);
    expect(this.scope.cluster_name).toEqual(undefined);
    expect(this.scope.host).toEqual(undefined);
  });

  describe('reflect cluster state', function() {
    it('updates information when cluster data changes',
      function() {
        var data = {
          cluster_name: "elastic",
          status: "green",
          timed_out: false,
          number_of_nodes: 1,
          number_of_data_nodes: 1,
          active_primary_shards: 1,
          active_shards: 1,
          relocating_shards: 0,
          initializing_shards: 0,
          unassigned_shards: 0,
          delayed_unassigned_shards: 0,
          number_of_pending_tasks: 0,
          number_of_in_flight_fetch: 0,
          task_max_waiting_in_queue_millis: 0,
          active_shards_percent_as_number: 100.0
        };
        this.DataService.getNavbarData = function(success, error) {
          success(data);
        };
        spyOn(this.DataService, 'getHost').and.returnValue('somehost');
        spyOn(this.DataService, 'getNavbarData').and.callThrough();
        this.scope.$digest();
        expect(this.DataService.getNavbarData).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.status).toEqual('green');
        expect(this.scope.cluster_name).toEqual('elastic');
        expect(this.scope.host).toEqual('somehost');
      }
    );

    it('reset current state if fetching data fails',
      function() {
        this.DataService.getNavbarData = function(success, error) {
          error('kaput');
        };
        spyOn(this.DataService, 'getNavbarData').and.callThrough();
        this.scope.$digest();
        expect(this.DataService.getNavbarData).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.status).toEqual(undefined);
        expect(this.scope.cluster_name).toEqual(undefined);
        expect(this.scope.host).toEqual(undefined);
      }
    );
  });

});
