describe('NodesController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.AlertService = $injector.get('AlertService');
    this.NodesDataService = $injector.get('NodesDataService');
    this.RefreshService = $injector.get('RefreshService');

    this.createController = function() {
      return $controller('NodesController',
        {$scope: this.scope}, this.NodesDataService, this.AlertService, this.RefreshService);
    };
    this._controller = this.createController();
  }));

  describe('setup', function() {
    it('has correct initial state', function() {
      expect(this.scope._nodes).toEqual(undefined);
      expect(this.scope.nodes).toEqual(undefined);
      expect(this.scope.sortBy).toEqual('name');
      expect(this.scope.reverse).toEqual(false);
    });
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
        spyOn(this.NodesDataService, 'load').and.returnValue();
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
    it('loads nodes data',
      function() {
        var nodes = [{name:'node1', master: true, data: true, client: false}];
        this.NodesDataService.load = function(success, error) {
          success(nodes);
        };
        spyOn(this.NodesDataService, 'load').and.callThrough();
        spyOn(this.scope, 'setNodes').and.callThrough();
        spyOn(this.scope, 'refreshVisibleNodes').and.callThrough();
        this.scope.refresh();
        expect(this.NodesDataService.load).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.setNodes).toHaveBeenCalled();
        expect(this.scope.refreshVisibleNodes).toHaveBeenCalled();
        expect(this.scope._nodes).toEqual(nodes);
        expect(this.scope.nodes).toEqual(nodes);
      }
    );
    it('clears nodes data',
      function() {
        this.NodesDataService.load = function(success, error) {
          error('pown');
        };
        spyOn(this.NodesDataService, 'load').and.callThrough();
        spyOn(this.scope, 'refreshVisibleNodes').and.callThrough();
        spyOn(this.scope, 'setNodes').and.callThrough();
        this.scope.refresh();
        expect(this.NodesDataService.load).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.refreshVisibleNodes).toHaveBeenCalled();
        expect(this.scope.setNodes).toHaveBeenCalled();
        expect(this.scope._nodes).toEqual(undefined);
        expect(this.scope.nodes).toEqual(undefined);
      }
    );
  });

  describe('setSortBy', function() {
    it('sets new sorting field with',
      function() {
        this.scope.setSortBy('someField');
        expect(this.scope.sortBy).toEqual('someField');
        expect(this.scope.reverse).toEqual(false);
      }
    );
    it('inverses direction if resorting by current field',
      function() {
        this.scope.sortBy = 'someField';
        this.scope.reverse = false;
        this.scope.setSortBy('someField');
        expect(this.scope.sortBy).toEqual('someField');
        expect(this.scope.reverse).toEqual(true);
      }
    );
  });

  describe('setNodes', function() {
    it('stores the new list of nodes and refreshes the visible nodes',
      function() {
      var nodes = ['someValue'];
        spyOn(this.scope, 'refreshVisibleNodes').and.returnValue(true);
        this.scope.setNodes(nodes);
        expect(this.scope._nodes).toEqual(nodes);
        expect(this.scope.refreshVisibleNodes).toHaveBeenCalled();
      }
    );
  });

  describe('refreshVisibleNodes', function() {
    it('refresh list of visible nodes by applying the filter to the complete list',
      function() {
        var nodes = [
          {name: 'a', master: true, data: true, client: false},
          {name: 'b', master: true, data: true, client: false}
        ];
        this.scope.filter.name = 'b';
        this.scope._nodes = nodes;
        this.scope.nodes = undefined;
        this.scope.refreshVisibleNodes();
        expect(this.scope.nodes).toEqual(nodes.slice(1, 2));
      }
    );
  });

  describe('watch filter', function() {
    it('refreshes list of visible nodes when filter changes',
      function() {
        var lastUpdate = 1;
        this.RefreshService.lastUpdate = function() {
          return lastUpdate;
        };
        spyOn(this.RefreshService, 'lastUpdate').and.callThrough();
        spyOn(this.scope, 'refreshVisibleNodes').and.returnValue();
        this.scope.$digest();
        expect(this.scope.refreshVisibleNodes.calls.count()).toEqual(1);
        this.scope.$digest(); // nothing changed
        expect(this.scope.refreshVisibleNodes.calls.count()).toEqual(1);
        this.scope.filter.name = 'b';
        this.scope.$digest();
        expect(this.scope.refreshVisibleNodes.calls.count()).toEqual(2);
      }
    );
  });
});
