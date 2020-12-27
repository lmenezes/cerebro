angular.module('cerebro').filter('startsWith', function() {
  function strStartsWith(str, prefix) {
    return (str + '').indexOf(prefix) === 0;
  }

  return function(elements, prefix) {
    var filtered = [];
    angular.forEach(elements, function(element) {
      if (strStartsWith(element, prefix)) {
        filtered.push(element);
      }
    });
    return filtered;
  };
});
