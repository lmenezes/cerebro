"use strict";

describe("ClusterChangesService", function() {

  var service;
  var $document;

  beforeEach(module("cerebro"));

  beforeEach(angular.mock.inject(function($rootScope, $injector, $httpBackend) {
    this.$rootScope = $rootScope;
    this.DataService = $injector.get('DataService');
    this.RefreshService = $injector.get('RefreshService');
    this.AlertService = $injector.get('AlertService');
    $httpBackend.whenGET('connect.html').respond(200, {}); // Should not really be needed...
  }));

  beforeEach(inject(function(_ClusterChangesService_) {
    service = _ClusterChangesService_;
  }));

  it("should not alert changes when data is loaded for the first time", function() {
    var indices = ['1', '2', '3'];
    var nodes = ['4', '5', '6'];
    this.DataService.clusterChanges = function(success, error) {
      success({cluster_name: 'es', indices: indices, nodes: nodes});
    };
    spyOn(this.DataService, 'clusterChanges').and.callThrough();
    spyOn(this.AlertService, 'warn').and.returnValue();
    spyOn(this.AlertService, 'info').and.returnValue();
    this.$rootScope.$digest();
    expect(this.DataService.clusterChanges).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
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
    this.DataService.clusterChanges = function(success, error) {
      success({cluster_name: 'es', indices: indices, nodes: nodes});
    };
    spyOn(this.DataService, 'clusterChanges').and.callThrough();
    spyOn(this.AlertService, 'warn').and.returnValue();
    spyOn(this.AlertService, 'info').and.returnValue();
    this.$rootScope.$digest(); // will store initial data
    indices = ['index2']; // changes list of indices
    nodes = ['node2']; // changes list of nodes
    lastUpdate = 2; // force a refresh
    this.$rootScope.$digest();
    expect(this.DataService.clusterChanges).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(this.AlertService.warn).toHaveBeenCalledWith('1 indices deleted', 'index');
    expect(this.AlertService.warn).toHaveBeenCalledWith('1 nodes left the cluster', 'node');
    expect(this.AlertService.info).toHaveBeenCalledWith('1 indices created', 'index2');
    expect(this.AlertService.info).toHaveBeenCalledWith('1 nodes joined the cluster', 'node2');
  });

  it("should NOT alert changes to nodes and indices", function() {
    var lastUpdate = 1;
    var indices = ['index'];
    var nodes = ['node'];
    var clusterName = 'es';
    this.RefreshService.lastUpdate = function() {
      return lastUpdate;
    };
    this.DataService.clusterChanges = function(success, error) {
      success({cluster_name: clusterName, indices: indices, nodes: nodes});
    };
    spyOn(this.DataService, 'clusterChanges').and.callThrough();
    spyOn(this.AlertService, 'warn').and.returnValue();
    spyOn(this.AlertService, 'info').and.returnValue();
    this.$rootScope.$digest(); // will store initial data
    indices = ['index2']; // changes list of indices
    nodes = ['node2']; // changes list of nodes
    clusterName = 'es2';
    lastUpdate = 2; // force a refresh
    this.$rootScope.$digest();
    expect(this.DataService.clusterChanges).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    expect(this.AlertService.warn).not.toHaveBeenCalled();
    expect(this.AlertService.warn).not.toHaveBeenCalled();
    expect(this.AlertService.info).not.toHaveBeenCalled();
    expect(this.AlertService.info).not.toHaveBeenCalled();
  });

});
