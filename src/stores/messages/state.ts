import { MessageGeneratorArgs } from 'src/models/common/message';

export interface MessagesState {
  messageGeneratorArgs: MessageGeneratorArgs[];
}
export const defaultMessages: MessagesState = { messageGeneratorArgs: [] };
