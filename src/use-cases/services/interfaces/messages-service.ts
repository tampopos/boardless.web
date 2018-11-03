import { MessageGenerator } from 'src/domains/models/common/message';

export interface IMessagesService {
  clear: () => void;
  showMessages: (...messageGenerators: MessageGenerator[]) => void;
  appendMessages: (...messageGenerators: MessageGenerator[]) => void;
}
