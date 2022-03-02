angular.module('cerebro').factory('ModalService', ['$sce', function($sce) {
  var confirmCallback;

  this.promptConfirmation = function(body, callback) {
    this.text = body;
    this.info = undefined;
    confirmCallback = callback;
  };

  this.showInfo = function(info) {
    this.text = undefined;
    this.info = $sce.trustAsHtml(JSONTree.create(info));
  };

  this.close = function() {
    this.clean();
  };

  this.confirm = function() {
    if (confirmCallback) {
      confirmCallback();
    }
    this.clean();
  };

  this.needsConfirmation = function() {
    return confirmCallback ? true : false;
  };

  this.clean = function() {
    this.text = undefined;
    this.info = undefined;
    confirmCallback = undefined;
  };

  return this;
}]);
