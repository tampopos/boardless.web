import { UserWorkspace } from 'src/domains/models/accounts/workspace';

export interface Action {
  setInvitedWorkspaces: { invitedWorkspaces: UserWorkspace[] };
  clearInvitedWorkspaces: {};
  addInvitedWorkspaces: { invitedWorkspaces: UserWorkspace[] };
  clearJoinableWorkspaces: {};
  addJoinableWorkspaces: { joinableWorkspaces: UserWorkspace[] };
}
export default Action;
