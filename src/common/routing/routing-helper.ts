import { withRouter as withRouterBase } from 'react-router';
import { RoutingComponent } from './types';
import { connect, Matching, GetProps } from 'react-redux';
import { StateMapper, DispatchMapper } from 'src/stores/types';

export const withRouter = <TProps = {}, TParam = {}>(
  component: RoutingComponent<TProps, TParam>,
) => {
  return withRouterBase(component);
};
export const withConnectedRouter = <TProps = {}, TEvents = {}, TParam = {}>(
  mapStateToProps: StateMapper<TProps, TParam>,
  mapDispatchToProps: DispatchMapper<TEvents> = () => ({}),
) => <
  C extends React.ComponentType<
    Matching<Partial<TProps> & Partial<TEvents>, GetProps<C>>
  >
>(
  component: C,
) => {
  return withRouterBase(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(component),
  );
};
