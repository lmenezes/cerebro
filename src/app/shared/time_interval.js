angular.module('cerebro').filter('timeInterval', function() {
  var UNITS = ['yr', 'mo', 'd', 'h', 'min', 'sec'];

  var UNIT_MEASURE = {
    yr: 31536000000,
    mo: 2678400000,
    wk: 604800000,
    d: 86400000,
    h: 3600000,
    min: 60000,
    sec: 1000,
  };

  function stringify(seconds) {
    var result = '0sec';

    for (var idx = 0; idx < UNITS.length; idx++) {
      var amount = Math.floor(seconds / UNIT_MEASURE[UNITS[idx]]);
      if (amount) {
        result = amount + UNITS[idx];
        break;
      }
    }

    return result;
  }

  return function(seconds) {
    return stringify(seconds);
  };
});
