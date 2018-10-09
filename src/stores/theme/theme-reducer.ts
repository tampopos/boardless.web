import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const themeReducer = (state: StoredState) =>
  reducerWithInitialState(state.themeState);
