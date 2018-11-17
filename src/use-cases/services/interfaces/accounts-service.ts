import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { UserWorkspace } from 'src/domains/models/accounts/workspace';

export interface IAccountsService {
  validate: (model: SignInModel) => boolean;
  signInAsync: (
    model: SignInModel,
  ) => Promise<{ hasError: boolean; workspaces?: UserWorkspace[] }>;
}
