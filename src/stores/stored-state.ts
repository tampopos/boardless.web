import { BarFormState } from './bar/bar-form-state';
import { BarListState } from './bar/bar-list-state';
import { AuthenticateState } from './authenticate/authenticate-state';
import { createEmptyFriend } from 'src/models/bar/friend';
import { LocationState } from './location/location-state';
import { MessagesState } from './messages/messages-state';
import { SideMenuState } from './side-menu/side-menu-state';

export interface StoredState {
  barFormState: BarFormState;
  barListState: BarListState;
  authenticateState: AuthenticateState;
  locationState: LocationState;
  messagesState: MessagesState;
  sideMenuState: SideMenuState;
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
      claims: {},
      workSpaces: {},
    },
    locationState: {
      cultureName: 'ja',
    },
    messagesState: { messages: [] },
    sideMenuState: { open: false },
  };
};
