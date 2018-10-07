import { Dispatch } from 'redux';
import { ActionCreator } from 'typescript-fsa';
import { StoredState } from './stored-state';
import { RouteComponentProps } from 'react-router';

export type StateMapper<TState, TParam = {}> = ((
  state: StoredState,
  props: RouteComponentProps<TParam>,
) => Partial<TState>);
export type DispatchMapper<TDispatches> = (
  dispatch: Dispatch,
) => Partial<TDispatches>;
export type ActionCreators<TEvent extends {}> = {
  [K in keyof TEvent]: ActionCreator<TEvent[K]>
};
