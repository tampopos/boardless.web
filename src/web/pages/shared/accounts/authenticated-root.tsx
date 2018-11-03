import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { SideMenuContainer } from '../side-menu/side-menu-container';
import { History } from 'history';
import { WorkspaceIndex } from 'src/web/pages/workspaces';
import { AccountsSelectors } from 'src/domains/stores/accounts/selectors';
import { WorkspaceSearch } from 'src/web/pages/workspaces/search';
import { StoredState } from 'src/domains/stores/stored-state';
import { Url } from 'src/infrastructures/routing/url';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';

const styles = createStyles({
  root: {},
});
interface Props {
  redirectRoot: boolean;
  history: History;
}
class Inner extends StyledComponentBase<typeof styles, Props> {
  public componentDidMount() {
    const { redirectRoot, history } = this.props;
    if (redirectRoot) {
      history.push(Url.root);
    }
  }
  public render() {
    return (
      <SideMenuContainer>
        <Switch>
          <Route path={Url.searchWorkspaces()} component={WorkspaceSearch} />
          <Route path={Url.root} component={WorkspaceIndex} />
        </Switch>
      </SideMenuContainer>
    );
  }
}
interface Params {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<StoredState, Props, Params> = (
  { accounts },
  { match, history },
) => {
  const { validateWorkspaceUrl } = new AccountsSelectors(accounts);
  const { workspaceUrl } = match.params;
  const redirectRoot = !validateWorkspaceUrl(workspaceUrl);
  return {
    history,
    redirectRoot,
  };
};
const StyledInner = decorate(styles)(Inner);
export const AuthenticatedRoot = withConnectedRouter(mapStateToProps)(
  StyledInner,
);
