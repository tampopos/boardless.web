import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Bar } from '../bar';
import { StateMapper } from 'src/stores/types';
import { connect } from 'react-redux';
import { SignIn } from './sign-in';
import { resolve } from 'src/common/service-provider';

interface Props {
  authenticated: boolean;
}

export namespace Url {
  export const root = '/';
  export const help = '/help';
}
const Inner: React.SFC<Props> = props => {
  const { authenticated } = props;
  if (!authenticated) {
    return <SignIn />;
  }
  return (
    <Switch>
      <Route exact={true} path={Url.root} component={Bar} />
      <Redirect to={Url.root} />
    </Switch>
  );
};
const mapStateToProps: StateMapper<Props> = ({ authenticateState }) => {
  return {
    authenticated: resolve('authenticateService').isAuthenticated(
      authenticateState,
    ),
  };
};
export const AppRouter = connect(mapStateToProps)(Inner);
