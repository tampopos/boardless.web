import { UserWorkspace, WorkspaceBase } from 'src/models/accounts/workspace';
import { History } from 'history';
import { Claim } from 'src/models/accounts/claim';

export interface IWorkspaceService {
  onClick: (history: History, workspace: UserWorkspace) => void;
  onCloseWorkspaceClick: (history: History, workspace: UserWorkspace) => void;
  getSrc: (workspace: WorkspaceBase) => Promise<string>;
  getInvitedWorkspaces: (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: UserWorkspace },
  ) => void;
  getJoinableWorkspaces: (
    searchKeyword: string | undefined,
    clear: boolean,
    count: number,
    fetchCount: number,
  ) => Promise<boolean>;
  join: (workspace: UserWorkspace, history: History) => void;
}
