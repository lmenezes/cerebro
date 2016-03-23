angular.module('cerebro').directive('ngShard',
    function () {

      return {
        scope: {
          shard: '=shard'
        },
        template: function (elem, attrs) {
          return '<span class="shard shard-{{shard.state.toLowerCase()}}" ng-class="{\'shard-replica\': !shard.primary && shard.node}">' +
              '<small>{{shard.shard}}</small>' +
              '</span>';
        }
      };
    }
);
