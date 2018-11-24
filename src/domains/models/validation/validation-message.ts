export type validationMessageState = 'valid' | 'inValid' | 'description';
export interface ValidationMessageContent {
  text: string;
  state?: validationMessageState;
}
export interface ValidationMessage<TModel extends {}>
  extends ValidationMessageContent {
  text: string;
  validate?: (model: TModel) => validationMessageState;
  validateAsync?: (model: TModel) => Promise<validationMessageState>;
  validationTriggers?: string[];
  state?: validationMessageState;
}
