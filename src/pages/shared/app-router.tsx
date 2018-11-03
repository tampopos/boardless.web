import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/common/routing/url';
import { StateMapper } from 'src/stores/types';
import { SignIn } from './accounts/sign-in';
import { AuthenticatedRoot } from './accounts/authenticated-root';
import { AccountsSelectors } from 'src/stores/accounts/selectors';
import { withConnectedRouter } from 'src/common/routing/routing-helper';

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
const mapStateToProps: StateMapper<Props> = ({ accounts }) => {
  const { authenticated } = new AccountsSelectors(accounts);
  return { authenticated };
};
export const AppRouter = withConnectedRouter(mapStateToProps)(Inner);
