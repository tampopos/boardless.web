import { createActionCreators } from '../redux-helper';
import { Action } from './action';
export const { handleOpen, handleClose } = createActionCreators('sideMenu')<
  Action
>('handleOpen', 'handleClose');
