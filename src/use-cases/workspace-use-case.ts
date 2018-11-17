import { injectable } from 'inversify';
import {
  UserWorkspace,
  Workspace,
} from 'src/domains/models/accounts/workspace';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { Claim } from 'src/domains/models/accounts/claim';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { IWorkspaceUseCase } from './interfaces/workspace-use-case';
import { symbols } from './common/di-symbols';
import { IWorkspacesOperators } from 'src/infrastructures/stores/workspaces/operators-interface';
import { IAccountsOperators } from 'src/infrastructures/stores/accounts/operators-interface';

@injectable()
export class WorkspaceUseCase implements IWorkspaceUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.workspacesOperators)
    private workspacesOperators: IWorkspacesOperators,
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
  ) {}
  public changeWorkspace = (workspace: UserWorkspace) => {
    const { userWorkspaceId } = workspace;
    this.accountsOperators.changeWorkspace({ userWorkspaceId });
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
  public closeWorkspace = (workspace: UserWorkspace) => {
    const { userWorkspaceId } = workspace;
    this.accountsOperators.removeWorkspace({ userWorkspaceId });
  };
  public getInvitedWorkspaces = (
    claims: { [index: string]: Claim },
    workspaces: { [index: string]: UserWorkspace },
  ) => {
    this.workspacesOperators.clearInvitedWorkspaces({});
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
      this.workspacesOperators.addInvitedWorkspaces({
        invitedWorkspaces,
      });
    });
  };
  public getJoinableWorkspaces = async (
    searchKeyword: string | undefined,
    clear: boolean,
    count: number,
    fetchCount: number,
  ) => {
    if (clear) {
      this.workspacesOperators.clearJoinableWorkspaces({});
    }
    const { result, completed } = await this.fetchService.fetchAsync<{
      result: UserWorkspace[];
      completed: boolean;
    }>({
      url: ApiUrl.workspacesPublic(count),
      methodName: 'GET',
    });
    if (result.length) {
      this.workspacesOperators.addJoinableWorkspaces({
        joinableWorkspaces: result,
      });
    }
    return completed;
  };
  public add = (workspace: UserWorkspace) => {
    this.accountsOperators.addWorkspace({
      workspace,
    });
  };
  public join = async (workspace: Workspace, claim: Claim) => {
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
    this.add(userWorkspace);
  };
}
