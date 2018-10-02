import { MessageGeneratorArgs } from 'src/models/common/message';
import { StoredState } from '../stored-state';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const messagesReducer = (state: StoredState) =>
  reducerWithInitialState(state.messagesState)
    .case(messagesActionCreators.clear, s => {
      const newState = Object.assign({}, s, { messageGeneratorArgs: [] });
      return newState;
    })
    .case(messagesActionCreators.removeMessage, (s, { id }) => {
      return Object.assign({}, s, {
        messageGeneratorArgs: s.messageGeneratorArgs.filter(x => x.id !== id),
      });
    })
    .case(
      messagesActionCreators.showMessage,
      (s, { messageGeneratorArgs, append }) => {
        const array = (append ? s.messageGeneratorArgs : []).concat(
          messageGeneratorArgs,
        );
        return Object.assign({}, s, {
          messageGeneratorArgs: array,
        });
      },
    )
    .case(
      messagesActionCreators.showMessages,
      (s, { messageGeneratorArgs, append }) => {
        const array = (append ? s.messageGeneratorArgs : []).concat(
          messageGeneratorArgs,
        );
        return Object.assign({}, s, {
          messageGeneratorArgs: array,
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
    messageGeneratorArgs: MessageGeneratorArgs;
    append?: boolean;
  }>('messagesActionCreators.showMessage'),
  showMessages: factory<{
    messageGeneratorArgs: MessageGeneratorArgs[];
    append?: boolean;
  }>('messagesActionCreators.showMessages'),
};
