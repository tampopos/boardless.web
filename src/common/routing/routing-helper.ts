import { withRouter as withRouterBase } from 'react-router';
import { RoutingComponent } from './types';

export const withRouter = <TProps = {}>(
  component: RoutingComponent<TProps>,
) => {
  return withRouterBase(component);
};
