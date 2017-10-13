QUnit.test("Paginator with empty collection", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(1, 2, [], filter);
    var page = paginator.getPage();
    assert.equal(paginator.page, 1, "Should be on first page");
    assert.equal(page.first, 0, "First result should be 0");
    assert.equal(page.last, 0, "Last result should be 0");
    assert.equal(page.next, false, "Should not have next page");
    assert.equal(page.previous, false, "Should not have previous page");
    assert.equal(page.total, 0, "Should have 0 total elements");
    assert.equal(page.elements[0], null, "Should have page_size null elements");
    assert.equal(page.elements[1], null, "Should have page_size null elements");
})

QUnit.test("Paginator with single element", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(1, 2, [1], filter);
    var page = paginator.getPage();
    assert.equal(paginator.page, 1, "Should be on first page");
    assert.equal(page.first, 1, "First result should be 1");
    assert.equal(page.last, 1, "Last result should be 1");
    assert.equal(page.next, false, "Should not have next page");
    assert.equal(page.previous, false, "Should not have previous page");
    assert.equal(page.total, 1, "Should have 1 total elements");
    assert.equal(page.elements[0], 1, "Should have first element");
    assert.equal(page.elements[1], null, "Should have a null second element");
})

QUnit.test("Paginator with collection smaller than page size", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(1, 3, [1, 2], filter);
    var page = paginator.getPage();
    assert.equal(page.first, 1, "First result should be 1");
    assert.equal(page.last, 2, "Last result should be 2");
    assert.equal(page.next, false, "Should not have next page");
    assert.equal(page.previous, false, "Should not have previous page");
    assert.equal(page.total, 2, "Should have 2 total elements");
    assert.equal(page.elements[0], 1, "Should have first element");
    assert.equal(page.elements[1], 2, "Should have second element");
    assert.equal(page.elements[2], null, "Should have a null element");
})

QUnit.test("Paginator with collection larger than page size", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(1, 3, [1, 2, 3, 4], filter);
    var page = paginator.getPage();
    assert.equal(page.first, 1, "First result should be 1");
    assert.equal(page.last, 3, "Last result should be 2");
    assert.equal(page.next, true, "Should have next page");
    assert.equal(page.previous, false, "Should not have previous page");
    assert.equal(page.total, 4, "Should have 4 total elements");
    assert.equal(page.elements[0], 1, "Should have first element");
    assert.equal(page.elements[1], 2, "Should have second element");
    assert.equal(page.elements[2], 3, "Should have third element");
    assert.equal(page.elements.length, 3, "Should have only page_size elements");
})

QUnit.test("Paginator paginating collection larger than page size", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(1, 3, [1, 2, 3, 4], filter);
    paginator.nextPage();
    var page = paginator.getPage();
    assert.equal(paginator.page, 2, "Should be on second page");
    assert.equal(page.first, 4, "First result should be 1");
    assert.equal(page.last, 4, "Last result should be 2");
    assert.equal(page.next, false, "Should not have next page");
    assert.equal(page.previous, true, "Should have previous page");
    assert.equal(page.total, 4, "Should have 4 total elements");
    assert.equal(page.elements[0], 4, "Should have first element");
    assert.equal(page.elements[1], null, "Should have a null second element");
    assert.equal(page.elements[2], null, "Should have a null third element");
    assert.equal(page.elements.length, 3, "Should have page_size elements");
})

QUnit.test("Paginator with both next and previous page", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(1, 1, [1, 2, 3], filter);
    paginator.nextPage();
    var page = paginator.getPage();
    assert.equal(paginator.page, 2, "Should be on second page");
    assert.equal(page.first, 2, "First result should be 2");
    assert.equal(page.last, 2, "Last result should be 2");
    assert.equal(page.next, true, "Should have next page");
    assert.equal(page.previous, true, "Should have previous page");
    assert.equal(page.total, 3, "Should have 3 total elements");
    assert.equal(page.elements[0], 2, "Should have first element");
    assert.equal(page.elements.length, 1, "Should have page_size elements");
})

QUnit.test("Paginator with collection that becomes smaller than current displayed result", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(1, 1, [1, 2, 3], filter);
    paginator.nextPage();
    paginator.nextPage();
    var page = paginator.getPage();
    assert.equal(paginator.page, 3, "Current page should be 3");
    assert.equal(page.first, 3, "First result should be 3");
    assert.equal(page.last, 3, "Last result should be 3");
    assert.equal(page.next, false, "Should have next page");
    assert.equal(page.previous, true, "Should have previous page");
    assert.equal(page.total, 3, "Should have 3 total elements");
    assert.equal(page.elements[0], 3, "Should have first element");
    assert.equal(page.elements.length, 1, "Should have page_size elements");
    filter.matches=function(other) { return other > 1; }
    filter.isBlank=function() { return false; }
    page = paginator.getPage();
    assert.equal(paginator.page, 2, "Current page should be 2");
    assert.equal(page.first, 2, "First result should be 1");
    assert.equal(page.last, 2, "Last result should be 1");
    assert.equal(page.next, false, "Should not have next page");
    assert.equal(page.previous, true, "Should not have previous page");
    assert.equal(page.total, 2, "Should have 1 total elements");
    assert.equal(page.elements[0], 3, "Should have first element");
    assert.equal(page.elements.length, 1, "Should have page_size elements");
})

QUnit.test("Paginator paginating to previous page", function(assert) {
    var filter = { isBlank: function() { return true; } };
    var paginator = new Paginator(2, 1, [1, 2, 3], filter);
    var page = paginator.getPage();
    assert.equal(paginator.page, 2, "Should be on second page");
    assert.equal(page.first, 2, "First result should be 2");
    assert.equal(page.last, 2, "Last result should be 2");
    assert.equal(page.next, true, "Should have next page");
    assert.equal(page.previous, true, "Should have previous page");
    assert.equal(page.total, 3, "Should have 4 total elements");
    assert.equal(page.elements[0], 2, "Should have first element");
    assert.equal(page.elements.length, 1, "Should have page_size elements");
    paginator.previousPage();
    page = paginator.getPage();
    assert.equal(paginator.page, 1, "Should be on second page");
    assert.equal(page.first, 1, "First result should be 1");
    assert.equal(page.last, 1, "Last result should be 1");
    assert.equal(page.next, true, "Should have next page");
    assert.equal(page.previous, false, "Should not have previous page");
    assert.equal(page.total, 3, "Should have 3 total elements");
    assert.equal(page.elements[0], 1, "Should have first element");
    assert.equal(page.elements.length, 1, "Should have page_size elements");
})
