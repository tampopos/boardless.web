import { StoredState } from '../stores/stored-state';
import { createEmptyFriend } from './friend-service';

export const getInitialStoredState = () => {
  return {
    barFormState: {
      friend: createEmptyFriend(),
    },
    barListState: {
      friends: [],
    },
  } as StoredState;
};
