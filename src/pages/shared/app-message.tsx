import * as React from 'react';
import { MessageContainer } from '../../components/messages/message-container';
import { Message } from 'src/models/common/message';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { messagesActionCreators } from 'src/stores/messages/reducer';
import { MessagesStateSelectors } from 'src/stores/messages/selectors';
import { AccountsSelectors } from 'src/stores/accounts/selectors';
import { withConnectedRouter } from 'src/common/routing/routing-helper';

interface Events {
  clear: () => void;
  removeMessage: (id: string) => void;
}
interface Props {
  messages: Message[];
}
const Inner: React.SFC<Events & Props> = ({
  messages,
  removeMessage,
  clear,
}) => {
  return (
    <MessageContainer
      messages={messages}
      close={id => removeMessage(id)}
      clear={clear}
    />
  );
};
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    removeMessage: (id: string) =>
      dispatch(messagesActionCreators.removeMessage({ id })),
    clear: () => dispatch(messagesActionCreators.clear()),
  };
};
const mapStateToProps: StateMapperWithRouter<Props> = ({
  messages,
  accounts,
}) => {
  const { cultureInfo } = new AccountsSelectors(accounts);
  const { getMessages } = new MessagesStateSelectors(messages);
  return {
    messages: getMessages(cultureInfo),
  };
};
export const AppMessages = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
