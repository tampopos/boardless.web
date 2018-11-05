import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  handleOpen: (s, p) => {
    return Object.assign({}, s, { open: true });
  },
  handleClose: (s, p) => {
    return Object.assign({}, s, { open: false });
  },
};
export default functions;
