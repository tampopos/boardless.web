import * as matchBase from 'autosuggest-highlight/match';
import * as parseBase from 'autosuggest-highlight/parse';
export const match = (text: string, query: string): number[] | number[][] => {
  return matchBase(text, query);
};
export const parse = (
  text: string,
  matches: number[] | number[][],
): Array<{ text: string; highlight: boolean }> => {
  return parseBase(text, matches);
};
