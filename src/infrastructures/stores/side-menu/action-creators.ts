import { createActionCreators } from 'src/infrastructures/stores/redux-helper';
import { Action } from './action';
export const { handleOpen, handleClose } = createActionCreators('sideMenu')<
  Action
>('handleOpen', 'handleClose');
