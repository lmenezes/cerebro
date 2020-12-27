angular.module('cerebro').directive('analysisTokens', function() {
  return {
    scope: {
      tokens: '=tokens',
    },
    templateUrl: 'analysis/tokens.html',
  };
});
