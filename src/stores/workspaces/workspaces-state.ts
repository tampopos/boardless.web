import { Workspace } from 'src/models/accounts/workspace';

export const defaultWorkspacesState = {
  invitedWorkspaces: [] as Workspace[],
};
export type WorkspacesState = typeof defaultWorkspacesState;
