import { MessageGeneratorArgs } from 'src/models/common/message';

export interface Action {
  clear: void;
  removeMessage: { id: string };
  showMessage: {
    messageGeneratorArgs: MessageGeneratorArgs;
    append?: boolean;
  };
  showMessages: {
    messageGeneratorArgs: MessageGeneratorArgs[];
    append?: boolean;
  };
}
