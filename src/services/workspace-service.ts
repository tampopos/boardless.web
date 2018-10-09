import { IWorkspaceService } from './interfaces/workspace-service';
import { injectable } from 'inversify';
import { History } from 'history';
import { Workspace } from 'src/models/accounts/workspace';
import { Url } from 'src/common/routing/url';
import { delay } from 'src/common/async-helper';
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
  public onClick = (history: History, workspace: Workspace) => {
    const { id } = workspace;
    const url = Url.workspaceRoot(id);
    history.push(url);
  };
  public getSrc = async (workspace: Workspace) => {
    await delay(1000);
    return 'https://material-ui.com/static/images/grid-list/breakfast.jpg';
  };
  public onCloseWorkspaceClick = (history: History, workspace: Workspace) => {
    const { id } = workspace;
    this.dispatch(accountsActionCreators.removeWorkspace({ id }));
    history.push(Url.root);
  };
  public getInvitedWorkspaces = (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: Workspace },
  ) => {
    this.dispatch(workspacesActionCreators.clearInvitedWorkspaces());
    const joined = Object.entries(workspaces).map(x => x[1]);
    Object.entries(claims).forEach(async x => {
      const { token } = x[1];
      const { result } = await this.fetchService.fetchAsync<{
        result: Workspace[];
      }>(
        {
          relativeUrl: Url.workspacesInvited,
          methodName: 'GET',
        },
        token,
      );
      const invitedWorkspaces = result.filter(
        r =>
          joined.filter(y => y.id === r.id && y.userId === r.userId).length ===
          0,
      );
      this.dispatch(
        workspacesActionCreators.addInvitedWorkspaces({
          invitedWorkspaces,
        }),
      );
    });
  };
}
