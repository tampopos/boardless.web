import {
  withRouter as withRouterBase,
  RouteComponentProps,
} from 'react-router';
import { RoutingComponent } from './types';
import { connect, Matching, GetProps } from 'react-redux';
import { StateMapperWithRouter, DispatchMapper } from 'src/stores/types';

export const withRouter = <TProps = {}, TParam = {}>(
  component: RoutingComponent<TProps, TParam>,
) => {
  return withRouterBase(component);
};
export const withConnectedRouter = <
  TProps = {},
  TEvents = {},
  TParam = {},
  TOwnProps = {}
>(
  mapStateToProps: StateMapperWithRouter<TProps, TParam, TOwnProps>,
  mapDispatchToProps: DispatchMapper<TEvents, TOwnProps> = () => ({}),
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
    mapDispatchToProps,
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
