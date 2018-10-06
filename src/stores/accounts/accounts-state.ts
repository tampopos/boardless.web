import { Claim } from 'src/models/accounts/claim';
import { WorkSpace } from 'src/models/accounts/work-space';
import { cultureInfos } from 'src/common/location/culture-infos';
export interface AccountsState {
  claim?: Claim;
  claims: { [index: string]: Claim };
  workSpaces: { [index: string]: WorkSpace };
}

export const defaultAccountsState: AccountsState = {
  claims: {},
  workSpaces: {},
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
    const { workSpaces } = this.state;
    return Boolean(workSpaces && Object.keys(workSpaces).length > 0);
  }
}
