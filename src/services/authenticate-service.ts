import { SignInModel } from 'src/models/authenticate/sign-in-model';
import { injectable } from 'inversify';
import { IAuthenticateService } from './interfaces/authenticate-service';
import { IFetchHelper } from 'src/common/interfaces/fetch-helper';
import { Url } from 'src/common/routing/url';
import { inject } from 'src/common/di/inject';
import { SignInResult } from 'src/models/authenticate/sign-in-result';
import { Claim } from 'src/models/authenticate/claim';

@injectable()
export class AuthenticateService implements IAuthenticateService {
  constructor(@inject('fetchHelper') private fetchHelper: IFetchHelper) {}
  public isAuthenticated = (claim?: Claim) => {
    return Boolean(claim && claim.isInitialized);
  };
  public refreshTokenAsync = async (claim?: Claim) => {
    if (!claim) {
      return {};
    }
    return await this.fetchHelper.fetchAsync<SignInResult>({
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
    return await this.fetchHelper.fetchAsync<{
      result: SignInResult;
      errors: string[];
    }>({
      relativeUrl: Url.authenticateSignIn,
      methodName: 'POST',
      body: model,
    });
  };
}
