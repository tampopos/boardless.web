import { Workspace } from 'src/models/accounts/workspace';
import { History } from 'history';
import { Claim } from 'src/models/accounts/claim';

export interface IWorkspaceService {
  onClick: (history: History, workspace: Workspace) => void;
  onCloseWorkspaceClick: (history: History, workspace: Workspace) => void;
  getSrc: (workspace: Workspace) => Promise<string>;
  getInvitedWorkspaces: (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: Workspace },
  ) => void;
}
