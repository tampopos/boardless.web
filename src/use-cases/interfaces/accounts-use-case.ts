import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { Claim } from 'src/domains/models/accounts/claim';
import { UserWorkspace } from 'src/domains/models/accounts/workspace';

export interface IAccountsUseCase {
  signOut: () => void;
  refreshTokenAsync: (claim?: Claim) => Promise<void>;
  signInAsync: (
    model: SignInModel,
  ) => Promise<{ hasError: boolean; workspaces?: UserWorkspace[] }>;
  validateNickNameUniqueAsync: (nickName: string) => Promise<boolean>;
  validateNickNameFormat: (nickName: string) => boolean;
  validateEmailUniqueAsync: (email: string) => Promise<boolean>;
  validateEmailFormat: (email: string) => boolean;
  validatePasswordFormat: (password: string) => boolean;
  showSignUpErrorMessage: () => void;
  signUpAsync: (model: SignInModel) => Promise<{ hasError: boolean }>;
}
