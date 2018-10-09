import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export type RoutingProps<TProps = {}> = RouteComponentProps<{}> & TProps;
export type RoutingComponentClass<
  TProps = {},
  TState = {}
> = React.ComponentClass<RoutingProps<TProps>, TState>;
export type RoutingSFC<TProps = {}> = React.SFC<RoutingProps<TProps>>;
export type RoutingComponent<TProps = {}> =
  | RoutingComponentClass<TProps>
  | RoutingSFC<TProps>;
