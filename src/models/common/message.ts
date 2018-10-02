import { MessageLevel } from './types';
import { CultureInfo } from 'src/common/location/culture-infos';
export interface Message {
  id: string;
  text: string;
  level: MessageLevel;
}
export type MessageGenerator = (
  cultureInfo: CultureInfo,
) => {
  text: string;
  level: MessageLevel;
};
export interface MessageGeneratorArgs {
  id: string;
  generator: MessageGenerator;
}
