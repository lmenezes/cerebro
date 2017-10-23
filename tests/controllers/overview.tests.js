describe('OverviewController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.$http = $injector.get('$http');
    this.$window = $injector.get('$window');
    this.OverviewDataService = $injector.get('OverviewDataService');
    this.AlertService = $injector.get('AlertService');
    this.ModalService = $injector.get('ModalService');
    this.RefreshService = $injector.get('RefreshService');
    this.createController = function() {
      return $controller('OverviewController',
        {$scope: this.scope}, this.$http, this.$window, this.OverviewDataService, this.AlertService, this.ModalService, this.RefreshService);
    };
    this._controller = this.createController();
  }));

  it('should have intial state correctly set', function() {
    expect(this.scope.indices).toEqual(undefined);
    expect(this.scope.nodes).toEqual(undefined);
    expect(this.scope.unassigned_shards).toEqual(0);
    expect(this.scope.initializing_shards).toEqual(0);
    expect(this.scope.relocating_shards).toEqual(0);
    expect(this.scope.shardAllocation).toEqual(true);
    expect(this.scope.closed_indices).toEqual(0);
    expect(this.scope.special_indices).toEqual(0);
    expect(this.scope.shardAllocation).toEqual(true);
    // index filter
    expect(this.scope.indices_filter.name).toEqual('');
    expect(this.scope.indices_filter.closed).toEqual(false);
    expect(this.scope.indices_filter.special).toEqual(false);
    expect(this.scope.indices_filter.healthy).toEqual(true);
    expect(this.scope.indices_filter.sort).toEqual('name');
    expect(this.scope.indices_filter.asc).toEqual(true);
    // node filter
    expect(this.scope.nodes_filter.name).toEqual('');
  });

  describe('refresh data when refresh interval is reached', function() {
    it('triggers a refresh when refresh interval is reached',
      function() {
        var lastUpdate = 1;
        this.RefreshService.lastUpdate = function() {
          return lastUpdate;
        };
        spyOn(this.RefreshService, 'lastUpdate').and.callThrough();
        spyOn(this.scope, 'refresh').and.returnValue(true);
        spyOn(this.OverviewDataService, 'getOverview').and.returnValue();
        this.scope.$digest();
        expect(this.scope.refresh.calls.count()).toEqual(1);
        this.scope.$digest(); // lastUpdate didnt change
        expect(this.scope.refresh.calls.count()).toEqual(1);
        lastUpdate = 2;
        this.scope.$digest();
        expect(this.scope.refresh.calls.count()).toEqual(2);
      }
    );
  });

  describe('refresh', function() {
    it('loads overview data',
      function() {
        var indices = ['someIndex'];
        var nodes = ['someNode'];
        var data =   {
          indices: indices,
          nodes: nodes,
          unassigned_shards: 1,
          relocating_shards: 2,
          initializing_shards: 3,
          closed_indices: 2,
          special_indices: 3,
          shard_allocation: true
        };
        this.OverviewDataService.getOverview = function(success, error) {
          success(data);
        };
        spyOn(this.OverviewDataService, 'getOverview').and.callThrough();
        spyOn(this.scope, 'setIndices').and.returnValue(true);
        spyOn(this.scope, 'setNodes').and.returnValue(true);
        this.scope.refresh();
        expect(this.OverviewDataService.getOverview).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.unassigned_shards).toEqual(1);
        expect(this.scope.initializing_shards).toEqual(3);
        expect(this.scope.relocating_shards).toEqual(2);
        expect(this.scope.closed_indices).toEqual(2);
        expect(this.scope.special_indices).toEqual(3);
        expect(this.scope.shardAllocation).toEqual(true);
        expect(this.scope.setIndices).toHaveBeenCalledWith(indices);
        expect(this.scope.setNodes).toHaveBeenCalledWith(nodes);
        expect(this.scope.data).toEqual(data);
      }
    );

    it('clears health filter if no unhealthy indices exist',
      function() {
        var data = {
          indices: ['someIndex'],
          nodes: ['someNode'],
          unassigned_shards: 0,
          relocating_shards: 0,
          initializing_shards: 0
        };
        this.OverviewDataService.getOverview = function(success, error) {
          success(data);
        };
        this.scope.indices_filter.healthy = false;
        spyOn(this.OverviewDataService, 'getOverview').and.callThrough();
        this.scope.refresh();
        expect(this.scope.indices_filter.healthy).toEqual(true);
      }
    );
    
    it('cleans state and alerts users if refreshing data fails',
      function() {
        this.OverviewDataService.getOverview = function(success, error) {
          error('kaput');
        }
        spyOn(this.OverviewDataService, 'getOverview').and.callThrough();
        spyOn(this.AlertService, 'error').and.returnValue();
        this.scope.refresh();
        expect(this.OverviewDataService.getOverview).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.unassigned_shards).toEqual(0);
        expect(this.scope.closed_indices).toEqual(0);
        expect(this.scope.special_indices).toEqual(0);
        expect(this.scope.shardAllocation).toEqual(true);
        expect(this.AlertService.error).toHaveBeenCalledWith('Error while loading data', 'kaput');
      }
    );
  });

  describe('refresh data on user input', function() {
    it('updates data when index name filter changes',
      function() {
        this.scope.data = {indices: [], nodes: []};
        spyOn(this.OverviewDataService, 'getOverview').and.returnValue(true);
        this.scope.$digest(); // loads data for the first time
        spyOn(this.scope, 'setIndices').and.returnValue(true);
        this.scope.$digest(); // nothing has changed here
        expect(this.scope.setIndices).not.toHaveBeenCalled();
        this.scope.indices_filter.name = 'a';
        this.scope.$digest(); // name changed, should trigger refresh
        expect(this.scope.setIndices).toHaveBeenCalledWith([]);
      }
    );

    it('refreshes list of indices when closed filter changes',
      function() {
        this.scope.data = {indices: [], nodes: []};
        spyOn(this.OverviewDataService, 'getOverview').and.returnValue(true);
        this.scope.$digest(); // loads data for the first time
        spyOn(this.scope, 'setIndices').and.returnValue(true);
        this.scope.$digest(); // nothing has changed here
        expect(this.scope.setIndices).not.toHaveBeenCalled();
        this.scope.indices_filter.closed = true;
        this.scope.$digest(); // closed changed, should trigger refresh
        expect(this.scope.setIndices).toHaveBeenCalledWith([]);
      }
    );

    it('refreshes list of indices when special filter changes',
      function() {
        this.scope.data = {indices: [], nodes: []};
        spyOn(this.OverviewDataService, 'getOverview').and.returnValue(true);
        this.scope.$digest(); // loads data for the first time
        spyOn(this.scope, 'setIndices').and.returnValue(true);
        this.scope.$digest(); // nothing has changed here
        expect(this.scope.setIndices).not.toHaveBeenCalled();
        this.scope.indices_filter.special = true;
        this.scope.$digest(); // special changed, should trigger refresh
        expect(this.scope.setIndices).toHaveBeenCalledWith([]);
      }
    );

    it('refreshes list of indices when healthy filter changes',
      function() {
        this.scope.data = {indices: [], nodes: []};
        spyOn(this.OverviewDataService, 'getOverview').and.returnValue(true);
        this.scope.$digest(); // loads data for the first time
        spyOn(this.scope, 'setIndices').and.returnValue(true);
        this.scope.$digest(); // nothing has changed here
        expect(this.scope.setIndices).not.toHaveBeenCalled();
        this.scope.indices_filter.healthy = false;
        this.scope.$digest(); // healthy changed, should trigger refresh
        expect(this.scope.setIndices).toHaveBeenCalledWith([]);
      }
    );

    it('refreshes list of indices when sorting changes',
      function() {
        this.scope.data = {indices: [], nodes: []};
        spyOn(this.OverviewDataService, 'getOverview').and.returnValue(true);
        this.scope.$digest(); // loads data for the first time
        spyOn(this.scope, 'setIndices').and.returnValue(true);
        this.scope.$digest(); // nothing has changed here
        expect(this.scope.setIndices).not.toHaveBeenCalled();
        this.scope.indices_filter.sort = false;
        this.scope.$digest(); // sort changed, should trigger refresh
        expect(this.scope.setIndices).toHaveBeenCalledWith([]);
      }
    );

  });

  describe('relocateShard', function() {
    it('relocates selected shard',
      function() {
        this.scope.relocatingShard = {shard: 1, index: 'i', node: 'n'};
        this.OverviewDataService.relocateShard = function(s, i, n, n2, success, e) {
          success('ok');
        };
        spyOn(this.OverviewDataService, 'relocateShard').and.callThrough();
        spyOn(this.AlertService, 'info').and.returnValue(true);
        spyOn(this.RefreshService, 'refresh').and.returnValue(true);
        this.scope.relocateShard({id: 'n2'});
        expect(this.OverviewDataService.relocateShard).toHaveBeenCalledWith(
          1, 'i', 'n', 'n2', jasmine.any(Function), jasmine.any(Function)
        );
        expect(this.RefreshService.refresh).toHaveBeenCalled();
        expect(this.AlertService.info).toHaveBeenCalledWith(
          'Relocation successfully started', 'ok'
        );
        expect(this.scope.relocatingShard).toEqual(undefined);
      }
    );
    it('alerts if relocation fails',
      function() {
        var shard = {shard: 1, index: 'i', node: 'n'};
        this.scope.relocatingShard = shard;
        this.OverviewDataService.relocateShard = function(s, i, n, n2, s2, error) {
          error('ko');
        };
        spyOn(this.OverviewDataService, 'relocateShard').and.callThrough();
        spyOn(this.AlertService, 'error').and.returnValue(true);
        this.scope.relocateShard({id: 'n2'});
        expect(this.OverviewDataService.relocateShard).toHaveBeenCalledWith(
          1, 'i', 'n', 'n2', jasmine.any(Function), jasmine.any(Function)
        );
        expect(this.AlertService.error).toHaveBeenCalledWith(
          'Error while starting relocation', 'ko'
        );
        expect(this.scope.relocatingShard).toEqual(shard);
      }
    );
  });

  describe('canReceiveShard', function() {
    it('can receive if same index and different node',
      function() {
        var index = {name: 'i', shards: {n: [{shard: 1}]}};
        this.scope.relocatingShard = {shard: 1, index: 'i', node: 'n'};
        var receive = this.scope.canReceiveShard(index, {id: 'n2'});
        expect(receive).toEqual(true);
      }
    );
    it('cannot receive if same index and different node but containing shard',
      function() {
        var index = {name: 'i', shards: {n: [{shard: 1}], n2: [{shard: 1}]}};
        this.scope.relocatingShard = {shard: 1, index: 'i', node: 'n'};
        var receive = this.scope.canReceiveShard(index, {id: 'n2'});
        expect(receive).toEqual(false);
      }
    );
    it('cannot receive if same node',
      function() {
        var index = {name: 'i', shards: {n: [{shard: 1}]}};
        this.scope.relocatingShard = {shard: 1, index: 'i2', node: 'n'};
        var receive = this.scope.canReceiveShard(index, {id: 'n'});
        expect(receive).toEqual(false);
      }
    );
    it('cannot receive if different index',
      function() {
        var index = {name: 'i2', shards: {n: [{shard: 1}]}};
        this.scope.relocatingShard = {shard: 1, index: 'i', node: 'n'};
        var receive = this.scope.canReceiveShard(index, {id: 'n2'});
        expect(receive).toEqual(false);
      }
    );
  });

  describe('indexStats', function() {
    it('displays index stats',
      function() {
        spyOn(this.OverviewDataService, 'indexStats').and.returnValue();
        this.scope.indexStats('idx');
        expect(this.OverviewDataService.indexStats).toHaveBeenCalledWith(
          'idx',
          jasmine.any(Function),
          jasmine.any(Function)
        );
      }
    );
  });

});
