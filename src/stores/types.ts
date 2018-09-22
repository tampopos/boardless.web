import { Dispatch } from 'redux';
import { ActionCreator } from 'typescript-fsa';
import { StoredState } from './stored-state';

export type StateMapper<TState> = (state: StoredState) => Partial<TState>;
export type DispatchMapper<TDispatches> = (
  dispatch: Dispatch,
) => Partial<TDispatches>;
export type ActionCreators<TEvent extends {}> = {
  [K in keyof TEvent]: ActionCreator<TEvent[K]>
};
