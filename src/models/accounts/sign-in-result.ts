import { Claim } from './claim';
import { UserWorkspace } from './workspace';

export interface SignInResult {
  claim?: Claim;
  workspaces?: UserWorkspace[];
}
