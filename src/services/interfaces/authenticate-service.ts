import { AuthenticateState } from 'src/stores/authenticate/authenticate-state';
import { SignInModel } from 'src/models/sign-in-model';

export interface IAuthenticateService {
  isAuthenticated: (state: AuthenticateState) => boolean;
  refreshTokenAsync: (state: AuthenticateState) => Promise<AuthenticateState>;
  validate: (model: SignInModel) => string[];
  signInAsync: (
    model: SignInModel,
  ) => Promise<{
    token: string;
    errors: string[];
  }>;
}
