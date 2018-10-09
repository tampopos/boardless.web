import { Claim } from 'src/models/accounts/claim';
import { Workspace } from 'src/models/accounts/workspace';
import { cultureInfos } from 'src/common/location/culture-infos';
export interface AccountsState {
  claim?: Claim;
  claims: { [index: string]: Claim };
  workspaces: { [index: string]: Workspace };
}

export const defaultAccountsState: AccountsState = {
  claims: {},
  workspaces: {},
};

export class AccountsGetters {
  constructor(private state: AccountsState) {}
  public get resources() {
    const { resources } = this.cultureInfo;
    return resources;
  }
  public get messages() {
    const { messages } = this.cultureInfo;
    return messages;
  }
  public get localizer() {
    const { localizer } = this.cultureInfo;
    return localizer;
  }
  public get cultureInfo() {
    return cultureInfos[this.cultureName];
  }
  public get cultureName() {
    const { claim } = this.state;
    return claim && claim.cultureName ? claim.cultureName : 'ja';
  }
  public get authenticated() {
    const { claim } = this.state;
    return Boolean(claim && claim.isInitialized);
  }
  public get sideMenuEnabled() {
    const { workspaces } = this.state;
    return Boolean(workspaces && Object.keys(workspaces).length > 0);
  }
}
