"use strict";

describe("ClusterChangesService", function() {

  var service;

  beforeEach(module("cerebro"));

  beforeEach(angular.mock.inject(function($rootScope, $injector) {
    this.$rootScope = $rootScope;
    this.DataService = $injector.get('DataService');
    this.RefreshService = $injector.get('RefreshService');
    this.AlertService = $injector.get('AlertService');
  }));

  beforeEach(inject(function(_ClusterChangesService_) {
    service = _ClusterChangesService_;
  }));

  it("should not alert changes when data is loaded for the first time", function() {
    var indices = ['1', '2', '3'];
    var nodes = ['4', '5', '6'];
    this.DataService.getIndices = function(success, error) {
      success(indices);
    };
    this.DataService.getNodes = function(success, error) {
      success(nodes);
    };
    spyOn(this.DataService, 'getIndices').andCallThrough();
    spyOn(this.DataService, 'getNodes').andCallThrough();
    spyOn(this.AlertService, 'warn').andReturn();
    spyOn(this.AlertService, 'info').andReturn();
    this.$rootScope.$digest();
    expect(this.DataService.getIndices).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(this.DataService.getNodes).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(this.AlertService.warn).not.toHaveBeenCalled();
    expect(this.AlertService.info).not.toHaveBeenCalled();
  });

  it("should alert changes to nodes and indices", function() {
    var lastUpdate = 1;
    var indices = ['index'];
    var nodes = ['node'];
    this.RefreshService.lastUpdate = function() {
      return lastUpdate;
    };
    this.DataService.getIndices = function(success, error) {
      success(indices);
    };
    this.DataService.getNodes = function(success, error) {
      success(nodes);
    };
    spyOn(this.DataService, 'getIndices').andCallThrough();
    spyOn(this.DataService, 'getNodes').andCallThrough();
    spyOn(this.AlertService, 'warn').andReturn();
    spyOn(this.AlertService, 'info').andReturn();
    this.$rootScope.$digest(); // will store initial data
    indices = ['index2']; // changes list of indices
    nodes = ['node2']; // changes list of nodes
    lastUpdate = 2; // force a refresh
    this.$rootScope.$digest();
    expect(this.DataService.getIndices).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(this.DataService.getNodes).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(this.AlertService.warn).toHaveBeenCalledWith('1 indices deleted', 'index');
    expect(this.AlertService.warn).toHaveBeenCalledWith('1 nodes left the cluster', 'node');
    expect(this.AlertService.info).toHaveBeenCalledWith('1 indices created', 'index2');
    expect(this.AlertService.info).toHaveBeenCalledWith('1 nodes joined the cluster', 'node2');
  });

});