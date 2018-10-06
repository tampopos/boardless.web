import * as React from 'react';
import { createStyles, AppBar } from '@material-ui/core';
import { StyledSFC } from 'src/common/styles/types';
import { RouteComponentProps, withRouter } from 'react-router';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { decorate, appendClassName } from 'src/common/styles/styles-helper';
import { connect } from 'react-redux';
import { Workspace } from 'src/models/accounts/workspace';
import { WorkspaceIcon } from './workspace-icon';
import { History } from 'history';
import { Url } from 'src/common/routing/url';
import { delay } from 'src/common/async-helper';

const styles = createStyles({
  root: {},
  workspaceAria: {},
  contentAria: {},
  content: {},
  workspaceBtn: {},
  selectedWorkspaceBtn: {},
});
interface Props {
  workspaces: { [index: string]: Workspace };
}
const mapStateToProps: StateMapper<Props> = ({ accountsState }) => {
  const { workspaces } = accountsState;
  return { workspaces };
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
    getSrc: async workspace => {
      await delay(1000);
      return 'https://material-ui.com/static/images/grid-list/breakfast.jpg';
    },
  };
};
const Inner: StyledSFC<
  typeof styles,
  Props & Events & RouteComponentProps<{ workspaceId: string }>
> = ({ match, classes, workspaces, selectWorkspace, history, getSrc }) => {
  const { workspaceId } = match.params;
  const currentWorkspace = workspaces[workspaceId];
  const {
    root,
    workspaceAria,
    contentAria,
    content,
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
            <div
              key={key}
              className={appendClassName(
                workspaceBtn,
                isSelected ? selectedWorkspaceBtn : undefined,
              )}
            >
              <WorkspaceIcon
                workspace={workspace}
                onClick={selectWorkspace(history)}
                getSrc={getSrc}
              />
            </div>
          );
        })}
      </div>
      <div className={contentAria}>
        <AppBar position="static">
          {currentWorkspace ? currentWorkspace.name : ''}
        </AppBar>
        <div className={content}>xxx</div>
      </div>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
const RoutingInner = withRouter(StyledInner);
export const SideMenuContent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutingInner);
