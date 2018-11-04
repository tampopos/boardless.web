import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { IMessagesUseCase } from 'src/use-cases/interfaces/messages-service';
import { IDispatchProvider } from 'src/use-cases/services/interfaces/dispatch-provider';
import { IGuidProvider } from 'src/use-cases/services/interfaces/guid-provider';
import {
  MessageGenerator,
  MessageGeneratorArgs,
} from '../domains/models/common/message';
import {
  clear,
  showMessages,
} from 'src/infrastructures/stores/messages/action-creators';
import { symbols } from 'src/use-cases/common/di-symbols';

@injectable()
export class MessagesUseCase implements IMessagesUseCase {
  constructor(
    @inject(symbols.config) private dispatchProvider: IDispatchProvider,
    @inject(symbols.config) private guidProvider: IGuidProvider,
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
