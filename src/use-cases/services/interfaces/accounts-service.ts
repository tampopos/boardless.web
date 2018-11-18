import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { UserWorkspace } from 'src/domains/models/accounts/workspace';
import { SignUpModel } from 'src/domains/models/accounts/sign-up-model';

export interface IAccountsService {
  validate: (model: SignInModel) => boolean;
  signInAsync: (
    model: SignInModel,
  ) => Promise<{ hasError: boolean; workspaces?: UserWorkspace[] }>;
  signUpAsync: (model: SignUpModel) => Promise<{ hasError: boolean }>;
}
