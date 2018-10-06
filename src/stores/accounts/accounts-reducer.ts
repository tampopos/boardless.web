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
      const { claim, workSpaces } = result;
      const newState: AccountsState = {
        claims: {},
        workSpaces: {},
      };
      if (s.claim) {
        const oldUserId = s.claim.userId;
        const oldClaims = Object.entries(s.claims).filter(
          x => x[1].userId !== oldUserId,
        );
        const oldWorkSpaces = Object.entries(s.workSpaces).filter(
          x => x[1].userId !== oldUserId,
        );
        oldClaims.forEach(x => {
          newState.claims[x[0]] = x[1];
        });
        oldWorkSpaces.forEach(x => {
          newState.workSpaces[x[0]] = x[1];
        });
      }
      if (claim) {
        claim.isInitialized = true;
        newState.claim = claim;
        if (workSpaces) {
          workSpaces.forEach(workSpace => {
            newState.workSpaces[workSpace.id] = workSpace;
          });
        }
      }
      return newState;
    });
const factory = actionCreatorFactory();
export const accountsActionCreators = {
  init: factory<{}>('accountsActionCreators.init'),
  signIn: factory<{ result: SignInResult }>('accountsActionCreators.signIn'),
};
