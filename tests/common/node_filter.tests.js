describe("node_filter", function () {

it("Blank node filter", function() {
    var filter = new NodeFilter("", true, true, true, true, 0);
    var node = { name: 'a', master: true, coordinating: false, data: true, ingest: true };
    expect(filter.matches(node)).toBe(true);
})

it("Only master node filter x non master node", function() {
    var filter = new NodeFilter("", false, true, false, false, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true, ingest: true };
    expect(!filter.matches(node)).toBe(true);
})

it("Only master node filter x master node", function() {
    var filter = new NodeFilter("", false, true, false, false, 0);
    var node = { name: 'a', master: true, coordinating: false, data: true, ingest: true };
    expect(filter.matches(node)).toBe(true);
})

it("Only data node filter x non data node", function() {
    var filter = new NodeFilter("", true, false, false, false, 0);
    var node = { name: 'a', master: false, coordinating: true, data: false, ingest: true };
    expect(!filter.matches(node)).toBe(true);
})

it("Only data node filter x data node", function() {
    var filter = new NodeFilter("", true, false, false, false, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true, ingest: false };
    expect(filter.matches(node)).toBe(true);
})

it("Only coordinating node filter x non client node", function() {
    var filter = new NodeFilter("", false, false, false, true, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true, ingest: false };
    expect(!filter.matches(node)).toBe(true);
})

it("Only client node filter x client node", function() {
    var filter = new NodeFilter("", false, false, false, true, 0);
    var node = { name: 'a', master: false, coordinating: true, data: false };
    expect(filter.matches(node)).toBe(true);
})

it("Only ingest node filter x ingest node", function() {
  var filter = new NodeFilter("", false, false, true, false, 0);
  var node = { name: 'a', master: false, coordinating: false, data: false, ingest: true };
  expect(filter.matches(node)).toBe(true);
})

it("Only ingest node filter x non ingest node", function() {
  var filter = new NodeFilter("", false, false, true, false, 0);
  var node = { name: 'a', master: false, coordinating: true, data: false, ingest: false };
  expect(!filter.matches(node)).toBe(true);
})

it("Master or client node filter x data node", function() {
    var filter = new NodeFilter("", false, true, true, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true };
    expect(!filter.matches(node)).toBe(true);
})

it("Master or client node filter x client node x master node", function() {
    var filter = new NodeFilter("", false, true, false, true, 0);
    var node = { name: 'a', master: false, coordinating: true, data: false, ingest: true  };
    var node2 = { name: 'a', master: true, coordinating: false, data: false, ingest: true  };
    expect(filter.matches(node)).toBe(true);
    expect(filter.matches(node2)).toBe(true);
})

it("node filter with name x non matching name", function() {
    var filter = new NodeFilter("moli", true, true, true, true, 0);
    var node = { name: 'milo_id', master: true, coordinating: false, data: true, ingest: true  };
    expect(!filter.matches(node)).toBe(true);
})

it("node filter with name x matching name", function() {
    var filter = new NodeFilter("moli", true, true, true, true, 0);
    var node = { name: 'moliware', master: true, coordinating: false, data: true, ingest: true  };
    expect(filter.matches(node)).toBe(true);
})

});