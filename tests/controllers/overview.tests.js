describe('OverviewController', function() {

    beforeEach(angular.mock.module('cerebro'));

    beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
        this.scope = $rootScope.$new();
        this.$http = $injector.get('$http');
        this.$window = $injector.get('$window');
        this.DataService = $injector.get('DataService');
        this.AlertService = $injector.get('AlertService');
        this.ModalService = $injector.get('ModalService');
        this.createController = function() {
            return $controller('OverviewController',
                {$scope: this.scope}, this.$http, this.$window, this.DataService, this.AlertService, this.ModalService);
        };
        this._controller = this.createController();
    }));

    it('should have intial state correctly set', function () {
        expect(this.scope.indices).toEqual(undefined);
        expect(this.scope.nodes).toEqual(undefined);
        expect(this.scope.unassigned_shards).toEqual(0);
        expect(this.scope.shardAllocation).toEqual(true);
        expect(this.scope.closed_indices).toEqual(0);
        expect(this.scope.special_indices).toEqual(0);
        expect(this.scope.shardAllocation).toEqual(true);
        expect(this.scope.expandedView).toEqual(false);
        // index filter
        expect(this.scope.indices_filter.name).toEqual('');
        expect(this.scope.indices_filter.closed).toEqual(true);
        expect(this.scope.indices_filter.special).toEqual(false);
        expect(this.scope.indices_filter.healthy).toEqual(true);
        expect(this.scope.indices_filter.sort).toEqual('name');
        expect(this.scope.indices_filter.asc).toEqual(true);
        // node filter
        expect(this.scope.nodes_filter.name).toEqual('');
    });

    describe('reflect cluster state', function() {
        it('updates information when cluster data changes',
            function() {
                spyOn(this.scope, 'setIndices').andReturn(true);
                spyOn(this.scope, 'setNodes').andReturn(true);
                var indices = ['someIndex'];
                var nodes = ['someNode'];
                spyOn(this.DataService, 'getData').andReturn(
                    {
                        indices: indices,
                        nodes: nodes,
                        unassigned_shards: 1,
                        closed_indices: 2,
                        special_indices: 3,
                        shard_allocation: true
                    }
                );
                this.scope.$digest();
                expect(this.scope.unassigned_shards).toEqual(1);
                expect(this.scope.closed_indices).toEqual(2);
                expect(this.scope.special_indices).toEqual(3);
                expect(this.scope.shardAllocation).toEqual(true);
                expect(this.scope.setIndices).toHaveBeenCalledWith(indices);
                expect(this.scope.setNodes).toHaveBeenCalledWith(nodes);
            }
        );

        it('resets info if fetching cluster data fails',
            function() {
                this.scope.unassigned_shards = 123;
                this.scope.closed_indices = 123;
                this.scope.special_indices = 123;
                this.scope.shardAllocation = false;
                this.scope.indices = ['some index'];
                this.scope.nodes = ['some node'];
                spyOn(this.scope, 'setIndices').andReturn(true);
                spyOn(this.scope, 'setNodes').andReturn(true);
                spyOn(this.DataService, 'getData').andReturn(undefined);
                this.scope.$digest();
                expect(this.scope.unassigned_shards).toEqual(0);
                expect(this.scope.closed_indices).toEqual(0);
                expect(this.scope.special_indices).toEqual(0);
                expect(this.scope.shardAllocation).toEqual(true);
                expect(this.scope.indices = undefined);
                expect(this.scope.nodes = undefined);
            }
        );
    });

    describe('cluster data navigation', function() {
        it('updates data when index name filter changes',
            function() {
                spyOn(this.DataService, 'getData').andReturn({indices: [], nodes: []});
                this.scope.$digest();
                spyOn(this.scope, 'setIndices').andReturn(true);
                spyOn(this.scope, 'setNodes').andReturn(true);
                this.scope.$digest();
                expect(this.scope.setIndices).not.toHaveBeenCalled();
                this.scope.indices_filter.name = 'a';
                this.scope.$digest();
                expect(this.scope.setIndices).toHaveBeenCalledWith([]);
            }
        );

        it('updates data when closed/open status filter changes',
            function() {
                spyOn(this.DataService, 'getData').andReturn({indices: [], nodes: []});
                this.scope.$digest();
                spyOn(this.scope, 'setIndices').andReturn(true);
                spyOn(this.scope, 'setNodes').andReturn(true);
                this.scope.$digest();
                expect(this.scope.setIndices).not.toHaveBeenCalled();
                this.scope.indices_filter.closed = false;
                this.scope.$digest();
                expect(this.scope.setIndices).toHaveBeenCalledWith([]);
            }
        );

        it('updates data when special status filter changes',
            function() {
                spyOn(this.DataService, 'getData').andReturn({indices: [], nodes: []});
                this.scope.$digest();
                spyOn(this.scope, 'setIndices').andReturn(true);
                spyOn(this.scope, 'setNodes').andReturn(true);
                this.scope.$digest();
                expect(this.scope.setIndices).not.toHaveBeenCalled();
                this.scope.indices_filter.special = true;
                this.scope.$digest();
                expect(this.scope.setIndices).toHaveBeenCalledWith([]);
            }
        );

        it('updates data when healthy status filter changes',
            function() {
                spyOn(this.DataService, 'getData').andReturn({indices: [], nodes: []});
                this.scope.$digest();
                spyOn(this.scope, 'setIndices').andReturn(true);
                spyOn(this.scope, 'setNodes').andReturn(true);
                this.scope.$digest();
                expect(this.scope.setIndices).not.toHaveBeenCalled();
                this.scope.indices_filter.healthy = false;
                this.scope.$digest();
                expect(this.scope.setIndices).toHaveBeenCalledWith([]);
            }
        );

        it('updates data when index sorting changes',
            function() {
                spyOn(this.DataService, 'getData').andReturn({indices: [], nodes: []});
                this.scope.$digest();
                spyOn(this.scope, 'setIndices').andReturn(true);
                spyOn(this.scope, 'setNodes').andReturn(true);
                this.scope.$digest();
                expect(this.scope.setIndices).not.toHaveBeenCalled();
                this.scope.indices_filter.sort = false;
                this.scope.$digest();
                expect(this.scope.setIndices).toHaveBeenCalledWith([]);
            }
        );

    });

});
