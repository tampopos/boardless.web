import { Claim } from 'src/models/accounts/claim';
import { UserWorkspace } from 'src/models/accounts/workspace';

export interface AccountsState {
  claim?: Claim;
  claims: { [index: string]: Claim };
  workspaces: { [index: string]: UserWorkspace };
}

export const defaultAccounts: AccountsState = {
  claims: {},
  workspaces: {},
};
