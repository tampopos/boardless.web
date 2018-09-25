import { StoredState } from '../stored-state';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actionCreatorFactory from 'typescript-fsa';

import { ActionCreators } from '../types';

export const authenticateReducer = (state: StoredState) =>
  reducerWithInitialState(state.authenticateState)
    .case(
      authenticateActionCreators.changeSelectedToken,
      (s, { selectedToken }) => {
        return Object.assign({}, s, { selectedToken });
      },
    )
    .case(authenticateActionCreators.add, (s, { token }) => {
      s.tokens.push(token);
      return Object.assign({}, s);
    })
    .case(authenticateActionCreators.remove, (s, { token }) => {
      return Object.assign({}, s, {
        tokens: s.tokens.filter(x => x !== token),
      });
    })
    .case(authenticateActionCreators.update, (s, { preToken, newToken }) => {
      s.tokens.push(newToken);
      return Object.assign({}, s, {
        tokens: s.tokens.filter(x => x !== preToken),
      });
    });
interface Event {
  changeSelectedToken: { selectedToken: number };
  add: { token: string };
  remove: { token: string };
  update: { preToken: string; newToken: string };
}
const factory = actionCreatorFactory();
export const authenticateActionCreators: ActionCreators<Event> = {
  changeSelectedToken: factory<{ selectedToken: number }>(
    'changeSelectedToken',
  ),
  add: factory<{ token: string }>('add'),
  remove: factory<{ token: string }>('remove'),
  update: factory<{ preToken: string; newToken: string }>('update'),
};
