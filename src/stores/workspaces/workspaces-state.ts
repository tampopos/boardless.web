import { UserWorkspace, Workspace } from 'src/models/accounts/workspace';

export const defaultWorkspacesState = {
  invitedWorkspaces: [] as UserWorkspace[],
  joinableWorkspaces: [] as Workspace[],
};
export type WorkspacesState = typeof defaultWorkspacesState;
