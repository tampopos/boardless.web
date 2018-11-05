import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('messages')<Action>(
  'clear',
  'removeMessage',
  'showMessage',
  'showMessages',
);
export const {
  clear,
  removeMessage,
  showMessage,
  showMessages,
} = actionCreators;
export default actionCreators;
