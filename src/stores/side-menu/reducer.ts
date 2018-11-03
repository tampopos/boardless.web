import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { SideMenuState } from './state';
import { handleOpen, handleClose } from './action-creators';

export const sideMenuReducer = (state: SideMenuState) =>
  reducerWithInitialState(state)
    .case(handleOpen, (s, p) => {
      return Object.assign({}, s, { open: true });
    })
    .case(handleClose, (s, p) => {
      return Object.assign({}, s, { open: false });
    });
