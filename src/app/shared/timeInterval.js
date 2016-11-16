angular.module('cerebro').filter('timeInterval', function() {

  var UNITS = ['yr', 'mo', 'd', 'h', 'min'];

  var UNIT_MEASURE = {
    yr: 31536000000,
    mo: 2678400000,
    wk: 604800000,
    d: 86400000,
    h: 3600000,
    min: 60000
  };

  function stringify(seconds) {

    var result = 'less than a minute';

    for (var idx = 0; idx < UNITS.length; idx++) {
      var amount = Math.floor(seconds / UNIT_MEASURE[UNITS[idx]]);
      if (amount) {
        result = amount + UNITS[idx] + '.';
        break;
      }
    }

    return result;
  }

  return function(seconds) {
    return stringify(seconds);
  };

});
