QUnit.test("Filters out special indices", function(assert) {
    var filter = new IndexFilter("", true, false, true, true, 0);
    var index = {index: "index_name", status: 'open', unhealthy: false, aliases: []};
    assert.ok(!filter.matches(index), "Filters out special indices");
});

QUnit.test("Maintains special indices", function(assert) {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {index: "index_name", status: 'open', unhealthy: false, aliases: []};
    assert.ok(filter.matches(index), "Filters out special indices");
});

QUnit.test("Filters out closed indices", function(assert) {
    var filter = new IndexFilter("", false, true, true, true, 0);
    var index = {index: "index_name", status: 'close', unhealthy: false, aliases: []};
    assert.ok(!filter.matches(index), "Filters out closed indices");
});

QUnit.test("Maintains closed indices", function(assert) {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {index: "index_name", status: 'close', unhealthy: false, aliases: []};
    assert.ok(filter.matches(index), "Filters out closed indices");
});

QUnit.test("Maintains healthy indices", function(assert) {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {index: "index_name", status: 'close', unhealthy: false, aliases: []};
    assert.ok(filter.matches(index), "Maintains healthy indices");
});

QUnit.test("Maintains unhealthy indices", function(assert) {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {index: "index_name", status: 'close', unhealthy: true, aliases: []};
    assert.ok(filter.matches(index), "Maintains unhealthy indices");
});

QUnit.test("Filters out healthy indices", function(assert) {
    var filter = new IndexFilter("", true, true, false, true, 0);
    var index = {index: "index_name", status: 'close', unhealthy: false, aliases: []};
    assert.ok(!filter.matches(index), "Filters out healthy indices");
});

QUnit.test("Filter by name on different name index", function(assert) {
    var filter = new IndexFilter("abc", true,  true, true, true, 0);
    var index = {index: "cba", status: 'close', unhealthy: false, aliases: []};
    assert.ok(!filter.matches(index), "Doesnt match if filter name is not a substring of name");
});

QUnit.test("Filter by name on index with matching name", function(assert) {
    var filter = new IndexFilter("abc", true, true, true, true, 0);
    var index = {index: "abcdef", status: 'close', unhealthy: false, aliases: []};
    assert.ok(filter.matches(index), "Matches if filter name is a substring of name");
});

QUnit.test("Filter by name regexp on index with matching name", function(assert) {
    var filter = new IndexFilter("a\.+f", true, true, true, true, 0);
    var index = {index: "abcdef", status: 'close', unhealthy: false, aliases: []};
    assert.ok(filter.matches(index), "Matches if filter reg exp matches index name");
});

QUnit.test("Use regexp as plain string if regexp doesnt compile", function(assert) {
    var filter = new IndexFilter("a\.f-", true, true, true, true, 0);
    var index = {index: "a.f-", status: 'close', unhealthy: false, aliases: []};
    assert.ok(filter.matches(index), "Matches if filter reg exp matches index name");
});

QUnit.test("Use regexp as plain string if regexp doesnt compile", function(assert) {
    var filter = new IndexFilter("a\.f-", true, true, true, true, 0);
    var index = {index: "a.f-", status: 'close', unhealthy: false, aliases: []};
    assert.ok(filter.matches(index), "Matches if filter non compiling reg exp matches index name");
});

QUnit.test("Checks also index aliases for matches", function(assert) {
    var filter = new IndexFilter("also", true, true, true, true, 0);
    var index = {index: "a.f-", status: 'close', unhealthy: false, aliases: ["whatever", "also_aliases"]};
    assert.ok(filter.matches(index), "Matches also on index aliases");
});

QUnit.test("Checks also index aliases for matches if RegExp doesnt compile", function(assert) {
    var filter = new IndexFilter("[a\.f-", true, true, true, true, 0);
    var index = {index: "a.f-", status: 'close', unhealthy: false, aliases: ["somethingelse", "[a\.f-lalala"]};
    assert.ok(filter.matches(index), "Matches also on index aliases if regexp doesnt compile");
});

QUnit.test("Doesnt match if neither name or aliases match the RegExp", function(assert) {
    var filter = new IndexFilter("[a\.f-", true, true, true, true, 0);
    var index = {index: "a.f-", status: 'close', unhealthy: false, aliases: ["ddd"]};
    assert.ok(!filter.matches(index), "Matches also on index aliases if regexp doesnt compile");
});

QUnit.test("Doesnt match if neither name or aliases match the text", function(assert) {
    var filter = new IndexFilter("bbbb", true, true, true, true, 0);
    var index = {index: "a.f-", status: 'close', unhealthy: false, aliases: ["ddd"]};
    assert.ok(!filter.matches(index), "Matches also on index aliases if regexp doesnt compile");
});
