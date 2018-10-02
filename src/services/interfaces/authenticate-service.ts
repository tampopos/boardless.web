import { SignInModel } from 'src/models/authenticate/sign-in-model';
import { Claim } from 'src/models/authenticate/claim';
import { History } from 'history';

export interface IAuthenticateService {
  refreshTokenAsync: (claim?: Claim) => Promise<void>;
  validate: (model: SignInModel) => boolean;
  signInAsync: (
    model: SignInModel,
    history: History,
    workSpaceId?: string,
  ) => Promise<void>;
}
