import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { IDispatchProvider } from 'src/use-cases/services/interfaces/dispatch-provider';
import { IGuidProvider } from 'src/use-cases/services/interfaces/guid-provider';
import {
  MessageGenerator,
  MessageGeneratorArgs,
} from '../models/common/message';
import {
  clear,
  showMessages,
} from 'src/infrastructures/stores/messages/action-creators';
import { serviceSymbols } from './common/symbols';

@injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @inject(serviceSymbols.config) private dispatchProvider: IDispatchProvider,
    @inject(serviceSymbols.config) private guidProvider: IGuidProvider,
  ) {}
  private get dispatch() {
    return this.dispatchProvider.dispatch;
  }
  public clear = () => this.dispatch(clear());
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
      showMessages({
        messageGeneratorArgs: args,
        append,
      }),
    );
  };
}
