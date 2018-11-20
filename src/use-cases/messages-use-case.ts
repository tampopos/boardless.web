import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { IMessagesUseCase } from 'src/use-cases/interfaces/messages-use-case';
import { MessageGenerator } from '../domains/models/common/message';
import { symbols } from 'src/use-cases/common/di-symbols';

@injectable()
export class MessagesUseCase implements IMessagesUseCase {
  constructor(
    @inject(symbols.messagesService)
    private messagesService: IMessagesUseCase,
  ) {}
  public clear = () => this.messagesService.clear();
  public removeMessage = (id: string) => this.messagesService.removeMessage(id);
  public showMessages = (...messageGenerators: MessageGenerator[]) =>
    this.messagesService.showMessages(...messageGenerators);
  public appendMessages = (...messageGenerators: MessageGenerator[]) =>
    this.messagesService.appendMessages(...messageGenerators);
}
