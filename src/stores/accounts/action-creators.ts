import { createActionCreators } from '../redux-helper';
import { Action } from './action';
export const {
  init,
  signIn,
  addWorkspace,
  changeWorkspace,
  removeWorkspace,
} = createActionCreators('accounts')<Action>(
  'init',
  'signIn',
  'addWorkspace',
  'changeWorkspace',
  'removeWorkspace',
);
