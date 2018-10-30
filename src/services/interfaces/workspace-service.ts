import {
  UserWorkspace,
  WorkspaceBase,
  Workspace,
} from 'src/models/accounts/workspace';
import { History } from 'history';
import { Claim } from 'src/models/accounts/claim';
import { NewWorkspaceModel } from 'src/models/workspaces/new-workspace-model';

export interface IWorkspaceService {
  changeWorkspace: (history: History, workspace: UserWorkspace) => void;
  closeWorkspace: (history: History, workspace: UserWorkspace) => void;
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
  add: (workspace: UserWorkspace, history: History) => void;
  join: (workspace: Workspace, claim: Claim, history: History) => void;
  addWorkspace: (state: NewWorkspaceModel, history: History) => void;
}
