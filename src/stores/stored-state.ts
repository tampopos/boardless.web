import { defaultBarFormState } from './bar/bar-form-state';
import { defaultBarListState } from './bar/bar-list-state';
import { defaultAccountsState } from './accounts/accounts-state';
import { defaultMessagesState } from './messages/messages-state';
import { defaultSideMenuState } from './side-menu/side-menu-state';
import { defaultThemeState } from './theme/theme-state';
import { defaultWorkspacesState } from './workspaces/workspaces-state';

const defaultState = {
  barFormState: defaultBarFormState,
  barListState: defaultBarListState,
  accountsState: defaultAccountsState,
  messagesState: defaultMessagesState,
  sideMenuState: defaultSideMenuState,
  themeState: defaultThemeState,
  workspacesState: defaultWorkspacesState,
};
export type StoredState = typeof defaultState;
export const getInitialStoredState = (): StoredState => defaultState;
