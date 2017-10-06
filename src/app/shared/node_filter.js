function NodeFilter(name, data, master, ingest, coordinating, timestamp) {
  this.name = name;
  this.data = data;
  this.master = master;
  this.ingest = ingest;
  this.coordinating = coordinating;
  this.timestamp = timestamp;

  this.clone = function() {
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
    if (this.isBlank()) {
      return true;
    } else {
      return this.matchesName(node.name) && this.matchesType(node);
    }
  };

  this.matchesType = function(node) {
    return (
      node['node.role'].indexOf('d') !== -1 && this.data ||
      node['node.role'].indexOf('m') !== -1 && this.master ||
      node['node.role'].indexOf('i') !== -1 && this.ingest ||
      node['node.role'].indexOf('-') !== -1 && this.coordinating
    );
  };

  this.matchesName = function(name) {
    if (this.name) {
      return name.toLowerCase().indexOf(this.name.toLowerCase()) != -1;
    } else {
      return true;
    }
  };

}
