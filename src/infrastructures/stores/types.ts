import { Dispatch } from 'redux';
import { ActionCreator } from 'typescript-fsa';
import { ReducerBuilder } from 'typescript-fsa-reducers';

export type StateMapper<TStoredState extends {}, TState, TOwnProps = {}> = ((
  state: TStoredState,
  props: TOwnProps,
) => Partial<TState>);
export type DispatchMapper<TDispatches, TOwnProps = {}> = (
  dispatch: Dispatch,
  props: TOwnProps,
) => Partial<TDispatches>;
export type ActionCreators<TAction extends {}> = {
  [K in keyof TAction]: ActionCreator<TAction[K]>
};
export type ReducerBuilders<TStoredState extends {}> = {
  [P in keyof TStoredState]: (
    state: TStoredState[P],
  ) => ReducerBuilder<TStoredState[P], TStoredState[P]>
};
export type ReducerFunctions<TState, TAction> = {
  [TKey in keyof TAction]: (state: TState, payload: TAction[TKey]) => TState
};
export type Operators<TAction extends {}> = {
  [K in keyof TAction]: (payload: TAction[K]) => void
};
