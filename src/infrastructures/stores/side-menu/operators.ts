import { createOperators } from '../redux-helper';
import actionCreators from './action-creators';

export const createSideMenuOperators = createOperators(actionCreators);
