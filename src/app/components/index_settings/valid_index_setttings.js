// eslint-disable-next-line no-unused-vars
var ValidIndexSettings = (function() {
  var invalidSettings = [
    'index.creation_date',
    'index.provided_name',
    'index.uuid',
    'index.version.created',
  ];

  return {
    valid: function(setting) {
      var valid = true;
      invalidSettings.forEach(function(invalidSetting) {
        valid = valid && setting.indexOf(invalidSetting) == -1;
      });
      return valid;
    },
  };
})();

