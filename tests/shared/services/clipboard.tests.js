"use strict";

describe("ClipboardService", function() {

  var service, $window, $document;

  var elementFunction = angular.element; // keeps original function

  var document = [
    {
      createElement: function(tag) {
        return element;
      },
      documentElement: {
        scrollTop: '4321'
      },
      execCommand: function(method) {
      },
      body: 'document body'
    }
  ];

  var element = {
    css: function(css) {
    },
    val: function(value) {
    },
    select: function() {
    },
    attr: function(attr) {
    },
    append: function() {
    },
    on: function() {
    },
    off: function() {
    }
  };

  beforeEach(module("cerebro"));

  afterEach(function() {
    angular.element = elementFunction; // restores original function
  });

  beforeEach(function() {
    var elementMock = {
      element: function(elem) { // replaces with mock
        return element;
      }
    };
    spyOn(angular, 'element').and.returnValue(element);
    spyOn(element, 'css').and.callThrough();
    spyOn(element, 'val').and.callThrough();
    spyOn(element, 'select').and.callThrough();
    spyOn(element, 'attr').and.callThrough();
    spyOn(document[0], 'createElement').and.callThrough();

  });

  beforeEach(function() {
    module('cerebro');
    module(function($provide) {
      $provide.value('$window', {
        pageYOffset: '1234'
      });
      $provide.value('$document', document);
    });
  });

  beforeEach(inject(function($injector) {
    service = $injector.get('ClipboardService');
    $window = $injector.get('$window');
    $document = $injector.get('$document');
  }));

  it("should instantiate textarea to hold data to copy",
      function() {
        expect(angular.element).toHaveBeenCalledWith(element);
        expect(document[0].createElement).toHaveBeenCalledWith('textarea');
        expect(element.css).toHaveBeenCalledWith({
          position: 'absolute',
          left: '-9999px',
          top: '1234px'
        });
        expect(element.attr).toHaveBeenCalledWith({readonly: ''});
        expect(angular.element).toHaveBeenCalledWith('document body');
      }
  );

  it("should copy the given text to the textarea and invoke copy and call success callback",
      function() {
        var callbacks = {
          success: function() {},
          failure: function() {},
        }
        spyOn($document[0], 'execCommand').and.returnValue(true);
        spyOn(callbacks, 'success').and.returnValue(true);
        service.copy('text to be copied', callbacks.success, callbacks.failure);
        expect(element.val).toHaveBeenCalledWith('text to be copied');
        expect(element.select).toHaveBeenCalled();
        expect($document[0].execCommand).toHaveBeenCalledWith('copy');
        expect(callbacks.success).toHaveBeenCalled();
      }
  );

  it("should copy the given text to the textarea and invoke copy and call failure callback",
      function() {
        var callbacks = {
          success: function() { throw 'error' },
          failure: function() {},
        }
        spyOn($document[0], 'execCommand').and.returnValue(true);
        spyOn(callbacks, 'failure').and.returnValue(true);
        service.copy('text to be copied', callbacks.success, callbacks.failure);
        expect(element.val).toHaveBeenCalledWith('text to be copied');
        expect(element.select).toHaveBeenCalled();
        expect($document[0].execCommand).toHaveBeenCalledWith('copy');
        expect(callbacks.failure).toHaveBeenCalled();
      }
  );

});
