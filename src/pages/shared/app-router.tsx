import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { resolve } from 'src/common/di/service-provider';
import { Url } from 'src/common/routing/url';
import { StateMapper } from 'src/stores/types';
import { connect } from 'react-redux';
import { SignIn } from './sign-in';
import { AuthenticatedRoot } from './authenticated-root';

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  if (authenticated) {
    return (
      <Switch>
        <Route
          exact={true}
          path={Url.workSpaceRootTemplate}
          component={AuthenticatedRoot}
        />
        <Route exact={true} path={Url.root} component={AuthenticatedRoot} />
        <Redirect to={Url.root} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact={true} path={Url.workSpaceRootTemplate} component={SignIn} />
      <Route exact={true} path={Url.root} component={SignIn} />
      <Redirect to={Url.root} />
    </Switch>
  );
};
const mapStateToProps: StateMapper<Props> = ({ authenticateState }) => {
  const { claim } = authenticateState;
  return {
    authenticated: resolve('authenticateService').isAuthenticated(claim),
  };
};
export const AppRouter = connect(mapStateToProps)(Inner);
