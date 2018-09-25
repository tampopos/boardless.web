import { StoredState } from '../stores/stored-state';
import { createEmptyFriend } from './friend-service';

export const getInitialStoredState = (): StoredState => {
  return {
    barFormState: {
      friend: createEmptyFriend(),
    },
    barListState: {
      friends: [],
    },
    authenticateState: {
      selectedToken: -1,
      tokens: [],
    },
  };
};
