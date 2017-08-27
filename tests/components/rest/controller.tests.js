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

  it('should have intial state correctly set', function() {
    expect(this.scope.response).toEqual(undefined);
    expect(this.scope.mappings).toEqual(undefined);
    expect(this.scope.method).toEqual("POST");
    expect(this.scope.path).toEqual("");
    expect(this.scope.options).toEqual([]);
  });

  describe('setup', function() {
    it('initializes Ace editor', function() {
      var fakeEditor = {
        setValue: function() {
        }
      };
      spyOn(this.AceEditorService, "init").and.returnValue(fakeEditor);
      this.scope.setup();
      expect(this.AceEditorService.init).toHaveBeenCalledWith('rest-client-editor');
      expect(this.scope.editor).toEqual(fakeEditor);
    });

    it('loads mappings & host', function() {
      var fakeEditor = {
        setValue: function() {
        }
      };
      spyOn(this.AceEditorService, "init").and.returnValue(fakeEditor);
      this.RestDataService.load = function(success, error) {
        success({"mappings": "mappingsValue", "host": "somehost"});
      };
      spyOn(this.RestDataService, "load").and.callThrough();
      spyOn(this.scope, "updateOptions").and.returnValue();
      this.scope.setup();
      expect(this.RestDataService.load).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.mappings).toEqual("mappingsValue");
      expect(this.scope.host).toEqual("somehost");
      expect(this.scope.updateOptions).toHaveBeenCalled();
    });

    it('alerts when loading mappings fail', function() {
      var fakeEditor = {
        setValue: function() {
        }
      };
      spyOn(this.AceEditorService, "init").and.returnValue(fakeEditor);
      this.RestDataService.load = function(success, error) {
        error("some reason");
      };
      spyOn(this.RestDataService, "load").and.callThrough();
      spyOn(this.AlertService, "error").and.returnValue();
      spyOn(this.scope, "updateOptions").and.returnValue();
      this.scope.setup();
      expect(this.scope.updateOptions).not.toHaveBeenCalled();
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while loading cluster mappings', 'some reason');
    });
  });

  describe('execute', function() {
    it('cleans response when executing a request', function() {
      this.scope.response = "{}";
      expect(this.scope.response).toEqual("{}");
      this.scope.editor = {
        getValue: function() {
          return '';
        },
        getStringValue: function() {
          return 'raw string';
        }
      };
      spyOn(this.RestDataService, "load").and.returnValue();
      spyOn(this.RestDataService, "execute").and.returnValue();
      this.scope.execute();
      expect(this.RestDataService.execute).toHaveBeenCalledWith('POST', '', '', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.response).toEqual(undefined);
    });

    it('sends body as string if not valid json', function() {
      this.scope.response = "{}";
      expect(this.scope.response).toEqual("{}");
      this.scope.editor = {
        getValue: function() {
          throw 'error';
        },
        getStringValue: function() {
          return 'raw string';
        }
      };
      spyOn(this.RestDataService, "load").and.returnValue();
      spyOn(this.RestDataService, "execute").and.returnValue();
      this.scope.execute();
      expect(this.RestDataService.execute).toHaveBeenCalledWith('POST', '', 'raw string', jasmine.any(Function), jasmine.any(Function));
      expect(this.scope.response).toEqual(undefined);
    });

    it('uses path, method and body from ace editor', function() {
      this.scope.editor = {
        getValue: function() {
          return "some value";
        },
        getStringValue: function() {
          return "";
        }
      };
      spyOn(this.RestDataService, "execute").and.returnValue();
      this.scope.execute();
      expect(this.RestDataService.execute).toHaveBeenCalledWith("POST", "", "some value", jasmine.any(Function), jasmine.any(Function));
    });
  });

  describe('updateOptions', function() {
    it('loads all possible autocompletion options', function() {
      this.scope.mappings = {};
      this.scope.updateOptions("");
      expect(this.scope.options).toEqual(['_msearch', '_search', '_suggest']);
    });
    it('skip autocompletion if mappings is absent', function() {
      this.scope.mappings = undefined;
      this.scope.updateOptions("");
      expect(this.scope.options).toEqual([]);
    });
  });

  describe('loadHistory', function() {
    it('loads history of requests', function() {
      var history = ['history entry 1'];
      this.RestDataService.history = function(success, error) {
        success(history);
      };
      spyOn(this.RestDataService, "history").and.callThrough();
      this.scope.loadHistory();
      expect(this.RestDataService.history).toHaveBeenCalled();
      expect(this.scope.history).toEqual(history);
    });
    it('warns if requests cant be loaded', function() {
      this.RestDataService.history = function(success, error) {
        error('kaput');
      };
      spyOn(this.RestDataService, "history").and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue();
      this.scope.loadHistory();
      expect(this.RestDataService.history).toHaveBeenCalled();
      expect(this.scope.history).toEqual(undefined);
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while loading request history', 'kaput');
    });
  });

  describe('loadRequest', function() {
    it('load given request into form', function() {
      this.scope.editor = {
        setValue: function(some) {
        }, format: function() {
        }
      };
      spyOn(this.scope.editor, 'setValue').and.returnValue();
      spyOn(this.scope.editor, 'format').and.returnValue();
      this.scope.loadRequest({
        'path': '/somepath',
        'body': 'somebody',
        'method': 'DELETE'
      });
      expect(this.scope.path).toEqual('/somepath');
      expect(this.scope.method).toEqual('DELETE');
      expect(this.scope.editor.setValue).toHaveBeenCalledWith('somebody');
      expect(this.scope.editor.format).toHaveBeenCalled();
    });
  });

});
