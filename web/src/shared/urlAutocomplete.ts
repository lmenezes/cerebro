// 对应旧前端 shared/url_autocomplete.js：REST 页路径输入的补全建议。
const PATHS = [
  '_msearch',
  '{index}/_msearch',
  '_msearch/template',
  '{index}/_msearch/template',
  '_search',
  '{index}/_search',
  '_search/template',
  '{index}/_search/template',
];

const format = (previousTokens: string[], suggestedToken: string) => {
  if (previousTokens.length > 1) {
    const prefix = previousTokens.slice(0, -1).join('/');
    return prefix.length > 0 ? prefix + '/' + suggestedToken : suggestedToken;
  }
  return suggestedToken;
};

export class URLAutocomplete {
  constructor(private indices: string[]) {}

  getAlternatives(path: string): string[] {
    const indices = this.indices;
    const pathTokens = path.split('/');
    const suggestedTokenIndex = pathTokens.length - 1;

    const replaceVariables = (suggested: string[]) =>
      suggested.map((token, position) =>
        position < pathTokens.length - 1 && token.indexOf('{') === 0 ? pathTokens[position] : token,
      );

    const isValidSuggestion = (suggested: string[]) => {
      let valid = true;
      suggested.forEach((token, index) => {
        if (valid && index < pathTokens.length - 1) {
          valid = token === '{index}' ? indices.indexOf(pathTokens[index]) >= 0 : pathTokens[index] === token;
        }
      });
      return valid;
    };

    const alternatives: string[] = [];
    const addIfNotPresent = (element: string) => {
      if (alternatives.indexOf(element) === -1) {
        alternatives.push(element);
      }
    };

    PATHS.forEach((suggestedPath) => {
      let suggested = suggestedPath.split('/');
      if (suggested.length > suggestedTokenIndex && isValidSuggestion(suggested)) {
        suggested = replaceVariables(suggested);
        const token = suggested[suggestedTokenIndex];
        if (token === '{index}') {
          indices.forEach((index) => addIfNotPresent(format(pathTokens, index)));
        } else {
          addIfNotPresent(format(pathTokens, token));
        }
      }
    });

    return alternatives.sort((a, b) => a.localeCompare(b));
  }
}
