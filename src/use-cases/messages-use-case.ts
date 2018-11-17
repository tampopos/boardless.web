import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { IMessagesUseCase } from 'src/use-cases/interfaces/messages-service';
import { IGuidProvider } from 'src/infrastructures/common/services/interfaces/guid-provider';
import {
  MessageGenerator,
  MessageGeneratorArgs,
} from '../domains/models/common/message';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IMessagesOperators } from 'src/infrastructures/stores/messages/operators-interface';

@injectable()
export class MessagesUseCase implements IMessagesUseCase {
  constructor(
    @inject(symbols.messagesOperators)
    private messagesOperators: IMessagesOperators,
    @inject(symbols.guidProvider) private guidProvider: IGuidProvider,
  ) {}
  public clear = () => this.messagesOperators.clear({});
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
    this.messagesOperators.showMessages({
      messageGeneratorArgs: args,
      append,
    });
  };
}
