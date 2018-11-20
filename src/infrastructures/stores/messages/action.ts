import { MessageGeneratorArgs } from 'src/domains/models/common/message';

export interface Action {
  clear: {};
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
export default Action;
