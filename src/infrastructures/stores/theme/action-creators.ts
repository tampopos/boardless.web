import Action from './action';
import { createActionCreators } from 'src/infrastructures/stores/redux-helper';

const actionCreators = createActionCreators('theme')<Action>();
export const {} = actionCreators;
export default actionCreators;
