import { SignInResult } from 'src/domains/models/accounts/sign-in-result';
import { UserWorkspace } from 'src/domains/models/accounts/workspace';

export interface Action {
  init: {};
  signIn: { result: SignInResult };
  removeWorkspace: { userWorkspaceId: string };
  changeWorkspace: { userWorkspaceId: string };
  addWorkspace: { workspace: UserWorkspace };
}
