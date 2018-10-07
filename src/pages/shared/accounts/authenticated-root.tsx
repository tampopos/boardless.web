import { StyledSFC } from 'src/common/styles/types';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { StateMapper } from 'src/stores/types';
import { RouteComponentProps, Route } from 'react-router';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { Url } from 'src/common/routing/url';
import { Workspace } from 'src/models/accounts/workspace';
import { Claim } from 'src/models/accounts/claim';
import { SideMenuContainer } from '../side-menu/side-menu-container';
import { Bar } from 'src/pages/bar';

const styles = createStyles({
  root: {},
});
interface Props {
  workspaces: { [index: string]: Workspace };
  claims: { [index: string]: Claim };
}
const Inner: StyledSFC<
  typeof styles,
  Props & RouteComponentProps<{ workspaceId: string }>
> = props => {
  const { history, match, workspaces, claims } = props;
  const { workspaceId } = match.params;
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
      <Route exact={true} path={Url.workspaceRootTemplate} component={Bar} />
      <Route exact={true} path={Url.root} component={Bar} />
    </SideMenuContainer>
  );
};
const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { workspaces, claims } = accountsState;
  return {
    workspaces,
    claims,
  };
};
const StyledInner = decorate(styles)(Inner);
export const AuthenticatedRoot = withConnectedRouter(mapStateToProps)(
  StyledInner,
);
