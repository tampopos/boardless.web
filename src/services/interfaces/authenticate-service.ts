import { SignInModel } from 'src/models/authenticate/sign-in-model';
import { SignInResult } from 'src/models/authenticate/sign-in-result';
import { Claim } from 'src/models/authenticate/claim';

export interface IAuthenticateService {
  refreshTokenAsync: (claim?: Claim) => Promise<SignInResult>;
  validate: (model: SignInModel) => string[];
  signInAsync: (
    model: SignInModel,
  ) => Promise<{
    result: SignInResult;
    errors: string[];
  }>;
}
