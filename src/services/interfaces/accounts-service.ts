import { SignInModel } from 'src/models/accounts/sign-in-model';
import { Claim } from 'src/models/accounts/claim';
import { History } from 'history';

export interface IAccountsService {
  refreshTokenAsync: (claim?: Claim) => Promise<void>;
  validate: (model: SignInModel) => boolean;
  signInAsync: (
    model: SignInModel,
    history: History,
    workspaceUrl?: string,
  ) => Promise<void>;
}
