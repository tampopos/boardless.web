import { ValidationMessage } from './validation-message';
import { ThrottleAsync } from 'src/infrastructures/common/throttle';

export type ValidationState<TModel extends {}> = Record<
  keyof TModel,
  Array<ValidationMessage<TModel>>
>;
export interface ValidatorInitializer<TModel extends {}> {
  getModel: () => TModel;
  setValidationState: (validationState: ValidationState<TModel>) => void;
  interval?: number;
}
export abstract class Validator<TModel extends {}> {
  private validateThrottlesInner?: Record<keyof TModel, ThrottleAsync>;
  private get validateThrottles() {
    const { getModel, setValidationState, interval } = this.initializer;
    if (!this.validateThrottlesInner) {
      this.validateThrottlesInner = Object.keys(this.defaultState).reduce(
        (o, k) => {
          o[k] = new ThrottleAsync(
            async () => {
              const model = getModel();
              const validationState = await this.validateInner(
                k as keyof TModel,
                model,
              );
              setValidationState(validationState);
            },
            interval ? interval : 500,
          );
          return o;
        },
        {} as Record<keyof TModel, ThrottleAsync>,
      );
    }
    return this.validateThrottlesInner;
  }
  constructor(private initializer: ValidatorInitializer<TModel>) {}
  public validateThrottle = (key: keyof TModel) => {
    this.validateThrottles[key].execute();
  };
  protected defaultState: ValidationState<TModel>;
  protected hasErrorAsync = async (key: keyof TModel, model: TModel) => {
    const array = this.defaultState[key];
    for (const x of array) {
      if ((await this.valid(x, model)) === 'inValid') {
        return true;
      }
    }
    return false;
  };
  protected valid = async (
    validationMessage: ValidationMessage<TModel>,
    model: TModel,
  ) => {
    const { validate, validateAsync } = validationMessage;
    if (validate) {
      return validate(model);
    }
    if (validateAsync) {
      return await validateAsync(model);
    }
    return 'description';
  };
  public getDefaultState = () => this.defaultState;
  protected validateInner = async (key: keyof TModel, model: TModel) => {
    const newState = Object.assign({}, this.defaultState);
    for (const x of newState[key]) {
      x.state = await this.valid(x, model);
    }
    for (const [k, v] of Object.entries(newState)) {
      if (k === key.toString()) {
        continue;
      }
      for (const x of v as Array<ValidationMessage<TModel>>) {
        const { validationTriggers } = x;
        if (
          !validationTriggers ||
          validationTriggers.filter(t => t === key.toString()).length === 0
        ) {
          continue;
        }
        x.state = await this.valid(x, model);
      }
    }
    return newState;
  };
  public validateAll = async (model: TModel) => {
    const newState = Object.assign({}, this.defaultState);
    let hasError = false;
    for (const v of Object.values(newState)) {
      for (const x of v as Array<ValidationMessage<TModel>>) {
        const { validationTriggers } = x;
        if (validationTriggers && validationTriggers.length > 0) {
          continue;
        }
        x.state = await this.valid(x, model);
        if (!hasError && x.state === 'inValid') {
          hasError = true;
        }
      }
    }
    for (const v of Object.values(newState)) {
      for (const x of v as Array<ValidationMessage<TModel>>) {
        const { validationTriggers } = x;
        if (validationTriggers && validationTriggers.length > 0) {
          x.state = await this.valid(x, model);
          if (!hasError && x.state === 'inValid') {
            hasError = true;
          }
        }
      }
    }
    return hasError ? newState : undefined;
  };
  public hasError = (key: keyof TModel, state: ValidationState<TModel>) => {
    const array = state[key];
    return array.some(x => x.state === 'inValid');
  };
}
