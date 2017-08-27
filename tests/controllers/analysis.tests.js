describe('AnalysisController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.$location = $injector.get('$location');
    this.$timeout = $injector.get('$timeout');
    this.AnalysisDataService = $injector.get('AnalysisDataService');
    this.AlertService = $injector.get('AlertService');
    this.createController = function() {
      return $controller('AnalysisController',
        {$scope: this.scope}, this.$location, this.$timeout, this.AlertService, this.AnalysisDataService);
    };
    this._controller = this.createController();
  }));

  it('should have intial state correctly set', function () {
    expect(this.scope.analyzerAnalysis).toEqual({index: undefined, analyzer: undefined});
    expect(this.scope.propertyAnalysis).toEqual({index: undefined, field: undefined});
    expect(this.scope.indices).toEqual([]);
    expect(this.scope.fields).toEqual([]);
    expect(this.scope.analyzers).toEqual([]);
  });

  describe('setup', function() {
    it('loads list of open indices', function () {
      var indices = ['index1', 'index2'];
      this.AnalysisDataService.getOpenIndices = function(success, error) {
        success(indices);
      };
      spyOn(this.AnalysisDataService, "getOpenIndices").and.callThrough();
      this.scope.setup();
      expect(this.AnalysisDataService.getOpenIndices).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.indices).toEqual(indices);
    });

    it('warns in case loading indices fails', function () {
      this.AnalysisDataService.getOpenIndices = function(success, error) {
        error('kaput');
      };
      spyOn(this.AnalysisDataService, "getOpenIndices").and.callThrough();
      spyOn(this.AlertService, "error").and.callThrough();
      this.scope.setup();
      expect(this.AnalysisDataService.getOpenIndices).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error loading indices', 'kaput');
    });
  });

  describe('loadAnalyzers', function() {
    it('loads analyzers for given index', function () {
      var analyzers = ['analyzer', 'analyzer2'];
      this.AnalysisDataService.getIndexAnalyzers = function(index, success, error) {
        success(analyzers);
      };
      spyOn(this.AnalysisDataService, "getIndexAnalyzers").and.callThrough();
      this.scope.loadAnalyzers('some index');
      expect(this.AnalysisDataService.getIndexAnalyzers).toHaveBeenCalledWith('some index', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.analyzers).toEqual(analyzers);
    });

    it('alerts about error loading analyzers', function () {
      this.AnalysisDataService.getIndexAnalyzers = function(index, success, error) {
        error('kaput');
      };
      spyOn(this.AnalysisDataService, "getIndexAnalyzers").and.callThrough();
      spyOn(this.AlertService, "error").and.callThrough();
      this.scope.loadAnalyzers('some index');
      expect(this.AnalysisDataService.getIndexAnalyzers).toHaveBeenCalledWith('some index', jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error loading index analyzers', 'kaput');
    });

    it('resets analyzers in case index analyzers fail to load', function () {
      this.AnalysisDataService.getIndexAnalyzers = function(index, success, error) {
        error('kaput');
      };
      this.scope.analyzers = ['one'];
      spyOn(this.AnalysisDataService, "getIndexAnalyzers").and.callThrough();
      this.scope.loadAnalyzers('some index');
      expect(this.AnalysisDataService.getIndexAnalyzers).toHaveBeenCalledWith('some index', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.analyzers).toEqual([]);
    });
  });

  describe('loadFields', function() {
    it('loads fields for given index', function () {
      var fields = ['field1', 'field2'];
      this.AnalysisDataService.getIndexFields = function(index, success, error) {
        success(fields);
      };
      spyOn(this.AnalysisDataService, "getIndexFields").and.callThrough();
      this.scope.loadFields('some index');
      expect(this.AnalysisDataService.getIndexFields).toHaveBeenCalledWith('some index', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.fields).toEqual(fields);
    });

    it('alerts about error loading analyzers', function () {
      this.AnalysisDataService.getIndexFields = function(index, success, error) {
        error('kaput');
      };
      spyOn(this.AnalysisDataService, "getIndexFields").and.callThrough();
      spyOn(this.AlertService, "error").and.callThrough();
      this.scope.loadFields('some index');
      expect(this.AnalysisDataService.getIndexFields).toHaveBeenCalledWith('some index', jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error loading index fields', 'kaput');
    });

    it('resets analyzers in case index analyzers fail to load', function () {
      this.AnalysisDataService.getIndexFields = function(index, success, error) {
        error('kaput');
      };
      this.scope.analyzers = ['one'];
      spyOn(this.AnalysisDataService, "getIndexFields").and.callThrough();
      this.scope.loadFields('some index');
      expect(this.AnalysisDataService.getIndexFields).toHaveBeenCalledWith('some index', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.fields).toEqual([]);
    });
  });

  describe('analyzeByField', function() {
    it('analyzes text by field', function () {
      var tokens = ['t', 't2'];
      this.AnalysisDataService.analyzeByField = function(index, field, text, success, error) {
        success(tokens);
      };
      spyOn(this.AnalysisDataService, "analyzeByField").and.callThrough();
      this.scope.analyzeByField('idx', 'fld', 'txt');
      expect(this.AnalysisDataService.analyzeByField).toHaveBeenCalledWith('idx', 'fld', 'txt', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.field_tokens).toEqual(tokens);
    });

    it('alerts about error during analysis', function () {
      this.AnalysisDataService.analyzeByField = function(index, field, text, success, error) {
        error('kaput');
      };
      spyOn(this.AnalysisDataService, "analyzeByField").and.callThrough();
      spyOn(this.AlertService, "error").and.callThrough();
      this.scope.analyzeByField('idx', 'fld', 'txt');
      expect(this.AnalysisDataService.analyzeByField).toHaveBeenCalledWith('idx', 'fld', 'txt', jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error analyzing text by field', 'kaput');
    });

    it('resets analyzers in case index analyzers fail to load', function () {
      this.AnalysisDataService.analyzeByField = function(index, field, text, success, error) {
        error('kaput');
      };
      spyOn(this.AnalysisDataService, "analyzeByField").and.callThrough();
      this.scope.analyzeByField('idx', 'fld', 'txt');
      expect(this.AnalysisDataService.analyzeByField).toHaveBeenCalledWith('idx', 'fld', 'txt', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.field_tokens).toEqual(undefined);
    });
  });

  describe('analyzeByAnalyzer', function() {
    it('analyzes text', function () {
      var tokens = ['t', 't2'];
      this.AnalysisDataService.analyzeByAnalyzer = function(index, analyzer, text, success, error) {
        success(tokens);
      };
      spyOn(this.AnalysisDataService, "analyzeByAnalyzer").and.callThrough();
      this.scope.analyzeByAnalyzer('idx', 'fld', 'txt');
      expect(this.AnalysisDataService.analyzeByAnalyzer).toHaveBeenCalledWith('idx', 'fld', 'txt', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.analyzer_tokens).toEqual(tokens);
    });

    it('alerts about error during analysis', function () {
      this.AnalysisDataService.analyzeByAnalyzer = function(index, analyzer, text, success, error) {
        error('kaput');
      };
      spyOn(this.AnalysisDataService, "analyzeByAnalyzer").and.callThrough();
      spyOn(this.AlertService, "error").and.callThrough();
      this.scope.analyzeByAnalyzer('idx', 'fld', 'txt');
      expect(this.AnalysisDataService.analyzeByAnalyzer).toHaveBeenCalledWith('idx', 'fld', 'txt', jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error analyzing text by analyzer', 'kaput');
    });

    it('resets analyzers in case index analyzers fail to load', function () {
      this.AnalysisDataService.analyzeByAnalyzer = function(index, analyzer, text, success, error) {
        error('kaput');
      };
      spyOn(this.AnalysisDataService, "analyzeByAnalyzer").and.callThrough();
      this.scope.analyzeByAnalyzer('idx', 'fld', 'txt');
      expect(this.AnalysisDataService.analyzeByAnalyzer).toHaveBeenCalledWith('idx', 'fld', 'txt', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.analyzer_tokens).toEqual(undefined);
    });
  });

});
