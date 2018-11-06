import { MessageGeneratorArgs } from 'src/domains/models/common/message';

export interface MessagesState {
  messageGeneratorArgs: MessageGeneratorArgs[];
}
export const defaultMessagesState: MessagesState = { messageGeneratorArgs: [] };
export default MessagesState;
