export interface WorkspaceBase {
  id: string;
  workspaceUrl: string;
  name: string;
}
export interface Workspace extends WorkspaceBase {}
export interface UserWorkspace extends WorkspaceBase {
  userWorkspaceId: string;
  userId: string;
}
