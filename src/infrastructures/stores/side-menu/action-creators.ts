import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

export const actionCreators = createActionCreators('sideMenu')<Action>(
  'handleOpen',
  'handleClose',
);
export const { handleOpen, handleClose } = actionCreators;
export default actionCreators;
