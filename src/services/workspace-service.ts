import { IWorkspaceService } from './interfaces/workspace-service';
import { injectable } from 'inversify';
import { History } from 'history';
import { UserWorkspace, Workspace } from 'src/models/accounts/workspace';
import { Url, ApiUrl } from 'src/common/routing/url';
import { inject } from './common/inject';
import { IDispatchProvider } from './interfaces/dispatch-provider';
import { Claim } from 'src/models/accounts/claim';
import { IFetchService } from './interfaces/fetch-service';
import {
  changeWorkspace,
  removeWorkspace,
  addWorkspace,
} from 'src/stores/accounts/action-creators';
import {
  clearInvitedWorkspaces,
  addInvitedWorkspaces,
  clearJoinableWorkspaces,
  addJoinableWorkspaces,
} from 'src/stores/workspaces/action-creators';

@injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @inject('fetchService') private fetchService: IFetchService,
    @inject('dispatchProvider') private dispatchProvider: IDispatchProvider,
  ) {}
  private get dispatch() {
    return this.dispatchProvider.dispatch;
  }
  public changeWorkspace = (history: History, workspace: UserWorkspace) => {
    const { userWorkspaceId, workspaceUrl } = workspace;
    this.dispatch(changeWorkspace({ userWorkspaceId }));
    const relativeUrl = Url.workspaceRoot(workspaceUrl);
    history.push(relativeUrl);
  };
  public getSrc = async (workspace: UserWorkspace) => {
    const { url } = await this.fetchService.fetchAsync<{
      url: string;
    }>({
      url: ApiUrl.workspacesIcon,
      methodName: 'GET',
      body: workspace,
    });
    return url;
  };
  public closeWorkspace = (history: History, workspace: UserWorkspace) => {
    const { userWorkspaceId } = workspace;
    this.dispatch(removeWorkspace({ userWorkspaceId }));
    history.push(Url.root);
  };
  public getInvitedWorkspaces = (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: UserWorkspace },
  ) => {
    this.dispatch(clearInvitedWorkspaces());
    const joined = Object.entries(workspaces).map(x => x[1]);
    Object.entries(claims).forEach(async x => {
      const { token } = x[1];
      const { result } = await this.fetchService.fetchAsync<{
        result: UserWorkspace[];
      }>(
        {
          url: ApiUrl.workspacesInvited,
          methodName: 'GET',
        },
        token,
      );
      const invitedWorkspaces = result.filter(
        r =>
          joined.filter(
            y =>
              y.userWorkspaceId === r.userWorkspaceId && y.userId === r.userId,
          ).length === 0,
      );
      this.dispatch(
        addInvitedWorkspaces({
          invitedWorkspaces,
        }),
      );
    });
  };
  public getJoinableWorkspaces = async (
    searchKeyword: string | undefined,
    clear: boolean,
    count: number,
    fetchCount: number,
  ) => {
    if (clear) {
      this.dispatch(clearJoinableWorkspaces());
    }
    const { result, completed } = await this.fetchService.fetchAsync<{
      result: UserWorkspace[];
      completed: boolean;
    }>({
      url: ApiUrl.workspacesPublic(count),
      methodName: 'GET',
    });
    if (result.length) {
      this.dispatch(
        addJoinableWorkspaces({
          joinableWorkspaces: result,
        }),
      );
    }
    return completed;
  };
  public add = (workspace: UserWorkspace, history: History) => {
    this.dispatch(
      addWorkspace({
        workspace,
      }),
    );
    history.push(Url.workspaceRoot(workspace.workspaceUrl));
  };
  public join = async (
    workspace: Workspace,
    claim: Claim,
    history: History,
  ) => {
    const { userWorkspace } = await this.fetchService.fetchAsync<{
      userWorkspace: UserWorkspace;
    }>(
      {
        url: ApiUrl.workspacesJoin,
        methodName: 'POST',
        body: workspace,
      },
      claim.token,
    );
    this.add(userWorkspace, history);
  };
}
