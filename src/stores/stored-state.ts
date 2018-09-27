import { BarFormState } from './bar/bar-form-state';
import { BarListState } from './bar/bar-list-state';
import { AuthenticateState } from './authenticate/authenticate-state';
import { createEmptyFriend } from 'src/models/friend';
import { LocationState } from './location/location-state';
import { MessagesState } from './messages/messages-state';

export interface StoredState {
  barFormState: BarFormState;
  barListState: BarListState;
  authenticateState: AuthenticateState;
  locationState: LocationState;
  messagesState: MessagesState;
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
    locationState: {
      cultureName: 'ja',
    },
    messagesState: { messages: [] },
  };
};
