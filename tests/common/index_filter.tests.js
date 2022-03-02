describe("index_filter", function () {

  it("Filters out special indices", function() {
    var filter = new IndexFilter("", true, false, true, true, 0);
    var index = {name: "index_name", closed: false, special: true, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(false);
  });

  it("Maintains special indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: false, special: true, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Filters out closed indices", function() {
    var filter = new IndexFilter("", false, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    expect(!filter.matches(index)).toBe(true);
  })

  it("Maintains closed indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Maintains healthy indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Maintains unhealthy indices", function() {
    var filter = new IndexFilter("", true, true, true, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: true, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Filters out healthy indices", function() {
    var filter = new IndexFilter("", true, true, false, true, 0);
    var index = {name: "index_name", closed: true, special: false, unhealthy: false, aliases: []};
    expect(!filter.matches(index)).toBe(true);
  })

  it("Filter by name on different name index", function() {
    var filter = new IndexFilter("abc", true, true, true, true, 0);
    var index = {name: "cba", closed: true, special: false, unhealthy: false, aliases: []};
    expect(!filter.matches(index)).toBe(true);
  })

  it("Filter by name on index with matching name", function() {
    var filter = new IndexFilter("abc", true, true, true, true, 0);
    var index = {name: "abcdef", closed: true, special: false, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Filter by name regexp on index with matching name", function() {
    var filter = new IndexFilter("a\.+f", true, true, true, true, 0);
    var index = {name: "abcdef", closed: true, special: false, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Use regexp as plain string if regexp doesnt compile", function() {
    var filter = new IndexFilter("a\.f-", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Use regexp as plain string if regexp doesnt compile", function() {
    var filter = new IndexFilter("a\.f-", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: []};
    expect(filter.matches(index)).toBe(true);
  })

  it("Checks also index aliases for matches", function() {
    var filter = new IndexFilter("also", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: ["whatever", "also_aliases"]};
    expect(filter.matches(index)).toBe(true);
  })

  it("Checks also index aliases for matches if RegExp doesnt compile", function() {
    var filter = new IndexFilter("[a\.f-", true, true, true, true, 0);
    var index = {
      name: "a.f-",
      closed: true,
      special: false,
      unhealthy: false,
      aliases: ["somethingelse", "[a\.f-lalala"]
    };
    expect(filter.matches(index)).toBe(true);
  })

  it("Doesnt match if neither name or aliases match the RegExp", function() {
    var filter = new IndexFilter("[a\.f-", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: ["ddd"]};
    expect(!filter.matches(index)).toBe(true);
  })

  it("Doesnt match if neither name or aliases match the text", function() {
    var filter = new IndexFilter("bbbb", true, true, true, true, 0);
    var index = {name: "a.f-", closed: true, special: false, unhealthy: false, aliases: ["ddd"]};
    expect(!filter.matches(index)).toBe(true);
  })

});
