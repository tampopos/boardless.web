import { AuthenticateState } from 'src/stores/authenticate/authenticate-state';

export namespace AuthenticateService {
  export const isAuthenticated = (state: AuthenticateState) => {
    const { selectedToken, tokens } = state;
    return selectedToken >= 0 && tokens.length > selectedToken;
  };
}
