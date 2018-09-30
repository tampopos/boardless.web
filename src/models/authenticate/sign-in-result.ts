import { Claim } from './claim';
import { WorkSpace } from './work-space';

export interface SignInResult {
  claim?: Claim;
  workSpaces?: WorkSpace[];
}
