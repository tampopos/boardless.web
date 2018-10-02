import { MessageGenerator } from 'src/models/common/message';
import { Messages } from 'src/common/location/messages';

export interface MessagesState {
  messageGenerators: MessageGenerator[];
}
export class MessagesStateGetters implements MessagesState {
  public messageGenerators: MessageGenerator[];
  constructor(state: MessagesState) {
    Object.assign(this, state);
  }
  public getMessages = (messages: Messages) =>
    this.messageGenerators.map(({ id, generator }) => ({
      id,
      ...generator(messages),
    }));
}
