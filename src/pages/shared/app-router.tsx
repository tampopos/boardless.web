import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Url } from 'src/common/routing/url';
import { StateMapper } from 'src/stores/types';
import { connect } from 'react-redux';
import { SignIn } from './accounts/sign-in';
import { AuthenticatedRoot } from './accounts/authenticated-root';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  if (authenticated) {
    return (
      <Switch>
        <Route
          exact={true}
          path={Url.workspaceRootTemplate}
          component={AuthenticatedRoot}
        />
        <Route exact={true} path={Url.root} component={AuthenticatedRoot} />
        <Redirect to={Url.root} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact={true} path={Url.workspaceRootTemplate} component={SignIn} />
      <Route exact={true} path={Url.root} component={SignIn} />
      <Redirect to={Url.root} />
    </Switch>
  );
};
const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { authenticated } = new AccountsGetters(accountsState);
  return { authenticated };
};
export const AppRouter = connect(mapStateToProps)(Inner);
