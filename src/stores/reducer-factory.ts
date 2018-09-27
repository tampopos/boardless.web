import { StoredState } from './stored-state';
import { combineReducers, createStore, compose } from 'redux';
import persistState from 'redux-localstorage';
import { barFormReducer } from './bar/bar-form-reducer';
import { barListReducer } from './bar/bar-list-reducer';
import { StoreProviderProps } from 'src/components/stores/store-provider';
import { authenticateReducer } from './authenticate/authenticate-reducer';
import { locationReducer } from './location/location-reducer';
import { messagesReducer } from './messages/messages-reducer';

const createReducers = (initialState: StoredState) =>
  combineReducers<StoredState>({
    barFormState: barFormReducer(initialState),
    barListState: barListReducer(initialState),
    authenticateState: authenticateReducer(initialState),
    locationState: locationReducer(initialState),
    messagesState: messagesReducer(initialState),
  });
const createLocalStorageSetting = (...key: Array<keyof StoredState>) =>
  persistState(key);
const enhancer = compose(
  createLocalStorageSetting(
    'barListState',
    'authenticateState',
    'locationState',
  ),
);
export const createAppStore = (props: StoreProviderProps) =>
  createStore(createReducers(props.initialState), enhancer);
