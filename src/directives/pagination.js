angular.module('cerebro').directive('ngPagination', ['$document', function($document) {

  return {
    scope: {
      paginator: '=paginator',
      page: '=page',
      label: '=label'
    },
    templateUrl: 'pagination.html',
    link: function(scope, element, attrs) {
      var handler = function(event) {
        var $target = $(event.target);
        if ($target.is('input, textarea')) {
          return;
        }
        if (event.keyCode == 39 && scope.page.next) {
          scope.$apply(function() {
            scope.paginator.nextPage();
            event.preventDefault();
          });
        }
        if (event.keyCode == 37 && scope.page.previous) {
          scope.$apply(function() {
            scope.paginator.previousPage();
            event.preventDefault();
          });
        }
      };

      $document.bind('keydown', handler);
      element.on('$destroy', function() {
        $document.unbind('keydown', handler);
      });
    }
  };
}]);

function Paginator(page, pageSize, collection, filter) {

  this.filter = filter;

  this.page = page;

  this.pageSize = pageSize;

  this.$collection = collection ? collection : [];

  this.nextPage = function() {
    this.page += 1;
  };

  this.previousPage = function() {
    this.page -= 1;
  };

  this.setPageSize = function(newSize) {
    this.pageSize = newSize;
  };

  this.getPageSize = function() {
    return this.pageSize;
  };

  this.getCurrentPage = function() {
    return this.page;
  };

  this.getPage = function() {
    var results = this.getResults();
    var total = results.length;

    var first = total > 0 ? ((this.page - 1) * this.pageSize) + 1 : 0;
    while (total < first) {
      this.previousPage();
      first = (this.page - 1) * this.pageSize + 1;
    }
    var lastPage = this.page * this.pageSize > total;
    var last = lastPage ? total : this.page * this.pageSize;

    var elements = total > 0 ? results.slice(first - 1, last) : [];

    var next = this.pageSize * this.page < total;
    var previous = this.page > 1;
    while (elements.length < this.pageSize) {
      elements.push(null);
    }
    return new Page(elements, total, first, last, next, previous);
  };

  this.setCollection = function(collection) {
    if (this.filter.getSorting()) {
      this.$collection = collection.sort(this.filter.getSorting());
    } else {
      this.$collection = collection;
    }
  };

  this.getResults = function() {
    var filter = this.filter;
    var collection = this.$collection;
    if (filter.isBlank()) {
      return collection;
    } else {
      var filtered = [];
      collection.forEach(function(item) {
        if (filter.matches(item)) {
          filtered.push(item);
        }
      });
      return filtered;
    }
  };

  this.getCollection = function() {
    return this.$collection;
  };

}

function Page(elements, total, first, last, next, previous) {
  this.elements = elements;
  this.total = total;
  this.first = first;
  this.last = last;
  this.next = next;
  this.previous = previous;
}

