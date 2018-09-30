import { Message } from 'src/models/common/message';
import { StoredState } from '../stored-state';
import actionCreatorFactory from 'typescript-fsa';
import { ActionCreators } from '../types';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

interface Event {
  removeMessage: { index: number };
  showMessage: { message: Message };
}
export const messagesReducer = (state: StoredState) =>
  reducerWithInitialState(state.messagesState)
    .case(messagesActionCreators.removeMessage, (s, { index }) => {
      s.messages.splice(index, 1);
      return Object.assign({}, s);
    })
    .case(messagesActionCreators.showMessage, (s, { message }) => {
      s.messages.push(message);
      return Object.assign({}, s);
    });

const factory = actionCreatorFactory();
export const messagesActionCreators: ActionCreators<Event> = {
  removeMessage: factory<{ index: number }>('removeMessage'),
  showMessage: factory<{ message: Message }>('showMessage'),
};
