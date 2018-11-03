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
export type ActionCreators<TEvent extends {}> = {
  [K in keyof TEvent]: ActionCreator<TEvent[K]>
};
export type ReducerBuilders<TStoredState extends {}> = {
  [P in keyof TStoredState]: (
    state: TStoredState[P],
  ) => ReducerBuilder<TStoredState[P], TStoredState[P]>
};
