import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Url } from 'src/common/routing/url';
import { StateMapper } from 'src/stores/types';
import { connect } from 'react-redux';
import { SignIn } from './sign-in';
import { AuthenticatedRoot } from './authenticated-root';
import { AuthenticateGetters } from 'src/stores/authenticate/authenticate-state';

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
  const { authenticated } = new AuthenticateGetters(authenticateState);
  return { authenticated };
};
export const AppRouter = connect(mapStateToProps)(Inner);
