test("Filters out special indices", function() {
    var filter = new IndexFilter("", true, false, true, true, 0);
    var index = {name: "index_name", closed: false, special: true, unhealthy: false, aliases: []};
    ok(!filter.matches(index), "Filters out special indices");
})

test("Maintains special indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: false, special: true, unhealthy: false, aliases: []};
    ok(filter.matches(index), "Filters out special indices");
})

test("Filters out closed indices", function() {
    var filter = new IndexFilter("", false, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    ok(!filter.matches(index), "Filters out closed indices");
})

test("Maintains closed indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    ok(filter.matches(index), "Filters out closed indices");
})

test("Maintains healthy indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    ok(filter.matches(index), "Maintains healthy indices");
})

test("Maintains unhealthy indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: true, aliases: []};
    ok(filter.matches(index), "Maintains unhealthy indices");
})

test("Filters out healthy indices", function() {
    var filter = new IndexFilter("", true, true, false, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    ok(!filter.matches(index), "Filters out healthy indices");
})

test("Filter by name on different name index", function() {
    var filter = new IndexFilter("abc", true,  true, true, true, 0);
    var index = {name: "cba", closed: true, special: false, unhealthy: false, aliases: []};
    ok(!filter.matches(index), "Doesnt match if filter name is not a substring of name");
})

test("Filter by name on index with matching name", function() {
    var filter = new IndexFilter("abc", true, true, true, true, 0);
    var index = {name: "abcdef", closed: true, special: false, unhealthy: false, aliases: []};
    ok(filter.matches(index), "Matches if filter name is a substring of name");
})

test("Filter by name regexp on index with matching name", function() {
    var filter = new IndexFilter("a\.+f", true, true, true, true, 0);
    var index = {name: "abcdef", closed: true, special: false, unhealthy: false, aliases: []};
    ok(filter.matches(index), "Matches if filter reg exp matches index name");
})

test("Use regexp as plain string if regexp doesnt compile", function() {
    var filter = new IndexFilter("a\.f-", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: []};
    ok(filter.matches(index), "Matches if filter reg exp matches index name");
})

test("Use regexp as plain string if regexp doesnt compile", function() {
    var filter = new IndexFilter("a\.f-", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: []};
    ok(filter.matches(index), "Matches if filter non compiling reg exp matches index name");
})

test("Checks also index aliases for matches", function() {
    var filter = new IndexFilter("also", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: ["whatever", "also_aliases"]};
    ok(filter.matches(index), "Matches also on index aliases");
})

test("Checks also index aliases for matches if RegExp doesnt compile", function() {
    var filter = new IndexFilter("[a\.f-", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: ["somethingelse", "[a\.f-lalala"]};
    ok(filter.matches(index), "Matches also on index aliases if regexp doesnt compile");
})

test("Doesnt match if neither name or aliases match the RegExp", function() {
    var filter = new IndexFilter("[a\.f-", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: ["ddd"]};
    ok(!filter.matches(index), "Matches also on index aliases if regexp doesnt compile");
})

test("Doesnt match if neither name or aliases match the text", function() {
    var filter = new IndexFilter("bbbb", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: ["ddd"]};
    ok(!filter.matches(index), "Matches also on index aliases if regexp doesnt compile");
})
