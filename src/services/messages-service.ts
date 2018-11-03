import { injectable } from 'inversify';
import { inject } from './common/inject';
import { IGuidProvider } from './interfaces/guid-provider';
import {
  MessageGenerator,
  MessageGeneratorArgs,
} from 'src/models/common/message';
import { messagesActionCreators } from 'src/stores/messages/reducer';
import { IMessagesService } from './interfaces/messages-service';
import { IDispatchProvider } from './interfaces/dispatch-provider';

@injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @inject('dispatchProvider') private dispatchProvider: IDispatchProvider,
    @inject('guidProvider') private guidProvider: IGuidProvider,
  ) {}
  private get dispatch() {
    return this.dispatchProvider.dispatch;
  }
  public clear = () => this.dispatch(messagesActionCreators.clear());
  public showMessages = (...messageGenerators: MessageGenerator[]) => {
    this.showMessagesInner(false, ...messageGenerators);
  };
  public appendMessages = (...messageGenerators: MessageGenerator[]) => {
    this.showMessagesInner(true, ...messageGenerators);
  };
  private showMessagesInner = (
    append: boolean,
    ...messageGenerators: MessageGenerator[]
  ) => {
    const args: MessageGeneratorArgs[] = messageGenerators.map(generator => ({
      id: this.guidProvider.newGuid(),
      generator,
    }));
    this.dispatch(
      messagesActionCreators.showMessages({
        messageGeneratorArgs: args,
        append,
      }),
    );
  };
}
