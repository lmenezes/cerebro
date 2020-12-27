// eslint-disable-next-line no-unused-vars
function URLAutocomplete(indices) {
  var PATHS = [
    // Multi Search
    '_msearch',
    '{index}/_msearch',
    '_msearch/template',
    '{index}/_msearch/template',
    // Search
    '_search',
    '{index}/_search',
    '_search/template',
    '{index}/_search/template',
  ];

  var format = function(previousTokens, suggestedToken) {
    if (previousTokens.length > 1) {
      var prefix = previousTokens.slice(0, -1).join('/');
      if (prefix.length > 0) {
        return prefix + '/' + suggestedToken;
      } else {
        return suggestedToken;
      }
    } else {
      return suggestedToken;
    }
  };

  this.getAlternatives = function(path) {
    var pathTokens = path.split('/');
    var suggestedTokenIndex = pathTokens.length - 1;

    /**
     * Replaces the variables on suggestedPathTokens({index}) for
     * actual values extracted from pathTokens
     *
     * @param {Array} pathTokens tokens for the path to be suggested
     * @param {Array} suggestedPathTokens tokens for the suggested path
     * @return {Array} a new array with the variables from suggestedPathTokens
     * replaced by the actual values from pathTokens
     */
    var replaceVariables = function(pathTokens, suggestedPathTokens) {
      var replaced = suggestedPathTokens.map(function(token, position) {
        if (position < pathTokens.length - 1 && token.indexOf('{') === 0) {
          return pathTokens[position];
        } else {
          return token;
        }
      });
      return replaced;
    };

    /**
     * Checks if a given path matches the definition and current state of
     * the path to be autocompleted
     *
     * @param {Array} pathTokens tokens of path to be autocompleted
     * @param {Array} suggestedPathTokens tokens of possible suggestion
     * @return {boolean} if suggestion is valid
     */
    var isValidSuggestion = function(pathTokens, suggestedPathTokens) {
      var valid = true;
      suggestedPathTokens.forEach(function(token, index) {
        if (valid && index < pathTokens.length - 1) {
          if (token === '{index}') {
            valid = indices.indexOf(pathTokens[index]) >= 0;
          } else {
            valid = pathTokens[index] === token;
          }
        }
      });
      return valid;
    };

    var alternatives = [];

    var addIfNotPresent = function(collection, element) {
      if (collection.indexOf(element) === -1) {
        collection.push(element);
      }
    };

    PATHS.forEach(function(suggestedPath) {
      var suggestedPathTokens = suggestedPath.split('/');
      if (suggestedPathTokens.length > suggestedTokenIndex &&
        isValidSuggestion(pathTokens, suggestedPathTokens)) {
        suggestedPathTokens = replaceVariables(
            pathTokens,
            suggestedPathTokens
        );
        var suggestedToken = suggestedPathTokens[suggestedTokenIndex];
        if (suggestedToken === '{index}') {
          indices.forEach(function(index) {
            addIfNotPresent(alternatives, format(pathTokens, index));
          });
        } else {
          addIfNotPresent(alternatives, format(pathTokens, suggestedToken));
        }
      }
    });

    return alternatives.sort(function(a, b) {
      return a.localeCompare(b);
    });
  };

  return this;
}
