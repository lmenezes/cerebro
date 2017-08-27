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
      spyOn(this.scope, 'refreshIndices').and.callThrough();
      spyOn(this.SnapshotsDataService, 'load').and.callThrough();
      this.scope.setup();
      expect(this.SnapshotsDataService.load).toHaveBeenCalled();
      expect(this.scope.repositories).toEqual(['repo 1', 'repo 2']);
      expect(this.scope.indices).toEqual(['idx 1', 'idx 2']);
      expect(this.scope.refreshIndices).toHaveBeenCalled();
    });
    it('handles error while loading data', function() {
      this.SnapshotsDataService.load = function(success, error) {
        error("kaput");
      }
      spyOn(this.SnapshotsDataService, 'load').and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue();
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
      spyOn(this.SnapshotsDataService, 'restore').and.callThrough();
      spyOn(this.AlertService, 'info').and.returnValue();
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
      spyOn(this.SnapshotsDataService, 'restore').and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue();
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
      spyOn(this.SnapshotsDataService, 'create').and.callThrough();
      spyOn(this.AlertService, 'info').and.returnValue();
      spyOn(this.scope, 'loadSnapshots').and.returnValue();
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
      spyOn(this.SnapshotsDataService, 'create').and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue();
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
        spyOn(this.SnapshotsDataService, 'loadSnapshots').and.callThrough();
        this.scope.loadSnapshots('repo name');
        expect(this.SnapshotsDataService.loadSnapshots).toHaveBeenCalledWith('repo name', jasmine.any(Function), jasmine.any(Function));
        expect(this.scope.snapshots).toEqual(snaps);
      });

      it('skip loading snapshots if no repository selected', function() {
        spyOn(this.SnapshotsDataService, 'loadSnapshots').and.callThrough();
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
        spyOn(this.SnapshotsDataService, 'loadSnapshots').and.callThrough();
        spyOn(this.AlertService, 'error').and.returnValue();
        this.scope.loadSnapshots('repo name');
        expect(this.SnapshotsDataService.loadSnapshots).toHaveBeenCalledWith('repo name', jasmine.any(Function), jasmine.any(Function));
        expect(this.AlertService.error).toHaveBeenCalledWith('Error loading snapshots', 'pff');
      });
    });

  describe('watch repository', function() {
    it('loads snapshots', function() {
      spyOn(this.scope, 'loadSnapshots').and.returnValue();
      this.scope.repository = 'new value';
      this.scope.$digest();
      expect(this.scope.loadSnapshots).toHaveBeenCalled();
    });
  });

  describe('watch showSpecialIndices', function() {
    it('loads snapshots', function() {
      spyOn(this.scope, 'refreshIndices').and.returnValue();
      this.scope.showSpecialIndices = true;
      this.scope.$digest();
      expect(this.scope.refreshIndices).toHaveBeenCalled();
    });
  });

  describe('refreshIndices', function() {
    it('exclude special indices from visible indices', function() {
      this.scope._indices = [{name: 'aaa', special: false}, {name: '.bbbb', special: true}];
      this.scope.refreshIndices();
      expect(this.scope.indices).toEqual([{name: 'aaa', special: false}]);
    });
    it('include special indices on list of visible indices', function() {
      var indices = [{name: 'aaa', special: false}, {name: '.bbbb', special: true}];
      this.scope._indices = indices;
      this.scope.showSpecialIndices = true;
      this.scope.refreshIndices();
      expect(this.scope.indices).toEqual(indices);
    });
  });

});
