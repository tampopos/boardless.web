import * as React from 'react';
import { MessageContainer } from '../../components/messages/message-container';
import { connect } from 'react-redux';
import { Message } from 'src/models/common/message';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { messagesActionCreators } from 'src/stores/messages/messages-reducer';
import { MessagesStateGetters } from 'src/stores/messages/messages-state';
import { AuthenticateGetters } from 'src/stores/authenticate/authenticate-state';

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
const mapStateToProps: StateMapper<Props> = ({
  messagesState,
  authenticateState,
}) => {
  const { cultureInfo } = new AuthenticateGetters(authenticateState);
  const { getMessages } = new MessagesStateGetters(messagesState);
  return {
    messages: getMessages(cultureInfo),
  };
};
export const AppMessages = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
