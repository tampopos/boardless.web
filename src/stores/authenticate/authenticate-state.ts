import { Claim } from 'src/models/authenticate/claim';
import { WorkSpace } from 'src/models/authenticate/work-space';
import { cultureInfos } from 'src/common/location/culture-infos';

export interface AuthenticateState {
  claim?: Claim;
  claims: { [index: string]: Claim };
  workSpaces: { [index: string]: WorkSpace };
}
export class AuthenticateStateGetters implements AuthenticateState {
  public claim?: Claim;
  public claims: { [index: string]: Claim };
  public workSpaces: { [index: string]: WorkSpace };
  constructor(state: AuthenticateState) {
    Object.assign(this, state);
  }
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
    return this.claim && this.claim.cultureName ? this.claim.cultureName : 'ja';
  }
  public get authenticated() {
    return Boolean(this.claim && this.claim.isInitialized);
  }
}
