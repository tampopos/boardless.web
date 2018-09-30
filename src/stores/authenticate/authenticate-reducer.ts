import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';
import { ActionCreators } from '../types';
import { SignInResult } from 'src/models/authenticate/sign-in-result';
import { AuthenticateState } from './authenticate-state';

export const authenticateReducer = (storedState: StoredState) =>
  reducerWithInitialState(storedState.authenticateState)
    .case(authenticateActionCreators.init, s => {
      const newState = Object.assign({}, s);
      if (newState.claim) {
        newState.claim.isInitialized = false;
      }
      Object.keys(newState.claims).forEach(key => {
        newState.claims[key].isInitialized = false;
      });
      return newState;
    })
    .case(authenticateActionCreators.signIn, (s, { result }) => {
      const { claim, workSpaces } = result;
      const newState: AuthenticateState = {
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
interface Event {
  init: {};
  signIn: { result: SignInResult };
}
const factory = actionCreatorFactory();
export const authenticateActionCreators: ActionCreators<Event> = {
  init: factory<{}>('authenticateActionCreators.init'),
  signIn: factory<{ result: SignInResult }>(
    'authenticateActionCreators.signIn',
  ),
};
