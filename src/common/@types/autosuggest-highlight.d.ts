declare module 'autosuggest-highlight' {
  function match(text: string, query: string): number[] | number[][];
  function parse(
    text: string,
    matches: number[] | number[][],
  ): Array<{ text: string; highlight: boolean }>;
}
