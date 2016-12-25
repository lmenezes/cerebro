angular.module('cerebro').directive('ngShard', function() {
  return {
    scope: true,
    link: function(scope) {
      var shard = scope.shard;
      scope.state = shard.state.toLowerCase();
      scope.replica = !shard.primary && shard.node;
      scope.id = shard.shard + '_' + shard.node + '_' + shard.index;
      scope.clazz = scope.replica ? 'shard-replica' : '';
      scope.equal = function(other) {
        return other && shard.index === other.index &&
          shard.node === other.node && shard.shard === other.shard;
      };
    },
    templateUrl: function() {
      return 'overview/shard.html';
    }
  };
});
