describe('SnapshotController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.AlertService = $injector.get('AlertService');
    this.SnapshotsDataService = $injector.get('SnapshotsDataService');
    this.ModalService = $injector.get('ModalService');

    this.createController = function() {
      return $controller('SnapshotController',
        {$scope: this.scope}, this.SnapshotsDataService, this.AlertService, this.ModalService);
    };
    this._controller = this.createController();
  }));

  describe('setup', function() {
    it('loads repositories and indices', function() {
      var data = {indices: ['idx 1', 'idx 2'], repositories: ['repo 1', 'repo 2']};
      this.SnapshotsDataService.load = function(success, error) {
        success(data);
      }
      spyOn(this.SnapshotsDataService, 'load').andCallThrough();
      this.scope.setup();
      expect(this.SnapshotsDataService.load).toHaveBeenCalled();
      expect(this.scope.repositories).toEqual(['repo 1', 'repo 2']);
      expect(this.scope.indices).toEqual(['idx 1', 'idx 2']);
    });
    it('handles error while loading data', function() {
      this.SnapshotsDataService.load = function(success, error) {
        error("kaput");
      }
      spyOn(this.SnapshotsDataService, 'load').andCallThrough();
      spyOn(this.AlertService, 'error').andReturn();
      this.scope.setup();
      expect(this.SnapshotsDataService.load).toHaveBeenCalled();
      expect(this.scope.repositories).toEqual([]);
      expect(this.scope.indices).toEqual([]);
      expect(this.AlertService.error).toHaveBeenCalledWith('Error loading repositories', 'kaput');
    });
  });

  describe('restore', function() {
    it('restores a snapshot', function() {
      this.SnapshotsDataService.restore = function(
        repository,
        snapshot,
        renamePattern,
        renameReplacement,
        ignoreUnavailable,
        includeAliases,
        includeGlobalState,
        indices,
        success,
        error) {
        success('ack');
      }
      spyOn(this.SnapshotsDataService, 'restore').andCallThrough();
      spyOn(this.AlertService, 'info').andReturn();
      var form = {includeAliases: false, includeGlobalState: true, ignoreUnavailable: true};
      this.scope.restore('repo name', 'the snap', form);
      expect(this.SnapshotsDataService.restore).toHaveBeenCalledWith('repo name', 'the snap', undefined, undefined, true, false, true, undefined, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.info).toHaveBeenCalledWith('Snapshot successfully restored', 'ack');
    });

    it('fails to restore snapshot', function() {
      this.SnapshotsDataService.restore = function(
        repository,
        snapshot,
        renamePattern,
        renameReplacement,
        ignoreUnavailable,
        includeAliases,
        includeGlobalState,
        indices,
        success,
        error) {
        error('kaput');
      }
      spyOn(this.SnapshotsDataService, 'restore').andCallThrough();
      spyOn(this.AlertService, 'error').andReturn();
      var form = {includeAliases: false, includeGlobalState: true, ignoreUnavailable: true};
      this.scope.restore('repo name', 'the snap', form);
      expect(this.SnapshotsDataService.restore).toHaveBeenCalledWith('repo name', 'the snap', undefined, undefined, true, false, true, undefined, jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error restoring snapshot', 'kaput');
    });
  });

  describe('create', function() {
    it('creates a snapshot', function() {
      this.SnapshotsDataService.create = function(
        repository,
        snapshot,
        ignoreUnavailable,
        includeGlobalState,
        indices,
        success,
        error) {
        success('ack');
      }
      this.scope.repository = 'currentRepo';
      spyOn(this.SnapshotsDataService, 'create').andCallThrough();
      spyOn(this.AlertService, 'info').andReturn();
      spyOn(this.scope, 'loadSnapshots').andReturn();
      this.scope.create('repo name', 'the snap', false, true, []);
      expect(this.SnapshotsDataService.create).toHaveBeenCalledWith('repo name', 'the snap', false, true, [], jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.loadSnapshots).toHaveBeenCalledWith('currentRepo');
      expect(this.AlertService.info).toHaveBeenCalledWith('Snapshot successfully created', 'ack');
    });

    it('fails to create snapshot', function() {
      this.SnapshotsDataService.create = function(
        repository,
        snapshot,
        ignoreUnavailable,
        includeGlobalState,
        indices,
        success,
        error) {
        error('kaput!');
      }
      spyOn(this.SnapshotsDataService, 'create').andCallThrough();
      spyOn(this.AlertService, 'error').andReturn();
      this.scope.create('repo name', 'the snap', false, true, []);
      expect(this.SnapshotsDataService.create).toHaveBeenCalledWith('repo name', 'the snap', false, true, [], jasmine.any(Function), jasmine.any(Function));
      expect(this.AlertService.error).toHaveBeenCalledWith('Error creating snapshot', 'kaput!');
    });
  });

  describe('loadSnapshots', function() {
      it('loads snapshots', function() {
        var snaps = ['snap 1', 'snap 2'];
        this.SnapshotsDataService.loadSnapshots = function(
          repository,
          success,
          error) {
          success(snaps);
        }
        spyOn(this.SnapshotsDataService, 'loadSnapshots').andCallThrough();
        this.scope.loadSnapshots('repo name');
        expect(this.SnapshotsDataService.loadSnapshots).toHaveBeenCalledWith('repo name', jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.snapshots).toEqual(snaps);
      });

      it('skip loading snapshots if no repository selected', function() {
        spyOn(this.SnapshotsDataService, 'loadSnapshots').andCallThrough();
        this.scope.loadSnapshots();
        expect(this.SnapshotsDataService.loadSnapshots).not.toHaveBeenCalled();
      });

      it('fails loading snapshots', function() {
        this.SnapshotsDataService.loadSnapshots = function(
          repository,
          success,
          error) {
          error('pff');
        }
        spyOn(this.SnapshotsDataService, 'loadSnapshots').andCallThrough();
        spyOn(this.AlertService, 'error').andReturn();
        this.scope.loadSnapshots('repo name');
        expect(this.SnapshotsDataService.loadSnapshots).toHaveBeenCalledWith('repo name', jasmine.any(Function), jasmine.any(Function));
        expect(this.AlertService.error).toHaveBeenCalledWith('Error loading snapshots', 'pff');
      });
    });

  describe('watch repository', function() {
    it('loads snapshots', function() {
      spyOn(this.scope, 'loadSnapshots').andReturn();
      this.scope.repository = 'new value';
      this.scope.$digest();
      expect(this.scope.loadSnapshots).toHaveBeenCalled();
    });
  });

});
