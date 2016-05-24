describe('NavbarController', function() {

    beforeEach(angular.mock.module('cerebro'));

    beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
        this.scope = $rootScope.$new();
        this.$http = $injector.get('$http');
        this.$sce = $injector.get('$sce');
        this.DataService = $injector.get('DataService');
        this.PageService = $injector.get('PageService');
        this.createController = function() {
            return $controller('NavbarController',
                {$scope: this.scope}, this.$http, this.PageService, this.DataService);
        };
        this._controller = this.createController();
    }));

    it('should have intial state correctly set', function () {
        expect(this.scope.status).toEqual(undefined);
        expect(this.scope.cluster_name).toEqual(undefined);
        expect(this.scope.host).toEqual(undefined);
    });

    describe('reflect cluster state', function() {
        it('updates information when cluster data changes',
            function() {
                spyOn(this.DataService, 'getData').andReturn({status: 'green', cluster_name: 'some name'});
                spyOn(this.DataService, 'getHost').andReturn("host name");
                this.scope.$digest();
                expect(this.scope.status).toEqual('green');
                expect(this.scope.cluster_name).toEqual('some name');
                expect(this.scope.host).toEqual('host name');
            });
    });

});
