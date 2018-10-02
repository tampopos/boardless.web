import { StoredState } from '../stored-state';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actionCreatorFactory from 'typescript-fsa';

export const sideMenuReducer = (state: StoredState) =>
  reducerWithInitialState(state.sideMenuState)
    .case(sideMenuActionCreators.handleOpen, (s, p) => {
      return Object.assign({}, s, { open: true });
    })
    .case(sideMenuActionCreators.handleClose, (s, p) => {
      return Object.assign({}, s, { open: false });
    });
const factory = actionCreatorFactory();
export const sideMenuActionCreators = {
  handleOpen: factory<void>('sideMenuActionCreators.handleOpen'),
  handleClose: factory<void>('sideMenuActionCreators.handleClose'),
};
