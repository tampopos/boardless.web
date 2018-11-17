import { MessagesState } from './state';
import { MessageGeneratorArgs } from 'src/domains/models/common/message';
import { CultureInfo } from 'src/domains/common/location/culture-infos';

export class MessagesSelectors implements MessagesState {
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
