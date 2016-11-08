angular.module('cerebro').factory('TemplatesDataService', ['DataService',
  function(DataService) {

    this.getTemplates = function(success, error) {
      DataService.send('/templates', {}, success, error);
    };

    this.delete = function(name, success, error) {
      DataService.send('/templates/delete', {name: name}, success, error);
    };

    this.create = function(name, template, success, error) {
      var data = {name: name, template: template};
      DataService.send('/templates/create', data, success, error);
    };

    this.update = function(name, oldName, template, success, error) {
      var data = {name: name, oldName: oldName, template: template};
      DataService.send('/templates/update', data, success, error);
    };

    return this;

  }
]);
