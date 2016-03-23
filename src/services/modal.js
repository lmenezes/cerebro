angular.module('cerebro').factory('ModalService', ['$sce', function ($sce) {

  this.text = undefined;
  this.confirm = undefined;

  this.info = undefined;

  this.promptConfirmation = function (body, confirmCallback) {
    this.text = body;
    this.confirm = confirmCallback;
    this.info = undefined;
  };

  this.showInfo = function (info) {
    this.info = $sce.trustAsHtml(JSON.stringify(info, '', 2));
    //$scope.body= $sce.trustAsHtml(JSONTree.create(info));
    this.confirm = undefined;
    this.text = undefined;
  };

  return this;
}]);
