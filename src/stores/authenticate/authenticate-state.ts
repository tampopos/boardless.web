import { Claim } from 'src/models/authenticate/claim';
import { WorkSpace } from 'src/models/authenticate/work-space';

export interface AuthenticateState {
  claim?: Claim;
  claims: { [index: string]: Claim };
  workSpaces: { [index: string]: WorkSpace };
}
