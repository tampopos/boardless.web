import { MessageGenerator } from 'src/domains/models/common/message';

export interface IMessagesUseCase {
  clear: () => void;
  removeMessage: (id: string) => void;
  showMessages: (...messageGenerators: MessageGenerator[]) => void;
  appendMessages: (...messageGenerators: MessageGenerator[]) => void;
}
