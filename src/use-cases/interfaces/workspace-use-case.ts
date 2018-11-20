import {
  UserWorkspace,
  WorkspaceBase,
  Workspace,
} from 'src/domains/models/accounts/workspace';
import { Claim } from 'src/domains/models/accounts/claim';
import { NewWorkspaceModel } from 'src/domains/models/workspaces/new-workspace-model';

export interface IWorkspaceUseCase {
  changeWorkspace: (workspace: UserWorkspace) => void;
  closeWorkspace: (workspace: UserWorkspace) => void;
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
  addWorkspace: (state: NewWorkspaceModel) => UserWorkspace;
  add: (workspace: UserWorkspace) => void;
  join: (workspace: Workspace, claim: Claim) => void;
}
