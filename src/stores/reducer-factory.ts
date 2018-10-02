import { StoredState } from './stored-state';
import { combineReducers, createStore, compose } from 'redux';
import { barFormReducer } from './bar/bar-form-reducer';
import { barListReducer } from './bar/bar-list-reducer';
import { StoreProviderProps } from 'src/pages/shared/store-provider';
import { authenticateReducer } from './authenticate/authenticate-reducer';
import { messagesReducer } from './messages/messages-reducer';
import { sideMenuReducer } from './side-menu/side-menu-reducer';
import { createLocalstorageSetting } from './localstorage';

const createReducers = (initialState: StoredState) =>
  combineReducers<StoredState>({
    barFormState: barFormReducer(initialState),
    barListState: barListReducer(initialState),
    authenticateState: authenticateReducer(initialState),
    messagesState: messagesReducer(initialState),
    sideMenuState: sideMenuReducer(initialState),
  });
const enhancer = compose(
  createLocalstorageSetting('barListState', 'authenticateState'),
);
export const createAppStore = (props: StoreProviderProps) =>
  createStore(createReducers(props.initialState), enhancer);
