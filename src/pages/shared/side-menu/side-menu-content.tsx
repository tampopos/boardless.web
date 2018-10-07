import * as React from 'react';
import { createStyles, Toolbar, Typography } from '@material-ui/core';
import { StyledSFC } from 'src/common/styles/types';
import { RouteComponentProps } from 'react-router';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { decorate } from 'src/common/styles/styles-helper';
import { Workspace } from 'src/models/accounts/workspace';
import { WorkspaceIcon } from './workspace-icon';
import { History } from 'history';
import { Url } from 'src/common/routing/url';
import { delay } from 'src/common/async-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { Theme } from 'src/common/styles/theme';

const styles = (theme: Theme) =>
  createStyles({
    root: { height: '100%', display: 'flex' },
    workspaceAria: {
      padding: 15,
      borderRightColor: theme.palette.divider,
      borderRightStyle: 'solid',
      borderRightWidth: 2,
    },
    contentAria: { width: '100%' },
    content: {},
    contentHeader: theme.mixins.toolbar,
    workspaceBtn: {
      marginBottom: 10,
    },
    selectedWorkspaceBtn: theme.shared.workspaceIcon.selectedButton,
  });
interface Props {
  workspaceId: string;
  workspaces: { [index: string]: Workspace };
}
interface RouteParams {
  workspaceId: string;
}
const mapStateToProps: StateMapper<Props, RouteParams> = (
  { accountsState },
  { match, history, location },
) => {
  const { workspaceId } = match.params;
  const { workspaces } = accountsState;
  return { workspaces, workspaceId, history, location };
};
interface Events {
  selectWorkspace: (history: History) => (workspace: Workspace) => void;
  getSrc: (workspace: Workspace) => Promise<string>;
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  return {
    selectWorkspace: history => workspace => {
      const { id } = workspace;
      const url = Url.workspaceRoot(id);
      history.push(url);
    },
    getSrc: async () => {
      await delay(1000);
      return 'https://material-ui.com/static/images/grid-list/breakfast.jpg';
    },
  };
};
const Inner: StyledSFC<typeof styles, Props & Events & RouteComponentProps> = ({
  classes,
  workspaces,
  selectWorkspace,
  history,
  getSrc,
  workspaceId,
}) => {
  const currentWorkspace = workspaces[workspaceId];
  const {
    root,
    workspaceAria,
    contentAria,
    content,
    contentHeader,
    workspaceBtn,
    selectedWorkspaceBtn,
  } = classes;
  return (
    <div className={root}>
      <div className={workspaceAria}>
        {Object.entries(workspaces).map(x => {
          const key = x[0];
          const workspace = x[1];
          const isSelected = key === workspaceId;
          return (
            <div key={key} className={workspaceBtn}>
              <WorkspaceIcon
                workspace={workspace}
                onClick={selectWorkspace(history)}
                getSrc={getSrc}
                injectClasses={{
                  btn: isSelected ? selectedWorkspaceBtn : undefined,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className={contentAria}>
        <div className={contentHeader}>
          <Toolbar>
            <Typography variant="body1" color="inherit">
              {currentWorkspace ? currentWorkspace.name : ''}
            </Typography>
          </Toolbar>
        </div>
        <div className={content}>xxx</div>
      </div>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const SideMenuContent = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
