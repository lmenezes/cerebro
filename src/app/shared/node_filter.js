// eslint-disable-next-line no-unused-vars
function NodeFilter(name, data, master, ingest, coordinating, timestamp) {
  this.name = name;
  this.data = data;
  this.master = master;
  this.ingest = ingest;
  this.coordinating = coordinating;
  this.timestamp = timestamp;

  this.clone = function() {
    // eslint-disable-next-line no-unused-vars
    return new NodeFilter(
        this.name, this.data, this.master, this.ingest, this.coordinating
    );
  };

  this.getSorting = function() {
    return undefined;
  };

  this.equals = function(other) {
    return (
      other !== null &&
      this.name == other.name &&
      this.data == other.data &&
      this.master == other.master &&
      this.ingest == other.ingest &&
      this.coordinating == other.coordinating &&
      this.timestamp == other.timestamp
    );
  };

  this.isBlank = function() {
    return !this.name &&
      (this.data && this.master && this.ingest && this.coordinating);
  };

  this.matches = function(node) {
    var matches = true;
    if (!this.matchesType(node)) {
      matches = false;
    }
    if (matches && this.name) {
      try {
        var regExp = new RegExp(this.name.trim(), 'i');
        matches = regExp.test(node.name);
        if (!matches) {
          var attrs = Object.values(node.attributes);
          for (var idx = 0; idx < attrs.length; idx++) {
            if ((matches = regExp.test(attrs[idx]))) {
              break;
            }
          }
        }
        if (!matches) {
          for (idx = 0; idx < node.roles.length; idx++) {
            if ((matches = regExp.test(node.roles[idx]))) {
              break;
            }
          }
        }
      } catch (err) { // if not valid regexp, still try normal matching
        matches = node.name.indexOf(this.name.toLowerCase()) != -1;
        if (!matches) {
          var _attrs = Object.values(node.attributes);
          for (var _idx = 0; _idx < _attrs.length; _idx++) {
            var attr = _attrs[_idx].toLowerCase();
            matches = true;
            if ((matches = (attr.indexOf(this.name.toLowerCase()) != -1))) {
              break;
            }
          }
        }
        if (!matches) {
          for (_idx = 0; _idx < node.roles.length; _idx++) {
            var role = node.roles[_idx].toLowerCase();
            matches = true;
            if ((matches = (role.indexOf(this.name.toLowerCase()) != -1))) {
              break;
            }
          }
        }
      }
    }
    return matches;
  };

  this.matchesType = function(node) {
    return (
      node.data && this.data ||
      node.master && this.master ||
      node.ingest && this.ingest ||
      node.coordinating && this.coordinating
    );
  };
}
