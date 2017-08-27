describe('CreateIndexController', function() {

    beforeEach(angular.mock.module('cerebro'));

    beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
        this.scope = $rootScope.$new();
        this.DataService = $injector.get('DataService');
        this.AlertService = $injector.get('AlertService');
        this.AceEditorService = $injector.get('AceEditorService');
        this.RefreshService = $injector.get('RefreshService');
        this.createController = function() {
            return $controller('CreateIndexController',
                {$scope: this.scope}, this.AlertService, this.DataService, this.AceEditorService, this.RefreshService);
        };
        this._controller = this.createController();
    }));

    describe('initial controller state', function() {
        it('should have intial state correctly set', function() {
            expect(this.scope.editor).toEqual(undefined);
            expect(this.scope.shards).toEqual('');
            expect(this.scope.replicas).toEqual('');
            expect(this.scope.name).toEqual('');
            expect(this.scope.indices).toEqual(undefined);
        });
    });

    describe('setup', function() {
        it('initializes editor and loads available indices', function () {
            var indices = ['index1', 'index2'];
            var editor = 'someFakeEditor';
            this.DataService.getIndices = function(success, error) {
                success(indices);
            };
            spyOn(this.DataService, 'getIndices').and.callThrough();
            spyOn(this.AceEditorService, 'init').and.returnValue(editor);
            this.scope.setup();
            expect(this.DataService.getIndices).toHaveBeenCalled();
            expect(this.AceEditorService.init).toHaveBeenCalled();
            expect(this.scope.indices).toEqual(indices);
            expect(this.scope.editor).toEqual(editor);
        });
    });

    describe('loadIndexMetadata', function() {
        it('correctly loads metadata from index', function () {
                    // AlertService.error('Error while loading index settings', error);
            var metadata = {settings: {some: 'settings'}, mappings: {some: 'mappings'}};
            this.DataService.getIndexMetadata = function(index, success, error) {
                success(metadata);
            };
            this.scope.editor = {setValue: function(){}};
            spyOn(this.DataService, 'getIndexMetadata').and.callThrough();
            spyOn(this.scope.editor, 'setValue').and.returnValue(true);
            this.scope.loadIndexMetadata('indexName');
            expect(this.DataService.getIndexMetadata).toHaveBeenCalledWith(
                'indexName',
                jasmine.any(Function),
                jasmine.any(Function)
            );
            expect(this.scope.editor.setValue).toHaveBeenCalledWith(JSON.stringify({settings: {some: "settings"}, mappings: {some: "mappings"}}, null, 2));
        });

        it('handles error while loading index metadata', function () {
            // AlertService.error('Error while loading index settings', error);
            this.DataService.getIndexMetadata = function(index, success, error) {
                error('some error');
            };
            spyOn(this.DataService, 'getIndexMetadata').and.callThrough();
            spyOn(this.AlertService, 'error').and.returnValue(true);
            this.scope.loadIndexMetadata('indexName');
            expect(this.DataService.getIndexMetadata).toHaveBeenCalledWith(
                'indexName',
                jasmine.any(Function),
                jasmine.any(Function)
            );
            expect(this.AlertService.error).toHaveBeenCalledWith('Error while loading index settings', 'some error');
        });
    });

    describe('createIndex', function() {
        it('correctly creates an index', function () {
            this.scope.name = 'someIndex';
            this.scope.editor = {getValue: function(){ return {};}};
            this.DataService.createIndex = function(name, metadata, success, error) {
                success('success');
            };
            spyOn(this.DataService, 'createIndex').and.callThrough();
            spyOn(this.RefreshService, 'refresh').and.returnValue(true);
            spyOn(this.AlertService, 'success').and.returnValue(true);
            this.scope.createIndex();
            expect(this.DataService.createIndex).toHaveBeenCalledWith('someIndex', {settings: {index: {}}}, jasmine.any(Function), jasmine.any(Function));
            expect(this.RefreshService.refresh).toHaveBeenCalled();
            expect(this.AlertService.success).toHaveBeenCalledWith('Index successfully created');
        });

        it('handles error while creating index', function () {
            this.scope.name = 'someIndex';
            this.scope.editor = {getValue: function(){ return {};}};
            this.DataService.createIndex = function(name, metadata, success, error) {
                error('boom!');
            };
            spyOn(this.DataService, 'createIndex').and.callThrough();
            spyOn(this.AlertService, 'error').and.returnValue(true);
            this.scope.createIndex();
            expect(this.DataService.createIndex).toHaveBeenCalledWith('someIndex', {settings: {index: {}}}, jasmine.any(Function), jasmine.any(Function));
            expect(this.AlertService.error).toHaveBeenCalledWith('Error while creating index', 'boom!');
        });

        it('merges shards and replicas settings into metadata', function () {
            this.scope.name = 'someIndex';
            this.scope.shards = '18';
            this.scope.replicas = '10';
            this.scope.editor = {getValue: function(){ return {};}};
            this.DataService.createIndex = function(name, metadata, success, error) {
                success('success');
            };
            spyOn(this.DataService, 'createIndex').and.callThrough();
            spyOn(this.RefreshService, 'refresh').and.returnValue(true);
            spyOn(this.AlertService, 'success').and.returnValue(true);
            this.scope.createIndex();
            expect(this.DataService.createIndex).toHaveBeenCalledWith('someIndex', {settings: {index: {number_of_shards: '18', number_of_replicas: '10'}}}, jasmine.any(Function), jasmine.any(Function));
            expect(this.RefreshService.refresh).toHaveBeenCalled();
            expect(this.AlertService.success).toHaveBeenCalledWith('Index successfully created');
        });

        it('prevents creation when name is empty', function () {
            this.scope.name = '';
            spyOn(this.AlertService, 'error').and.returnValue(true);
            this.scope.createIndex();
            expect(this.AlertService.error).toHaveBeenCalledWith('You must specify a valid index name');
        });

        it('prevents creation when settings is not valid json', function () {
            this.scope.name = 'someName';
            this.scope.editor = {getValue: function(){ throw 'boooom!';}};
            spyOn(this.AlertService, 'error').and.returnValue(true);
            spyOn(this.scope.editor, 'getValue').and.callThrough();
            this.scope.createIndex();
            expect(this.AlertService.error).toHaveBeenCalledWith('Malformed settings', 'boooom!');
        });
    });

});
