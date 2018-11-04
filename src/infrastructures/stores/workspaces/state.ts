import { UserWorkspace, Workspace } from 'src/domains/models/accounts/workspace';

export const defaultWorkspaces = {
  invitedWorkspaces: {} as { [index: string]: UserWorkspace },
  joinableWorkspaces: {} as { [index: string]: Workspace },
};
export type WorkspacesState = typeof defaultWorkspaces;
