import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  clear: s => {
    const newState = Object.assign({}, s, { messageGeneratorArgs: [] });
    return newState;
  },
  removeMessage: (s, { id }) => {
    return Object.assign({}, s, {
      messageGeneratorArgs: s.messageGeneratorArgs.filter(x => x.id !== id),
    });
  },
  showMessage: (s, { messageGeneratorArgs, append }) => {
    const array = (append ? s.messageGeneratorArgs : []).concat(
      messageGeneratorArgs,
    );
    return Object.assign({}, s, {
      messageGeneratorArgs: array,
    });
  },

  showMessages: (s, { messageGeneratorArgs, append }) => {
    const array = (append ? s.messageGeneratorArgs : []).concat(
      messageGeneratorArgs,
    );
    return Object.assign({}, s, {
      messageGeneratorArgs: array,
    });
  },
};
export default functions;
