import { StoredState } from './stored-state';
import { compose } from 'redux';
import { accountsReducer } from './accounts/reducer';
import { messagesReducer } from './messages/reducer';
import { sideMenuReducer } from './side-menu/reducer';
import { createLocalstorageSetting } from './localstorage';
import { themeReducer } from './theme/reducer';
import { workspacesReducer } from './workspaces/reducer';
import { createStore } from '../../infrastructures/stores/redux-helper';
import { ReducerBuilders } from '../../infrastructures/stores/types';

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
