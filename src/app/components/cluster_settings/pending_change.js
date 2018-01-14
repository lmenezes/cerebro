angular.module('cerebro').directive('ngPendingChange',
  function() {
    return {
      scope: {
        setting: '@',
        value: '@',
        transient: '@',
        'revertSetting': '&onRevert',
        'changeSettingPersistence': '&onChangeSettingPersistence'
      },
      templateUrl: './cluster_settings/pending_change.html'
    };
  }
);
