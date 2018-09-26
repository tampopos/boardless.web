import { AuthenticateState } from 'src/stores/authenticate/authenticate-state';
import { AsyncHelper } from 'src/common/async-helper';
import { SignInModel } from 'src/models/sign-in-model';

export namespace AuthenticateService {
  export const isAuthenticated = (state: AuthenticateState) => {
    const { selectedToken, tokens, isInitialized } = state;
    return isInitialized && selectedToken >= 0 && tokens.length > selectedToken;
  };
  export const refreshTokenAsync = async (state: AuthenticateState) => {
    const { selectedToken, tokens } = state;
    if (selectedToken < 0 || tokens.length <= selectedToken) {
      return Object.assign({}, state, {
        selectedToken: -1,
        isInitialized: true,
      });
    }
    const token = tokens[selectedToken];
    const newTokens = tokens.filter(x => x !== token);
    const newToken = await refreshAsync(token);
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
  const refreshAsync = async (token: string) => {
    await AsyncHelper.delay(100);
    return token + '1';
  };
  export const validate = (model: SignInModel) => {
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
  export const signInAsync = async (model: SignInModel) => {
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
