function IndexTemplateFilter(name, pattern) {
  this.name = name;
  this.pattern = pattern;

  this.clone = function() {
    // eslint-disable-next-line no-unused-vars
    return new IndexTemplateFilter(name, pattern);
  };

  this.getSorting = function() {
    return function(a, b) {
      return a.name.localeCompare(b.name);
    };
  };

  this.equals = function(other) {
    return (other !== null &&
    this.name === other.name &&
    this.pattern === other.pattern);
  };

  this.isBlank = function() {
    return !this.name && !this.pattern;
  };

  this.matches = function(template) {
    if (this.isBlank()) {
      return true;
    } else {
      var matches = true;
      if (this.name) {
        matches = template.name.indexOf(this.name) != -1;
      }
      if (matches && this.pattern) {
        matches = template.template.template.indexOf(this.pattern) != -1;
      }
      return matches;
    }
  };
}
