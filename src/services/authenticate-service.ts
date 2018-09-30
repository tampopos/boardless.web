import { AuthenticateState } from 'src/stores/authenticate/authenticate-state';
import { SignInModel } from 'src/models/sign-in-model';
import { injectable } from 'inversify';
import { IAuthenticateService } from './interfaces/authenticate-service';
import { IFetchHelper } from 'src/common/interfaces/fetch-helper';
import { Url } from 'src/common/statics/url';
import { inject } from 'src/common/di/inject';

@injectable()
export class AuthenticateService implements IAuthenticateService {
  constructor(@inject('fetchHelper') private fetchHelper: IFetchHelper) {}
  public isAuthenticated = (state: AuthenticateState) => {
    const { selectedToken, tokens, isInitialized } = state;
    return isInitialized && selectedToken >= 0 && tokens.length > selectedToken;
  };
  public refreshTokenAsync = async (state: AuthenticateState) => {
    const { selectedToken, tokens } = state;
    if (selectedToken < 0 || tokens.length <= selectedToken) {
      return Object.assign({}, state, {
        selectedToken: -1,
        isInitialized: true,
      });
    }
    const token = tokens[selectedToken];
    const newTokens = tokens.filter(x => x !== token);
    const newToken = await this.refreshAsync(token);
    if (!newToken) {
      return {
        tokens: newTokens,
        selectedToken: -1,
        isInitialized: true,
      };
    }
    const newSelectedToken = newTokens.push(newToken) - 1;
    return {
      tokens: newTokens,
      selectedToken: newSelectedToken,
      isInitialized: true,
    };
  };
  private refreshAsync = async (token: string) => {
    const res = await this.fetchHelper.fetchAsync<{ token: string }>({
      relativeUrl: Url.authenticateRefresh,
      methodName: 'POST',
    });
    return res.token;
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
      token: string;
      errors: string[];
    }>({
      relativeUrl: Url.authenticateSignIn,
      methodName: 'POST',
      body: model,
    });
  };
}
