import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { UserWorkspace, Workspace } from 'src/models/accounts/workspace';

export const workspacesReducer = (state: StoredState) =>
  reducerWithInitialState(state.workspacesState)
    .case(workspacesActionCreators.clearInvitedWorkspaces, s => {
      return Object.assign({}, s, { invitedWorkspaces: [] });
    })
    .case(
      workspacesActionCreators.setInvitedWorkspaces,
      (s, { invitedWorkspaces }) => {
        return Object.assign({}, s, { invitedWorkspaces });
      },
    )
    .case(
      workspacesActionCreators.addInvitedWorkspaces,
      (s, { invitedWorkspaces }) => {
        const newWorkspaces = [...s.invitedWorkspaces];
        invitedWorkspaces
          .filter(
            w =>
              s.invitedWorkspaces.filter(
                x => x.userWorkspaceId === w.userWorkspaceId,
              ).length === 0,
          )
          .forEach(w => newWorkspaces.push(w));
        return Object.assign({}, s, { invitedWorkspaces: newWorkspaces });
      },
    )
    .case(workspacesActionCreators.clearJoinableWorkspaces, s => {
      return Object.assign({}, s, { joinableWorkspaces: [] });
    })
    .case(
      workspacesActionCreators.addJoinableWorkspaces,
      (s, { joinableWorkspaces }) => {
        const newWorkspaces = [...s.joinableWorkspaces];
        joinableWorkspaces
          .filter(
            w =>
              s.joinableWorkspaces.filter(
                x => x.workspaceUrl === w.workspaceUrl,
              ).length === 0,
          )
          .forEach(w => newWorkspaces.push(w));
        return Object.assign({}, s, { joinableWorkspaces: newWorkspaces });
      },
    );
const factory = actionCreatorFactory();
export const workspacesActionCreators = {
  setInvitedWorkspaces: factory<{ invitedWorkspaces: UserWorkspace[] }>(
    'workspacesActionCreators.setInvitedWorkspaces',
  ),
  clearInvitedWorkspaces: factory<void>(
    'workspacesActionCreators.clearInvitedWorkspaces',
  ),
  addInvitedWorkspaces: factory<{ invitedWorkspaces: UserWorkspace[] }>(
    'workspacesActionCreators.addInvitedWorkspaces',
  ),
  clearJoinableWorkspaces: factory<void>(
    'workspacesActionCreators.clearJoinableWorkspaces',
  ),
  addJoinableWorkspaces: factory<{ joinableWorkspaces: Workspace[] }>(
    'workspacesActionCreators.addJoinableWorkspaces',
  ),
};
