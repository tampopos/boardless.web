import { BarFormState } from './bar/bar-form-state';
import { BarListState } from './bar/bar-list-state';
import { AuthenticateState } from './authenticate/authenticate-state';
import { createEmptyFriend } from 'src/models/bar/friend';
import { MessagesState } from './messages/messages-state';
import { SideMenuState } from './side-menu/side-menu-state';

export interface StoredState {
  barFormState: BarFormState;
  barListState: BarListState;
  authenticateState: AuthenticateState;
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
    messagesState: { messageGenerators: [] },
    sideMenuState: { open: false },
  };
};
