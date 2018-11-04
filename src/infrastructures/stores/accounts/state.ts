import { Claim } from 'src/domains/models/accounts/claim';
import { UserWorkspace } from 'src/domains/models/accounts/workspace';

export interface AccountsState {
  claim?: Claim;
  claims: { [index: string]: Claim };
  workspaces: { [index: string]: UserWorkspace };
}

export const defaultAccountsState: AccountsState = {
  claims: {},
  workspaces: {},
};
export default AccountsState;
