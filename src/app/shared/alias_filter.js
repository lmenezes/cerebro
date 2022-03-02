function AliasFilter(index, alias) {
  this.index = index;
  this.alias = alias;

  this.clone = function() {
    // eslint-disable-next-line no-unused-vars
    return new AliasFilter(this.index, this.alias);
  };

  this.getSorting = function() {
    return function(a, b) {
      if (a.alias === b.alias) {
        return a.index.localeCompare(b.index);
      }
      return a.alias.localeCompare(b.alias);
    };
  };

  this.equals = function(other) {
    return (other !== null &&
    this.index == other.index &&
    this.alias == other.alias);
  };

  this.isBlank = function() {
    return !this.index && !this.alias;
  };

  this.matches = function(alias) {
    if (this.isBlank()) {
      return true;
    } else {
      var matches = true;
      if (this.index) {
        matches = alias.index.indexOf(this.index) != -1;
      }
      if (matches && this.alias) {
        matches = alias.alias.indexOf(this.alias) != -1;
      }
      return matches;
    }
  };
}
