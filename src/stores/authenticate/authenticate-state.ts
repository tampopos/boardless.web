import { Claim } from 'src/models/authenticate/claim';
import { WorkSpace } from 'src/models/authenticate/work-space';
import { cultureInfos } from 'src/common/location/culture-infos';
export interface AuthenticateState {
  claim?: Claim;
  claims: { [index: string]: Claim };
  workSpaces: { [index: string]: WorkSpace };
}

export const defaultAuthenticateState: AuthenticateState = {
  claims: {},
  workSpaces: {},
};

export class AuthenticateGetters {
  constructor(private state: AuthenticateState) {}
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
