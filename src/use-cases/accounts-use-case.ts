import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { injectable } from 'inversify';
import { SignInResult } from 'src/domains/models/accounts/sign-in-result';
import { Claim } from 'src/domains/models/accounts/claim';
import { IAccountsUseCase } from 'src/use-cases/interfaces/accounts-use-case';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IAccountsOperators } from 'src/infrastructures/stores/accounts/operators-interface';
import { IAccountsService } from './services/interfaces/accounts-service';
import { IValidateService } from './services/interfaces/validate-service';
import { delay } from 'src/infrastructures/common/async-helper';
import { IMessagesService } from './services/interfaces/messages-service';
import { SignUpModel } from 'src/domains/models/accounts/sign-up-model';

@injectable()
export class AccountsUseCase implements IAccountsUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.validateService) private validateService: IValidateService,
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
    @inject(symbols.accountsService)
    private accountsService: IAccountsService,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
  ) {}
  public signOut = () => this.accountsOperators.signIn({ result: {} });
  public refreshTokenAsync = async (claim?: Claim) => {
    if (!claim) {
      return;
    }
    const result = await this.fetchService.fetchAsync<SignInResult>({
      url: ApiUrl.accountsRefresh,
      methodName: 'POST',
      body: claim,
    });
    this.accountsOperators.signIn({ result });
  };
  public signInAsync = async (model: SignInModel) => {
    if (!(await this.accountsService.validate(model))) {
      return { hasError: true };
    }
    return await this.accountsService.signInAsync(model);
  };

  public validateNickNameFormat = (nickName: string) =>
    this.validateService.validateNickNameFormat(nickName);
  public validateNickNameUniqueAsync = async (nickName: string) => {
    await delay(100);
    return true;
  };
  public validateEmailFormat = (email: string) =>
    this.validateService.validateEmailFormat(email);
  public validateEmailUniqueAsync = async (email: string) => {
    await delay(100);
    return true;
  };
  public validatePasswordFormat = (password: string) =>
    this.validateService.validatePasswordFormat(password);
  public showSignUpErrorMessage = () => {
    this.messagesService.appendMessages(({ messages }) => ({
      level: 'warning',
      text: messages.validationError,
      showDuration: 5000,
    }));
  };
  public signUpAsync = async (model: SignUpModel) => {
    return await this.accountsService.signUpAsync(model);
  };
}
