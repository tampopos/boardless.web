import { StoredState } from './stored-state';
import { compose } from 'redux';
import { accountsReducer } from './accounts';
import { messagesReducer } from './messages';
import { sideMenuReducer } from './side-menu';
import { createLocalstorageSetting } from './localstorage';
import { themeReducer } from './theme';
import { workspacesReducer } from './workspaces';
import { createStore } from './redux-helper';
import { ReducerBuilders } from './types';

const enhancer = compose(createLocalstorageSetting('accounts'));
const builders: ReducerBuilders<StoredState> = {
  accounts: accountsReducer,
  messages: messagesReducer,
  sideMenu: sideMenuReducer,
  theme: themeReducer,
  workspaces: workspacesReducer,
};
export const createAppStore = (initialState: StoredState) =>
  createStore(initialState, builders, enhancer);
