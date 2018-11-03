import { Dispatch } from 'redux';
import { ActionCreator } from 'typescript-fsa';
import { StoredState } from './stored-state';
import { RoutingProps } from 'src/common/routing/types';
import { ReducerBuilder } from 'typescript-fsa-reducers';

export type StateMapper<TState, TOwnProps = {}> = ((
  state: StoredState,
  props: TOwnProps,
) => Partial<TState>);
export type StateMapperWithRouter<
  TState,
  TParam = {},
  TOwnProps = {}
> = StateMapper<TState, RoutingProps<TOwnProps, TParam>>;
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
