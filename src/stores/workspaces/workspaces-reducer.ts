import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { UserWorkspace, Workspace } from 'src/models/accounts/workspace';

export const workspacesReducer = (state: StoredState) =>
  reducerWithInitialState(state.workspacesState)
    .case(workspacesActionCreators.clearInvitedWorkspaces, s => {
      return Object.assign({}, s, { invitedWorkspaces: {} });
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
        invitedWorkspaces.forEach(
          w => (s.invitedWorkspaces[w.userWorkspaceId] = w),
        );
        return Object.assign({}, s, {
          invitedWorkspaces: { ...s.invitedWorkspaces },
        });
      },
    )
    .case(workspacesActionCreators.clearJoinableWorkspaces, s => {
      return Object.assign({}, s, { joinableWorkspaces: {} });
    })
    .case(
      workspacesActionCreators.addJoinableWorkspaces,
      (s, { joinableWorkspaces }) => {
        joinableWorkspaces.forEach(w => (s.joinableWorkspaces[w.id] = w));
        return Object.assign({}, s, {
          joinableWorkspaces: { ...s.joinableWorkspaces },
        });
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
