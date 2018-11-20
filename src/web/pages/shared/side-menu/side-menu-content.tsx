import * as React from 'react';
import { createStyles, Toolbar, Typography } from '@material-ui/core';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { UserWorkspace } from 'src/domains/models/accounts/workspace';
import {
  WorkspaceIconButton,
  WorkspaceIconButtonBase,
} from '../../workspaces/workspace-icon';
import { History } from 'history';
import { Url } from 'src/infrastructures/routing/url';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { Theme } from 'src/infrastructures/styles/theme';
import { Add } from '@material-ui/icons';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { Resources } from 'src/domains/common/location/resources';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { EventMapper } from 'src/infrastructures/stores/types';

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
  workspaces: { [index: string]: UserWorkspace };
  currentWorkspace?: UserWorkspace;
  resources: Resources;
  history: History;
}
interface RouteParams {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  RouteParams
> = ({ accounts }, { match, history }) => {
  const { workspaceUrl } = match.params;
  const { workspaces } = accounts;
  const { getCurrentWorkspace, resources } = new AccountsSelectors(accounts);
  const currentWorkspace = getCurrentWorkspace(workspaceUrl);
  return { workspaces, workspaceUrl, resources, history, currentWorkspace };
};
interface Events {
  addWorkspace: (history: History) => () => void;
}
const mapEventToProps: EventMapper<Events> = () => {
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
  resources,
  addWorkspace,
  currentWorkspace,
}) => {
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
          const w = x[1];
          const isSelected =
            currentWorkspace && key === currentWorkspace.userWorkspaceId;
          return (
            <div key={key} className={workspaceBtn}>
              <WorkspaceIconButton
                workspace={w}
                injectClasses={{
                  root: isSelected ? selectedWorkspaceBtn : undefined,
                }}
              />
            </div>
          );
        })}
        <div className={workspaceBtn}>
          <WorkspaceIconButtonBase
            onClick={addWorkspace(history)}
            title={resources.AddWorkspace}
          >
            <Add />
          </WorkspaceIconButtonBase>
        </div>
      </div>
      <div className={contentAria}>
        <div className={contentHeader}>
          <Toolbar>
            <Typography color="inherit">
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
  mapEventToProps,
)(StyledInner);
