import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ThemeState } from './state';

export const themeReducer = (state: ThemeState) =>
  reducerWithInitialState(state);
