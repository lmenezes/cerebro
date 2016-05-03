angular.module('cerebro').filter('startsWith', function() {

    console.log("created!");

    function strStartsWith(str, prefix) {
        return (str + '').indexOf(prefix) === 0;
    }

    return function(elements, prefix) {
        console.log("filtering...");
        var filtered = [];
        angular.forEach(elements, function(element) {
            if (strStartsWith(element, prefix)) {
                filtered.push(element);
            }
        });
        console.log("filtered!!");
        console.log(filtered);
        return filtered;
    };
});
