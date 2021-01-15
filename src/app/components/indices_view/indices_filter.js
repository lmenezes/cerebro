function IndicesFilter(index) {
  this.index = index;
  this.clone = function() {
    // eslint-disable-next-line no-unused-vars
    return new IndicesFilter(this.index);
  };

  this.getSorting = function() {
    return function(a, b) {
      return 0;
    };
  };

  this.equals = function(other) {
    return (other !== null &&
    this.index == other);
  };

  this.isBlank = function() {
    return !this.index;
  };

  this.matches = function(alias) {
    if (this.isBlank()) {
      return true;
    } else {
      var matches = true;
      if (this.index) {
        matches = alias.index.indexOf(this.index) != -1;
      }
      return matches;
    }
  };
}
