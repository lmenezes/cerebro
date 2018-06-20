function GroupedSettings(settings) {
  var groups = {};
  settings.forEach(function(setting) {
    var group = setting.name.split('.')[0];
    if (!groups[group]) {
      groups[group] = {name: group, settings: []};
    }
    groups[group].settings.push(setting);
  });
  this.groups = Object.values(groups);
}
