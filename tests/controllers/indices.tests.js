describe('NodesController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.$http = $injector.get('$http');    
    this.DataService = $injector.get('DataService');
    this.AlertService = $injector.get('AlertService');
    this.ModalService = $injector.get('ModalService');
    this.RefreshService = $injector.get('RefreshService');
    this.createController = function() {
      return $controller('NodesController',
        {$scope: this.scope}, this.$http, this.DataService, this.AlertService, this.ModalService, this.RefreshService);
    };
    this._controller = this.createController();
  }));

  it('should have intial state correctly set', function() {
    expect(this.scope.indices).toEqual(undefined);
    expect(this.scope.nodes).toEqual(undefined);
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
        spyOn(this.RefreshService, 'lastUpdate').andCallThrough();
        spyOn(this.scope, 'refresh').andReturn(true);
        spyOn(this.DataService, 'getOverview').andReturn();
        this.scope.$digest();
        expect(this.scope.refresh.callCount).toEqual(1);
        this.scope.$digest(); // lastUpdate didnt change
        expect(this.scope.refresh.callCount).toEqual(1);
        lastUpdate = 2;
        this.scope.$digest();
        expect(this.scope.refresh.callCount).toEqual(2);
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
          nodes: nodes
        };
        this.DataService.getOverview = function(success, error) {
          success(data);
        }
        spyOn(this.DataService, 'getOverview').andCallThrough();        
        spyOn(this.scope, 'setNodes').andReturn(true);
        this.scope.refresh();
        expect(this.DataService.getOverview).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.setNodes).toHaveBeenCalledWith(nodes);
        expect(this.scope.data).toEqual(data);
      }
    );
    
    it('cleans state and alerts users if refreshing data fails',
      function() {
        this.DataService.getOverview = function(success, error) {
          error('kaput');
        }
        spyOn(this.DataService, 'getOverview').andCallThrough();
        spyOn(this.AlertService, 'error').andReturn();
        this.scope.refresh();
        expect(this.DataService.getOverview).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.AlertService.error).toHaveBeenCalledWith('Error while loading data', 'kaput');
      }
    );
  });
  
});
