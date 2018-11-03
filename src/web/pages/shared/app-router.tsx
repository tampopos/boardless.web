import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/infrastructures/routing/url';
import { StateMapper } from 'src/infrastructures/stores/types';
import { SignIn } from './accounts/sign-in';
import { AuthenticatedRoot } from './accounts/authenticated-root';
import { AccountsSelectors } from 'src/domains/stores/accounts/selectors';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { StoredState } from 'src/domains/stores/stored-state';

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  const component = authenticated ? AuthenticatedRoot : SignIn;
  return (
    <Switch>
      <Route path={Url.signIn} component={SignIn} />
      <Route path={Url.workspaceRootTemplate} component={component} />
      <Route path={Url.root} component={component} />
    </Switch>
  );
};
const mapStateToProps: StateMapper<StoredState, Props> = ({ accounts }) => {
  const { authenticated } = new AccountsSelectors(accounts);
  return { authenticated };
};
export const AppRouter = withConnectedRouter(mapStateToProps)(Inner);
