import { Action } from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';
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
