import { IWorkspaceService } from './interfaces/workspace-service';
import { injectable } from 'inversify';
import { History } from 'history';
import { UserWorkspace } from 'src/models/accounts/workspace';
import { Url, ApiUrl } from 'src/common/routing/url';
import { inject } from './common/inject';
import { IDispatchProvider } from './interfaces/dispatch-provider';
import { accountsActionCreators } from 'src/stores/accounts/accounts-reducer';
import { Claim } from 'src/models/accounts/claim';
import { IFetchService } from './interfaces/fetch-service';
import { workspacesActionCreators } from 'src/stores/workspaces/workspaces-reducer';

@injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @inject('fetchService') private fetchService: IFetchService,
    @inject('dispatchProvider') private dispatchProvider: IDispatchProvider,
  ) {}
  private get dispatch() {
    return this.dispatchProvider.dispatch;
  }
  public onClick = (history: History, workspace: UserWorkspace) => {
    const { userWorkspaceId, workspaceUrl } = workspace;
    this.dispatch(accountsActionCreators.changeWorkspace({ userWorkspaceId }));
    const relativeUrl = Url.workspaceRoot(workspaceUrl);
    history.push(relativeUrl);
  };
  public getSrc = async (workspace: UserWorkspace) => {
    const { url } = await this.fetchService.fetchAsync<{
      url: string;
    }>({
      relativeUrl: ApiUrl.workspacesIcon,
      methodName: 'GET',
      body: workspace,
    });
    return url;
  };
  public onCloseWorkspaceClick = (
    history: History,
    workspace: UserWorkspace,
  ) => {
    const { userWorkspaceId } = workspace;
    this.dispatch(accountsActionCreators.removeWorkspace({ userWorkspaceId }));
    history.push(Url.root);
  };
  public getInvitedWorkspaces = (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: UserWorkspace },
  ) => {
    this.dispatch(workspacesActionCreators.clearInvitedWorkspaces());
    const joined = Object.entries(workspaces).map(x => x[1]);
    Object.entries(claims).forEach(async x => {
      const { token } = x[1];
      const { result } = await this.fetchService.fetchAsync<{
        result: UserWorkspace[];
      }>(
        {
          relativeUrl: ApiUrl.workspacesInvited,
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
        workspacesActionCreators.addInvitedWorkspaces({
          invitedWorkspaces,
        }),
      );
    });
  };
  public getJoinableWorkspaces = async (searchKeyword?: string) => {
    this.dispatch(workspacesActionCreators.clearJoinableWorkspaces());
    const { result } = await this.fetchService.fetchAsync<{
      result: UserWorkspace[];
    }>({
      relativeUrl: ApiUrl.workspacesPublic,
      methodName: 'GET',
    });
    this.dispatch(
      workspacesActionCreators.addJoinableWorkspaces({
        joinableWorkspaces: result,
      }),
    );
  };
  public join = (workspace: UserWorkspace, history: History) => {
    this.dispatch(
      accountsActionCreators.addWorkspace({
        workspace,
      }),
    );
    history.push(Url.workspaceRoot(workspace.workspaceUrl));
  };
}
