import { defaultAccountsState } from './accounts/state';
import { defaultMessagesState } from './messages/state';
import { defaultSideMenuState } from './side-menu/state';
import { defaultTheme } from './theme/state';
import { defaultWorkspacesState } from './workspaces/state';

const defaultState = {
  accounts: defaultAccountsState,
  messages: defaultMessagesState,
  sideMenu: defaultSideMenuState,
  theme: defaultTheme,
  workspaces: defaultWorkspacesState,
};
export type StoredState = typeof defaultState;
export const getInitialStoredState = (): StoredState => defaultState;
