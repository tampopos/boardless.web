import { MessageLevel } from './types';
import { Messages } from 'src/common/location/messages';
export interface Message {
  id: string;
  text: string;
  level: MessageLevel;
}
export interface MessageGenerator {
  id: string;
  generator: (
    messages?: Messages,
  ) => {
    text: string;
    level: MessageLevel;
  };
}
