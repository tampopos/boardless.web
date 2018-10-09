import * as React from 'react';
import { createStyles, Toolbar, Typography } from '@material-ui/core';
import { StyledSFC } from 'src/common/styles/types';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { decorate } from 'src/common/styles/styles-helper';
import { Workspace } from 'src/models/accounts/workspace';
import {
  WorkspaceIcon,
  WorkspaceIconBase,
} from '../../workspaces/workspace-icon';
import { History } from 'history';
import { Url } from 'src/common/routing/url';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { Theme } from 'src/common/styles/theme';
import { Add } from '@material-ui/icons';
import { Resources } from 'src/common/location/resources';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';

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
  resources: Resources;
  history: History;
}
interface RouteParams {
  workspaceId: string;
}
const mapStateToProps: StateMapperWithRouter<Props, RouteParams> = (
  { accountsState },
  { match, history },
) => {
  const { workspaceId } = match.params;
  const { workspaces } = accountsState;
  const { resources } = new AccountsGetters(accountsState);
  return { workspaces, workspaceId, resources, history };
};
interface Events {
  addWorkspace: (history: History) => () => void;
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  return {
    addWorkspace: history => () => {
      history.push(Url.root);
    },
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = ({
  classes,
  workspaces,
  history,
  workspaceId,
  resources,
  addWorkspace,
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
                injectClasses={{
                  btn: isSelected ? selectedWorkspaceBtn : undefined,
                }}
              />
            </div>
          );
        })}
        <div className={workspaceBtn}>
          <WorkspaceIconBase
            onClick={addWorkspace(history)}
            title={resources.AddWorkspace}
          >
            <Add />
          </WorkspaceIconBase>
        </div>
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
