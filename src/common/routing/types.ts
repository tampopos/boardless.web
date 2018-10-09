import * as React from 'react';
import { RouteComponentProps } from 'react-router';

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
