import { StoredState } from '../stored-state';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actionCreatorFactory from 'typescript-fsa';

import { ActionCreators } from '../types';
import { AuthenticateState } from './authenticate-state';

export const authenticateReducer = (storedState: StoredState) =>
  reducerWithInitialState(storedState.authenticateState)
    .case(authenticateActionCreators.init, (s, {}) => {
      return Object.assign({}, s, { isInitialized: false });
    })
    .case(authenticateActionCreators.set, (s, { state }) => {
      return Object.assign({}, state);
    })
    .case(
      authenticateActionCreators.changeSelectedToken,
      (s, { selectedToken }) => {
        return Object.assign({}, s, { selectedToken });
      },
    )
    .case(authenticateActionCreators.add, (s, { token }) => {
      const selectedToken = s.tokens.push(token) - 1;
      return Object.assign({}, s, { selectedToken });
    });
interface Event {
  init: {};
  set: { state: AuthenticateState };
  changeSelectedToken: { selectedToken: number };
  add: { token: string };
}
const factory = actionCreatorFactory();
export const authenticateActionCreators: ActionCreators<Event> = {
  init: factory<{}>('authenticateActionCreators.init'),
  set: factory<{ state: AuthenticateState }>('authenticateActionCreators.set'),
  changeSelectedToken: factory<{ selectedToken: number }>(
    'authenticateActionCreators.changeSelectedToken',
  ),
  add: factory<{ token: string }>('authenticateActionCreators.add'),
};
