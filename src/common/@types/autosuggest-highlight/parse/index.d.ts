declare module 'autosuggest-highlight/parse' {
  function parse(
    text: string,
    matches: number[] | number[][],
  ): Array<{ text: string; highlight: boolean }>;
  namespace parse {

  }
  export = parse;
}
