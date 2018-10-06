import { Claim } from './claim';
import { Workspace } from './workspace';

export interface SignInResult {
  claim?: Claim;
  workspaces?: Workspace[];
}
