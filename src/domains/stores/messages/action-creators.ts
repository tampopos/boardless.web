import { createActionCreators } from 'src/infrastructures/stores/redux-helper';
import { Action } from './action';
export const {
  clear,
  removeMessage,
  showMessage,
  showMessages,
} = createActionCreators('message')<Action>(
  'clear',
  'removeMessage',
  'showMessage',
  'showMessages',
);
