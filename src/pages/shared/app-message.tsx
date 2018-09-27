import * as React from 'react';
import { MessageContainer } from '../../components/messages/message-container';
import { connect } from 'react-redux';
import { Message } from 'src/models/message';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { messagesActionCreators } from 'src/stores/messages/messages-reducer';

interface Events {
  removeMessage: (index: number) => void;
}
interface Props {
  messages: Message[];
}
const Inner: React.SFC<Events & Props> = ({ messages, removeMessage }) => {
  return (
    <MessageContainer messages={messages} onClose={i => removeMessage(i)} />
  );
};
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    removeMessage: (index: number) =>
      dispatch(messagesActionCreators.removeMessage({ index })),
  };
};
const mapStateToProps: StateMapper<Props> = ({ messagesState }) => {
  return {
    messages: messagesState.messages,
  };
};
export const AppMessages = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
