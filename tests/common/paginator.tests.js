describe("node_filter", function () {

    it("Paginator with empty collection", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(1, 2, [], filter);
        var page = paginator.getPage();
        expect(paginator.page).toEqual(1);
        expect(page.first).toEqual(0);
        expect(page.last).toEqual(0);
        expect(page.next).toEqual(false);
        expect(page.previous).toEqual(false);
        expect(page.total).toEqual(0);
        expect(page.elements[0]).toEqual(null);
        expect(page.elements[1]).toEqual(null);
    });

    it("Paginator with single element", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(1, 2, [1], filter);
        var page = paginator.getPage();
        expect(paginator.page).toEqual(1);
        expect(page.first).toEqual(1);
        expect(page.last).toEqual(1);
        expect(page.next).toEqual(false);
        expect(page.previous).toEqual(false);
        expect(page.total).toEqual(1);
        expect(page.elements[0]).toEqual(1);
        expect(page.elements[1]).toEqual(null);
    })

    it("Paginator with collection smaller than page size", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(1, 3, [1, 2], filter);
        var page = paginator.getPage();
        expect(page.first).toEqual(1);
        expect(page.last).toEqual(2);
        expect(page.next).toEqual(false);
        expect(page.previous).toEqual(false);
        expect(page.total).toEqual(2);
        expect(page.elements[0]).toEqual(1);
        expect(page.elements[1]).toEqual(2);
        expect(page.elements[2]).toEqual(null);
    })

    it("Paginator with collection larger than page size", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(1, 3, [1, 2, 3, 4], filter);
        var page = paginator.getPage();
        expect(page.first).toEqual(1);
        expect(page.last).toEqual(3);
        expect(page.next).toEqual(true);
        expect(page.previous).toEqual(false);
        expect(page.total).toEqual(4);
        expect(page.elements[0]).toEqual(1);
        expect(page.elements[1]).toEqual(2);
        expect(page.elements[2]).toEqual(3);
        expect(page.elements.length).toEqual(3);
    })

    it("Paginator paginating collection larger than page size", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(1, 3, [1, 2, 3, 4], filter);
        paginator.nextPage();
        var page = paginator.getPage();
        expect(paginator.page).toEqual(2);
        expect(page.first).toEqual(4);
        expect(page.last).toEqual(4);
        expect(page.next).toEqual(false);
        expect(page.previous).toEqual(true);
        expect(page.total).toEqual(4);
        expect(page.elements[0]).toEqual(4);
        expect(page.elements[1]).toEqual(null);
        expect(page.elements[2]).toEqual(null);
        expect(page.elements.length).toEqual(3);
    })

    it("Paginator with both next and previous page", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(1, 1, [1, 2, 3], filter);
        paginator.nextPage();
        var page = paginator.getPage();
        expect(paginator.page).toEqual(2);
        expect(page.first).toEqual(2);
        expect(page.last).toEqual(2);
        expect(page.next).toEqual(true);
        expect(page.previous).toEqual(true);
        expect(page.total).toEqual(3);
        expect(page.elements[0]).toEqual(2);
        expect(page.elements.length).toEqual(1);
    })

    it("Paginator with collection that becomes smaller than current displayed result", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(1, 1, [1, 2, 3], filter);
        paginator.nextPage();
        paginator.nextPage();
        var page = paginator.getPage();
        expect(paginator.page).toEqual(3);
        expect(page.first).toEqual(3);
        expect(page.last).toEqual(3);
        expect(page.next).toEqual(false);
        expect(page.previous).toEqual(true);
        expect(page.total).toEqual(3);
        expect(page.elements[0]).toEqual(3);
        expect(page.elements.length).toEqual(1);
        filter.matches = function (other) {
            return other > 1;
        }
        filter.isBlank = function () {
            return false;
        }
        page = paginator.getPage();
        expect(paginator.page).toEqual(2);
        expect(page.first).toEqual(2);
        expect(page.last).toEqual(2);
        expect(page.next).toEqual(false);
        expect(page.previous).toEqual(true);
        expect(page.total).toEqual(2);
        expect(page.elements[0]).toEqual(3);
        expect(page.elements.length).toEqual(1);
    })

    it("Paginator paginating to previous page", function() {
        var filter = {
            isBlank: function () {
                return true;
            }
        };
        var paginator = new Paginator(2, 1, [1, 2, 3], filter);
        var page = paginator.getPage();
        expect(paginator.page).toEqual(2);
        expect(page.first).toEqual(2);
        expect(page.last).toEqual(2);
        expect(page.next).toEqual(true);
        expect(page.previous).toEqual(true);
        expect(page.total).toEqual(3);
        expect(page.elements[0]).toEqual(2);
        expect(page.elements.length).toEqual(1);
        paginator.previousPage();
        page = paginator.getPage();
        expect(paginator.page).toEqual(1);
        expect(page.first).toEqual(1);
        expect(page.last).toEqual(1);
        expect(page.next).toEqual(true);
        expect(page.previous).toEqual(false);
        expect(page.total).toEqual(3);
        expect(page.elements[0]).toEqual(1);
        expect(page.elements.length).toEqual(1);
    })

});