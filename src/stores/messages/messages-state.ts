import { MessageGeneratorArgs } from 'src/models/common/message';
import { CultureInfo } from 'src/common/location/culture-infos';

export interface MessagesState {
  messageGeneratorArgs: MessageGeneratorArgs[];
}
export class MessagesStateGetters implements MessagesState {
  public messageGeneratorArgs: MessageGeneratorArgs[];
  constructor(state: MessagesState) {
    Object.assign(this, state);
  }
  public getMessages = (cultureInfo: CultureInfo) =>
    this.messageGeneratorArgs.map(({ id, generator }) => ({
      id,
      ...generator(cultureInfo),
    }));
}
