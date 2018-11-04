import { defaultAccounts } from './accounts/state';
import { defaultMessages } from './messages/state';
import { defaultSideMenu } from './side-menu/state';
import { defaultTheme } from './theme/state';
import { defaultWorkspaces } from './workspaces/state';

const defaultState = {
  accounts: defaultAccounts,
  messages: defaultMessages,
  sideMenu: defaultSideMenu,
  theme: defaultTheme,
  workspaces: defaultWorkspaces,
};
export type StoredState = typeof defaultState;
export const getInitialStoredState = (): StoredState => defaultState;
