import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('accounts')<Action>(
  'init',
  'signIn',
  'addWorkspace',
  'changeWorkspace',
  'removeWorkspace',
);
export const {
  init,
  signIn,
  addWorkspace,
  changeWorkspace,
  removeWorkspace,
} = actionCreators;
export default actionCreators;
