import { StoredState } from './stored-state';
import { combineReducers, createStore, compose } from 'redux';
import { barFormReducer } from './bar/bar-form-reducer';
import { barListReducer } from './bar/bar-list-reducer';
import { StoreProviderProps } from 'src/pages/shared/store-provider';
import { accountsReducer } from './accounts/accounts-reducer';
import { messagesReducer } from './messages/messages-reducer';
import { sideMenuReducer } from './side-menu/side-menu-reducer';
import { createLocalstorageSetting } from './localstorage';
import { themeReducer } from './theme/theme-reducer';
import { workspacesReducer } from './workspaces/workspaces-reducer';

const createReducers = (initialState: StoredState) =>
  combineReducers<StoredState>({
    barFormState: barFormReducer(initialState),
    barListState: barListReducer(initialState),
    accountsState: accountsReducer(initialState),
    messagesState: messagesReducer(initialState),
    sideMenuState: sideMenuReducer(initialState),
    themeState: themeReducer(initialState),
    workspacesState: workspacesReducer(initialState),
  });
const enhancer = compose(
  createLocalstorageSetting('barListState', 'accountsState'),
);
export const createAppStore = (props: StoreProviderProps) =>
  createStore(createReducers(props.initialState), enhancer);
