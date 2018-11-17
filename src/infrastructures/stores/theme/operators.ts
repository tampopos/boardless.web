import { createOperators } from '../redux-helper';
import actionCreators from './action-creators';

export const createThemeOperators = createOperators(actionCreators);
