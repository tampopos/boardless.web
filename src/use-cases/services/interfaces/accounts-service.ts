import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { Claim } from 'src/domains/models/accounts/claim';
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
