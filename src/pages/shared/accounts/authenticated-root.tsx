import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { StateMapperWithRouter } from 'src/stores/types';
import { Route, Switch } from 'react-router';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { Url } from 'src/common/routing/url';
import { SideMenuContainer } from '../side-menu/side-menu-container';
import { History } from 'history';
import { WorkspaceIndex } from 'src/pages/workspaces';
import { AccountsSelectors } from 'src/stores/accounts/selectors';
import { WorkspaceSearch } from 'src/pages/workspaces/search';

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
const mapStateToProps: StateMapperWithRouter<Props, Params> = (
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
