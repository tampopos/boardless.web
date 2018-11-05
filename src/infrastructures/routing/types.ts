import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { StateMapper } from '../stores/types';

export type RoutingProps<TProps = {}, TParam = {}> = RouteComponentProps<
  TParam
> &
  TProps;
export type RoutingComponentClass<
  TProps = {},
  TParam = {},
  TState = {}
> = React.ComponentClass<RoutingProps<TProps, TParam>, TState>;
export type RoutingSFC<TProps = {}, TParam = {}> = React.SFC<
  RoutingProps<TProps, TParam>
>;
export type RoutingComponent<TProps = {}, TParam = {}> =
  | RoutingComponentClass<TProps, TParam>
  | RoutingSFC<TProps, TParam>;
export type StateMapperWithRouter<
  TStoredState extends {},
  TState,
  TParam = {},
  TOwnProps = {}
> = StateMapper<TStoredState, TState, RoutingProps<TOwnProps, TParam>>;
