import { createReducers } from '../redux-helper';
import actionCreators from './action-creators';
import functions from './functions';

export const accountsReducer = createReducers(actionCreators, functions);
