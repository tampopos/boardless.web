import { MessageGenerator } from 'src/models/common/message';
import { StoredState } from '../stored-state';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const messagesReducer = (state: StoredState) =>
  reducerWithInitialState(state.messagesState)
    .case(messagesActionCreators.clear, s => {
      const newState = Object.assign({}, s, { messageGenerators: [] });
      return newState;
    })
    .case(messagesActionCreators.removeMessage, (s, { id }) => {
      return Object.assign({}, s, {
        messageGenerators: s.messageGenerators.filter(x => x.id !== id),
      });
    })
    .case(
      messagesActionCreators.showMessage,
      (s, { messageGenerator, append }) => {
        const messageGenerators = (append ? s.messageGenerators : []).concat(
          messageGenerator,
        );
        return Object.assign({}, s, {
          messageGenerators,
        });
      },
    )
    .case(
      messagesActionCreators.showMessages,
      (s, { messageGenerators, append }) => {
        const array = (append ? s.messageGenerators : []).concat(
          messageGenerators,
        );
        return Object.assign({}, s, {
          messageGenerators: array,
        });
      },
    );

const factory = actionCreatorFactory();
export const messagesActionCreators = {
  clear: factory<void>('messagesActionCreators.clear'),
  removeMessage: factory<{ id: string }>(
    'messagesActionCreators.removeMessage',
  ),
  showMessage: factory<{
    messageGenerator: MessageGenerator;
    append?: boolean;
  }>('messagesActionCreators.showMessage'),
  showMessages: factory<{
    messageGenerators: MessageGenerator[];
    append?: boolean;
  }>('messagesActionCreators.showMessages'),
};
