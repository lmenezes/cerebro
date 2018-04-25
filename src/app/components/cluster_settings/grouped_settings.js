function GroupedSettings(settings) {
  var groups = {};
  settings.forEach(function(setting) {
    var group = setting.split('.')[0];
    if (!groups[group]) {
      groups[group] = new Group(group);
    }
    groups[group].addSetting(setting);
  });
  this.groups = Object.values(groups);
}

function Group(name) {
  this.name = name;
  this.settings = [];

  this.addSetting = function(setting) {
    var settingObj = {name: setting, static: !DynamicSettings.valid(setting)};
    this.settings.push(settingObj);
  };

}
