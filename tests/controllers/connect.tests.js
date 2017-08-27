describe('ConnectController', function() {

  beforeEach(angular.mock.module('cerebro'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {
    this.scope = $rootScope.$new();
    this.$location = $injector.get('$location');
    this.DataService = $injector.get('DataService');
    this.AlertService = $injector.get('AlertService');
    this.createController = function() {
      return $controller('ConnectController',
        {$scope: this.scope}, this.$location, this.DataService, this.AlertService);
    };
    this._controller = this.createController();
  }));

  it('should have intial state correctly set', function() {
    expect(this.scope.hosts).toEqual(undefined);
    expect(this.scope.connecting).toEqual(false);
  });

  describe('setup', function() {
    it('initializes list of known hosts editor', function() {
      var hosts = {host: 'http://somehost'};
      this.DataService.getHosts = function(success, error) {
        success(hosts);
      };
      spyOn(this.DataService, "getHosts").and.callThrough();
      this.scope.setup();
      expect(this.DataService.getHosts).toHaveBeenCalled();
      expect(this.scope.hosts).toEqual(hosts);
    });
    it('initializes list of known hosts editor', function() {
      var msg = 'kaput';
      this.DataService.getHosts = function(success, error) {
        error(msg);
      };
      spyOn(this.DataService, 'getHosts').and.callThrough();
      spyOn(this.AlertService, 'error').and.returnValue(true);
      this.scope.setup();
      expect(this.DataService.getHosts).toHaveBeenCalled();
      expect(this.scope.hosts).toEqual(undefined);
      expect(this.AlertService.error).toHaveBeenCalledWith('Error while fetching list of known hosts', 'kaput');
    });
  });

  describe('connect', function() {
    it('connects to valid host', function() {
      spyOn(this.DataService, "setHost").and.returnValue();
      spyOn(this.$location, 'path').and.returnValue(true);
      this.scope.connect('http://localhost:9200');
      expect(this.DataService.setHost).toHaveBeenCalledWith(
        'http://localhost:9200', undefined, undefined
      );
      expect(this.$location.path).toHaveBeenCalledWith('/overview');
      expect(this.scope.connecting).toEqual(true);
    });

    it('connects to valid host passing username/password', function() {
      spyOn(this.DataService, "setHost").and.returnValue();
      spyOn(this.$location, 'path').and.returnValue(true);
      this.scope.connect('http://localhost:9200', 'admin', '1234');
      expect(this.DataService.setHost).toHaveBeenCalledWith(
        'http://localhost:9200',
        'admin',
        '1234'
      );
      expect(this.$location.path).toHaveBeenCalledWith('/overview');
    });
  })

});
