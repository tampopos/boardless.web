import { UserWorkspace } from 'src/domains/models/accounts/workspace';

export interface Action {
  setInvitedWorkspaces: { invitedWorkspaces: UserWorkspace[] };
  clearInvitedWorkspaces: void;
  addInvitedWorkspaces: { invitedWorkspaces: UserWorkspace[] };
  clearJoinableWorkspaces: void;
  addJoinableWorkspaces: { joinableWorkspaces: UserWorkspace[] };
}
