import { BarFormState } from './bar/bar-form-state';
import { BarListState } from './bar/bar-list-state';
import { AuthenticateState } from './authenticate/authenticate-state';
import { createEmptyFriend } from 'src/models/friend';

export interface StoredState {
  barFormState: BarFormState;
  barListState: BarListState;
  authenticateState: AuthenticateState;
}
export const getInitialStoredState = (): StoredState => {
  return {
    barFormState: {
      friend: createEmptyFriend(),
    },
    barListState: {
      friends: [],
    },
    authenticateState: {
      isInitialized: false,
      selectedToken: -1,
      tokens: [],
    },
  };
};
