import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/common/routing/url';
import { StateMapper } from 'src/stores/types';
import { SignIn } from './accounts/sign-in';
import { AuthenticatedRoot } from './accounts/authenticated-root';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { SignUp } from './accounts/sign-up';

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  const component = authenticated ? AuthenticatedRoot : SignIn;
  return (
    <Switch>
      <Route path={Url.signIn} component={SignIn} exact={true} />
      <Route path={Url.signUp} component={SignUp} exact={true} />
      <Route path={Url.workspaceRootTemplate} component={component} />
      <Route path={Url.root} component={component} />
    </Switch>
  );
};
const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { authenticated } = new AccountsGetters(accountsState);
  return { authenticated };
};
export const AppRouter = withConnectedRouter(mapStateToProps)(Inner);
