import { StyledSFC } from 'src/common/styles/types';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { StateMapperWithRouter } from 'src/stores/types';
import { Route, Switch } from 'react-router';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { Url } from 'src/common/routing/url';
import { Workspace } from 'src/models/accounts/workspace';
import { Claim } from 'src/models/accounts/claim';
import { SideMenuContainer } from '../side-menu/side-menu-container';
import { Bar } from 'src/pages/bar';
import { History } from 'history';
import { WorkspaceIndex } from 'src/pages/workspaces';

const styles = createStyles({
  root: {},
});
interface Props {
  workspaces: { [index: string]: Workspace };
  claims: { [index: string]: Claim };
  workspaceId: string;
  history: History;
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { workspaceId, workspaces, claims, history } = props;
  const checkWorkspace = () => {
    if (!workspaceId) {
      return;
    }
    const workspace = workspaces[workspaceId];
    if (!workspace) {
      history.push(Url.root);
      return;
    }
    const claim = claims[workspace.userId];
    if (!claim) {
      history.push(Url.root);
      return;
    }
  };
  checkWorkspace();
  return (
    <SideMenuContainer>
      <Switch>
        <Route path={Url.workspaceRootTemplate} component={Bar} />
        <Route path={Url.root} component={WorkspaceIndex} />
      </Switch>
    </SideMenuContainer>
  );
};
const mapStateToProps: StateMapperWithRouter<Props, { workspaceId: string }> = (
  { accountsState },
  { match, history },
) => {
  const { workspaces, claims } = accountsState;
  const { workspaceId } = match.params;
  return {
    workspaces,
    claims,
    history,
    workspaceId,
  };
};
const StyledInner = decorate(styles)(Inner);
export const AuthenticatedRoot = withConnectedRouter(mapStateToProps)(
  StyledInner,
);
