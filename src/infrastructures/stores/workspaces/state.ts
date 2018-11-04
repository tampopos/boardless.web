import {
  UserWorkspace,
  Workspace,
} from 'src/domains/models/accounts/workspace';

export const defaultWorkspacesState = {
  invitedWorkspaces: {} as { [index: string]: UserWorkspace },
  joinableWorkspaces: {} as { [index: string]: Workspace },
};
export type WorkspacesState = typeof defaultWorkspacesState;
export default WorkspacesState;
