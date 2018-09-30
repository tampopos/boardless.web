import { AuthenticateState } from 'src/stores/authenticate/authenticate-state';
import { IAsyncHelper } from 'src/common/interfaces/async-helper';
import { SignInModel } from 'src/models/sign-in-model';
import { injectable } from 'inversify';
import { IAuthenticateService } from './interfaces/authenticate-service';
import { inject } from 'src/common/di/inject';

@injectable()
export class AuthenticateService implements IAuthenticateService {
  constructor(@inject('asyncHelper') private asyncHelper: IAsyncHelper) {}
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
    await this.asyncHelper.delay(100);
    return token + '1';
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
    const { email, password } = model;
    const errors = [];
    if (!email) {
      errors.push('error');
    }
    if (!password) {
      errors.push('error');
    }
    return 'token';
  };
}
