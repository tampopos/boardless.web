import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/common/routing/url';
import { StateMapper, StateMapperWithRouter } from 'src/stores/types';
import { SignIn } from './accounts/sign-in';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { SignUp } from './accounts/sign-up';
import { History } from 'history';
import { SideMenuContainer } from './side-menu/side-menu-container';
import { WorkspaceSearch } from '../workspaces/search';
import { Bar } from '../bar';
import { WorkspaceIndex } from '../workspaces';

interface WorkspaceRootProps {
  redirectRoot: boolean;
  history: History;
}
interface WorkspaceRootParams {
  workspaceUrl: string;
}
const mapStateToInnerProps: StateMapperWithRouter<
  WorkspaceRootProps,
  WorkspaceRootParams
> = ({ accountsState }, { match, history }) => {
  const { validateWorkspaceUrl } = new AccountsGetters(accountsState);
  const { workspaceUrl } = match.params;
  const redirectRoot = !validateWorkspaceUrl(workspaceUrl);
  return {
    history,
    redirectRoot,
  };
};
const WorkspaceRoot = withConnectedRouter(mapStateToInnerProps)(
  class extends React.Component<WorkspaceRootProps> {
    public componentDidMount() {
      const { redirectRoot, history } = this.props;
      if (redirectRoot) {
        history.push(Url.root);
      }
    }
    public render() {
      return (
        <Switch>
          <Route path={Url.searchWorkspaces()} component={WorkspaceSearch} />
          <Route path={Url.workspaceRootTemplate} component={Bar} />
          <Route path={Url.root} component={WorkspaceIndex} />
        </Switch>
      );
    }
  },
);

interface Props {
  authenticated: boolean;
}
export const Inner: React.SFC<Props> = ({ authenticated }) => {
  return (
    <SideMenuContainer>
      <Switch>
        <Route path={Url.signIn} component={SignIn} exact={true} />
        <Route path={Url.signUp} component={SignUp} exact={true} />
        <Route
          path={Url.workspaceRootTemplate}
          component={authenticated ? WorkspaceRoot : SignIn}
        />
        <Route
          path={Url.root}
          component={authenticated ? WorkspaceRoot : SignIn}
        />
      </Switch>
    </SideMenuContainer>
  );
};
const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { authenticated } = new AccountsGetters(accountsState);
  return { authenticated };
};
export const AppRouter = withConnectedRouter(mapStateToProps)(Inner);
