describe('RestController', function() {

    beforeEach(angular.mock.module('cerebro'));

    beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
        this.scope = $rootScope.$new();
        this.$http = $injector.get('$http');
        this.$sce = $injector.get('$sce');
        this.RestDataService = $injector.get('RestDataService');
        this.AlertService = $injector.get('AlertService');
        this.ModalService = $injector.get('ModalService');
        this.AceEditorService = $injector.get('AceEditorService');
        this.createController = function() {
            return $controller('RestController',
                {$scope: this.scope}, this.$http, this.$window, this.RestDataService, this.AlertService, this.ModalService, this.AceEditorService);
        };
        this._controller = this.createController();
    }));

    it('should have intial state correctly set', function () {
        expect(this.scope.response).toEqual(undefined);
        expect(this.scope.mappings).toEqual(undefined);
        expect(this.scope.method).toEqual("POST");
        expect(this.scope.path).toEqual("");
        expect(this.scope.options).toEqual([]);
    });

    describe('setup', function() {
        it('initializes Ace editor', function () {
            var fakeEditor = {setValue: function() {}};
            spyOn(this.AceEditorService, "init").andReturn(fakeEditor);
            this.scope.setup();
            expect(this.AceEditorService.init).toHaveBeenCalledWith('rest-client-editor');
            expect(this.scope.editor).toEqual(fakeEditor);
        });

        it('loads mappings', function () {
            var fakeEditor = {setValue: function() {}};
            spyOn(this.AceEditorService, "init").andReturn(fakeEditor);
            this.RestDataService.load = function(success, error) {
              success({"mappings":"mappingsValue"});
            };
            spyOn(this.RestDataService, "load").andCallThrough();
            spyOn(this.scope, "updateOptions").andReturn();
            this.scope.setup();
            expect(this.RestDataService.load).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
            expect(this.scope.mappings).toEqual({"mappings":"mappingsValue"});
            expect(this.scope.updateOptions).toHaveBeenCalled();
        });

        it('alerts when loading mappings fail', function () {
            var fakeEditor = {setValue: function() {}};
            spyOn(this.AceEditorService, "init").andReturn(fakeEditor);
            this.RestDataService.load = function(success, error) {
                error("some reason");
            };
            spyOn(this.RestDataService, "load").andCallThrough();
            spyOn(this.AlertService, "error").andReturn();
            spyOn(this.scope, "updateOptions").andReturn();
            this.scope.setup();
            expect(this.scope.updateOptions).not.toHaveBeenCalled();
            expect(this.AlertService.error).toHaveBeenCalledWith('Error while loading cluster mappings', 'some reason');
        });
    });

    describe('execute', function() {
        it('cleans response when executing a request', function () {
            this.scope.response = "{}";
            expect(this.scope.response).toEqual("{}");
            this.scope.editor = {
                getValue: function () {
                    return "";
                }
            };
            spyOn(this.RestDataService, "load").andReturn();
            this.scope.execute();
            expect(this.scope.response).toEqual(undefined);
        });

        it('uses path, method and body from ace editor', function () {
            this.scope.editor = {
                getValue: function () {
                    return "some value";
                }
            };
            spyOn(this.RestDataService, "execute").andReturn();
            this.scope.execute();
            expect(this.RestDataService.execute).toHaveBeenCalledWith("POST", "", "some value", jasmine.any(Function), jasmine.any(Function));
        });
    });

    describe('updateOptions', function() {
        it('loads all possible autocompletion options', function () {
            this.scope.mappings = {};
            this.scope.updateOptions("");
            expect(this.scope.options).toEqual(['_msearch', '_search', '_suggest']);
        });
        it('skip autocompletion if mappings is absent', function () {
            this.scope.mappings = undefined;
            this.scope.updateOptions("");
            expect(this.scope.options).toEqual([]);
        });
    });

});
