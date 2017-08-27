function URLAutocomplete(mappings) {

  var PATHS = [
    // Suggest
    '_suggest',
    '{index}/_suggest',
    // Multi Search
    '_msearch',
    '{index}/_msearch',
    '{index}/{type}/_msearch',
    '_msearch/template',
    '{index}/_msearch/template',
    '{index}/{type}/_msearch/template',
    // Search
    '_search',
    '{index}/_search',
    '{index}/{type}/_search',
    '_search/template',
    '{index}/_search/template',
    '{index}/{type}/_search/template',
    '_search/exists',
    '{index}/_search/exists',
    '{index}/{type}/_search/exists'
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
     * Replaces the variables on suggestedPathTokens({index}, {type}...) for
     * actual values extracted from pathTokens
     *
     * @param {Array} pathTokens tokens for the path to be suggested
     * @param {Array} suggestedPathTokens tokens for the suggested path
     * @returns {Array} a new array with the variables from suggestedPathTokens
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
     * @returns {boolean} if suggestion is valid
     */
    var isValidSuggestion = function(pathTokens, suggestedPathTokens) {
      var valid = true;
      suggestedPathTokens.forEach(function(token, index) {
        if (valid && index < pathTokens.length - 1) {
          switch (token) {
            case '{index}':
              valid = Object.keys(mappings).indexOf(pathTokens[index]) >= 0;
              break;
            case '{type}':
              var types = mappings[pathTokens[index - 1]].types;
              valid = types.indexOf(pathTokens[index]) >= 0;
              break;
            default:
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
        switch (suggestedToken) {
          case '{index}':
            Object.keys(mappings).forEach(function(index) {
              addIfNotPresent(alternatives, format(pathTokens, index));
            });
            break;
          case '{type}':
            var pathIndex = pathTokens[suggestedTokenIndex - 1];
            mappings[pathIndex].types.forEach(function(type) {
              addIfNotPresent(alternatives, format(pathTokens, type));
            });
            break;
          default:
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
