import {
  withRouter as withRouterBase,
  RouteComponentProps,
} from 'react-router';
import { RoutingComponent, StateMapperWithRouter } from './types';
import { connect, Matching, GetProps } from 'react-redux';
import { EventMapper } from '../stores/types';

export const withRouter = <TProps = {}, TParam = {}>(
  component: RoutingComponent<TProps, TParam>,
) => {
  return withRouterBase(component);
};
export const withConnectedRouter = <
  TStoredState = {},
  TProps = {},
  TEvents = {},
  TParam = {},
  TOwnProps = {}
>(
  mapStateToProps: StateMapperWithRouter<
    TStoredState,
    TProps,
    TParam,
    TOwnProps
  >,
  mapEventToProps: EventMapper<TEvents, TOwnProps> = () => ({}),
) => <
  C extends React.ComponentType<
    Matching<Partial<TProps> & Partial<TEvents>, GetProps<C>> &
      Partial<RouteComponentProps<TParam>>
  >
>(
  component: C,
) => {
  const c = connect(
    mapStateToProps,
    mapEventToProps,
  )(component);
  return withRouterBase<RouteComponentProps<TParam>>(c as React.ComponentType<
    RouteComponentProps<TParam>
  > &
    typeof c) as React.ComponentType<
    Pick<
      GetProps<C>,
      Exclude<
        keyof GetProps<C>,
        | Extract<keyof TEvents, keyof GetProps<C>>
        | Extract<keyof TProps, keyof GetProps<C>>
        | keyof RouteComponentProps<TParam>
      >
    > &
      TOwnProps
  >;
};
