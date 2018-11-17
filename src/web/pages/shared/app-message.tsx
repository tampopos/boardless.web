import * as React from 'react';
import { MessageContainer } from '../../components/messages/message-container';
import { Message } from 'src/domains/models/common/message';
import { DispatchMapper } from 'src/infrastructures/stores/types';
import { MessagesStateSelectors } from 'src/infrastructures/stores/messages/selectors';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import {
  removeMessage,
  clear,
} from 'src/infrastructures/stores/messages/action-creators';

interface Events {
  onClear: () => void;
  onRemoveMessage: (id: string) => void;
}
interface Props {
  messages: Message[];
}
const Inner: React.SFC<Events & Props> = ({
  messages,
  onRemoveMessage,
  onClear,
}) => {
  return (
    <MessageContainer
      messages={messages}
      close={id => onRemoveMessage(id)}
      clear={onClear}
    />
  );
};
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    onRemoveMessage: (id: string) => dispatch(removeMessage({ id })),
    onClear: () => dispatch(clear({})),
  };
};
const mapStateToProps: StateMapperWithRouter<StoredState, Props> = ({
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
