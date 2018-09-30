import { MessageLevel } from './types';
export interface Message {
  text: string;
  level: MessageLevel;
}
export const createEmptyMessage: () => Message = () => ({
  text: '',
  level: 'none',
});
