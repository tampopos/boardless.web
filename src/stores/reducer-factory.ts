import { StoredState } from './stored-state';
import { combineReducers, createStore, compose } from 'redux';
import persistState from 'redux-localstorage';
import { StoreProviderProps } from './components/store-provider';
import { barFormReducer } from './bar/bar-form-reducer';
import { barListReducer } from './bar/bar-list-reducer';

const createReducers = (initialState: StoredState) =>
  combineReducers<StoredState>({
    barFormState: barFormReducer(initialState),
    barListState: barListReducer(initialState),
  });
const createLocalStorageSetting = (...key: Array<keyof StoredState>) =>
  persistState(key);
const enhancer = compose(createLocalStorageSetting('barListState'));
export const createAppStore = (props: StoreProviderProps) =>
  createStore(createReducers(props.initialState), enhancer);
