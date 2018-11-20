import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { IGuidProvider } from 'src/infrastructures/common/services/interfaces/guid-provider';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IMessagesOperators } from 'src/infrastructures/stores/messages/operators-interface';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import {
  MessageGenerator,
  MessageGeneratorArgs,
} from '../models/common/message';

@injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @inject(symbols.messagesOperators)
    private messagesOperators: IMessagesOperators,
    @inject(symbols.guidProvider) private guidProvider: IGuidProvider,
  ) {}
  public clear = () => this.messagesOperators.clear({});
  public removeMessage = (id: string) =>
    this.messagesOperators.removeMessage({ id });
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
