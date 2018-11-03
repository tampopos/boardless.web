import { injectable } from 'inversify';
import { IValidateService } from 'src/use-cases/services/interfaces/validate-service';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;
@injectable()
export class ValidateService implements IValidateService {
  public isRequired = (value: any) => {
    return Boolean(value);
  };
  public validEmail = (email: string) => {
    if (!this.isRequired(email)) {
      return 'requiredError';
    }
    if (!emailRegex.test(String(email).toLowerCase())) {
      return 'emailFormatError';
    }
    return;
  };
  public validPassword = (password: string) => {
    if (!this.isRequired(password)) {
      return 'requiredError';
    }
    if (password.length < 8) {
      return 'passwordMinLengthError';
    }
    if (password.length > 100) {
      return 'passwordMaxLengthError';
    }
    if (!passwordRegex.test(password)) {
      return 'passwordFormatError';
    }
    return;
  };
}
