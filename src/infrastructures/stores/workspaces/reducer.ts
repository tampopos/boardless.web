import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { WorkspacesState } from './state';
import {
  clearInvitedWorkspaces,
  setInvitedWorkspaces,
  addInvitedWorkspaces,
  clearJoinableWorkspaces,
  addJoinableWorkspaces,
} from './action-creators';

export const workspacesReducer = (state: WorkspacesState) =>
  reducerWithInitialState(state)
    .case(clearInvitedWorkspaces, s => {
      return Object.assign({}, s, { invitedWorkspaces: {} });
    })
    .case(setInvitedWorkspaces, (s, { invitedWorkspaces }) => {
      return Object.assign({}, s, { invitedWorkspaces });
    })
    .case(addInvitedWorkspaces, (s, { invitedWorkspaces }) => {
      invitedWorkspaces.forEach(
        w => (s.invitedWorkspaces[w.userWorkspaceId] = w),
      );
      return Object.assign({}, s, {
        invitedWorkspaces: { ...s.invitedWorkspaces },
      });
    })
    .case(clearJoinableWorkspaces, s => {
      return Object.assign({}, s, { joinableWorkspaces: {} });
    })
    .case(addJoinableWorkspaces, (s, { joinableWorkspaces }) => {
      joinableWorkspaces.forEach(w => (s.joinableWorkspaces[w.id] = w));
      return Object.assign({}, s, {
        joinableWorkspaces: { ...s.joinableWorkspaces },
      });
    });
