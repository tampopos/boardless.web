import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Url } from 'src/infrastructures/routing/url';
import { StateMapper } from 'src/infrastructures/stores/types';
import { SignIn } from './accounts/sign-in';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { History } from 'history';
import { SideMenuContainer } from './side-menu/side-menu-container';
import { WorkspaceSearch } from '../workspaces/search';
import { WorkspaceIndex } from '../workspaces';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { SignUp } from 'src/web/pages/shared/accounts/sign-up';
import { SignUpCompletion } from './accounts/sign-up-completion';
import { WorkspaceNew } from '../workspaces/new';

interface WorkspaceRootProps {
  redirectRoot: boolean;
  history: History;
}
interface WorkspaceRootParams {
  workspaceUrl: string;
}
const mapStateToInnerProps: StateMapperWithRouter<
  StoredState,
  WorkspaceRootProps,
  WorkspaceRootParams
> = ({ accounts }, { match, history }) => {
  const { validateWorkspaceUrl } = new AccountsSelectors(accounts);
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
          <Route path={Url.newWorkSpace} component={WorkspaceNew} />
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
        <Route
          path={Url.signUpCompletion}
          component={SignUpCompletion}
          exact={true}
        />
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
const mapStateToProps: StateMapper<StoredState, Props> = ({ accounts }) => {
  const { authenticated } = new AccountsSelectors(accounts);
  return { authenticated };
};
export const AppRouter = withConnectedRouter(mapStateToProps)(Inner);
