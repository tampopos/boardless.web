import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { SignInResult } from 'src/models/accounts/sign-in-result';
import { AccountsState } from './accounts-state';

export const accountsReducer = (storedState: StoredState) =>
  reducerWithInitialState(storedState.accountsState)
    .case(accountsActionCreators.init, s => {
      const newState = Object.assign({}, s);
      if (newState.claim) {
        newState.claim.isInitialized = false;
      }
      Object.keys(newState.claims).forEach(key => {
        newState.claims[key].isInitialized = false;
      });
      return newState;
    })
    .case(accountsActionCreators.signIn, (s, { result }) => {
      const { claim, workspaces } = result;
      const newState: AccountsState = {
        claims: {},
        workspaces: {},
      };
      if (s.claim) {
        const oldUserId = s.claim.userId;
        const oldClaims = Object.entries(s.claims).filter(
          x => x[1].userId !== oldUserId,
        );
        const oldWorkspaces = Object.entries(s.workspaces).filter(
          x => x[1].userId !== oldUserId,
        );
        oldClaims.forEach(x => {
          newState.claims[x[0]] = x[1];
        });
        oldWorkspaces.forEach(x => {
          newState.workspaces[x[0]] = x[1];
        });
      }
      if (claim) {
        const newClaim = Object.assign({}, claim, { isInitialized: true });
        newState.claim = newClaim;
        newState.claims[claim.userId] = claim;
        if (workspaces) {
          workspaces.forEach(workspace => {
            newState.workspaces[workspace.id] = workspace;
          });
        }
      }
      return newState;
    })
    .case(accountsActionCreators.removeWorkspace, (s, { id }) => {
      const workspaces = {};
      Object.entries(s.workspaces)
        .filter(x => x[0] !== id)
        .forEach(x => (workspaces[x[0]] = x[1]));
      return { ...s, workspaces };
    });
const factory = actionCreatorFactory();
export const accountsActionCreators = {
  init: factory<{}>('accountsActionCreators.init'),
  signIn: factory<{ result: SignInResult }>('accountsActionCreators.signIn'),
  removeWorkspace: factory<{ id: string }>(
    'accountsActionCreators.removeWorkspace',
  ),
};
