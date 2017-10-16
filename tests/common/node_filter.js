QUnit.test("Blank node filter", function(assert) {
    var filter = new NodeFilter("", true, true, true, true, 0);
    var node = { name: 'a', master: true, coordinating: false, data: true, ingest: true };
    assert.ok(filter.matches(node), "Matches any node if filter is blank");
})

QUnit.test("Only master node filter x non master node", function(assert) {
    var filter = new NodeFilter("", false, true, false, false, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true, ingest: true };
    assert.ok(!filter.matches(node),"Doesnt match a non master node");
})

QUnit.test("Only master node filter x master node", function(assert) {
    var filter = new NodeFilter("", false, true, false, false, 0);
    var node = { name: 'a', master: true, coordinating: false, data: true, ingest: true };
    assert.ok(filter.matches(node),"Matches a master node");
})

QUnit.test("Only data node filter x non data node", function(assert) {
    var filter = new NodeFilter("", true, false, false, false, 0);
    var node = { name: 'a', master: false, coordinating: true, data: false, ingest: true };
    assert.ok(!filter.matches(node),"Doesnt match a non data node");
})

QUnit.test("Only data node filter x data node", function(assert) {
    var filter = new NodeFilter("", true, false, false, false, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true, ingest: false };
    assert.ok(filter.matches(node),"Match a data node");
})

QUnit.test("Only coordinating node filter x non client node", function(assert) {
    var filter = new NodeFilter("", false, false, false, true, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true, ingest: false };
    assert.ok(!filter.matches(node), "Doesnt match a non client node");
})

QUnit.test("Only client node filter x client node", function(assert) {
    var filter = new NodeFilter("", false, false, false, true, 0);
    var node = { name: 'a', master: false, coordinating: true, data: false };
    assert.ok(filter.matches(node),"Match a client node");
})

QUnit.test("Only ingest node filter x ingest node", function(assert) {
  var filter = new NodeFilter("", false, false, true, false, 0);
  var node = { name: 'a', master: false, coordinating: false, data: false, ingest: true };
  assert.ok(filter.matches(node),"Match an ingest node");
})

QUnit.test("Only ingest node filter x non ingest node", function(assert) {
  var filter = new NodeFilter("", false, false, true, false, 0);
  var node = { name: 'a', master: false, coordinating: true, data: false, ingest: false };
  assert.ok(!filter.matches(node),"Doesnt match a non ingest node");
})

QUnit.test("Master or client node filter x data node", function(assert) {
    var filter = new NodeFilter("", false, true, true, 0);
    var node = { name: 'a', master: false, coordinating: false, data: true };
    assert.ok(!filter.matches(node), "Doesnt match a non master/client node");
})

QUnit.test("Master or client node filter x client node x master node", function(assert) {
    var filter = new NodeFilter("", false, true, false, true, 0);
    var node = { name: 'a', master: false, coordinating: true, data: false, ingest: true  };
    var node2 = { name: 'a', master: true, coordinating: false, data: false, ingest: true  };
    assert.ok(filter.matches(node),"Match a client node");
    assert.ok(filter.matches(node2),"Match a master node");
})

QUnit.test("node filter with name x non matching name", function(assert) {
    var filter = new NodeFilter("moli", true, true, true, true, 0);
    var node = { name: 'milo_id', master: true, coordinating: false, data: true, ingest: true  };
    assert.ok(!filter.matches(node),"Doesnt match if name is not a substring");
})

QUnit.test("node filter with name x matching name", function(assert) {
    var filter = new NodeFilter("moli", true, true, true, true, 0);
    var node = { name: 'moliware', master: true, coordinating: false, data: true, ingest: true  };
    assert.ok(filter.matches(node),"Matches if name is not a substring");
})
