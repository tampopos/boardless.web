import { SignInModel } from 'src/models/authenticate/sign-in-model';
import { injectable } from 'inversify';
import { IAuthenticateService } from './interfaces/authenticate-service';
import { Url } from 'src/common/routing/url';
import { inject } from 'src/services/common/inject';
import { SignInResult } from 'src/models/authenticate/sign-in-result';
import { Claim } from 'src/models/authenticate/claim';
import { IFetchService } from './interfaces/fetch-service';

@injectable()
export class AuthenticateService implements IAuthenticateService {
  constructor(@inject('fetchService') private fetchService: IFetchService) {}
  public refreshTokenAsync = async (claim?: Claim) => {
    if (!claim) {
      return {};
    }
    return await this.fetchService.fetchAsync<SignInResult>({
      relativeUrl: Url.authenticateRefresh,
      methodName: 'POST',
      body: claim,
    });
  };
  public validate = (model: SignInModel) => {
    const { email, password } = model;
    const errors = [];
    if (!email) {
      errors.push('error');
    }
    if (!password) {
      errors.push('error');
    }
    return errors;
  };
  public signInAsync = async (model: SignInModel) => {
    return await this.fetchService.fetchAsync<{
      result: SignInResult;
      errors: string[];
    }>({
      relativeUrl: Url.authenticateSignIn,
      methodName: 'POST',
      body: model,
    });
  };
}
