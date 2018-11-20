import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { injectable } from 'inversify';
import { SignInResult } from 'src/domains/models/accounts/sign-in-result';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IAccountsOperators } from 'src/infrastructures/stores/accounts/operators-interface';
import { IAccountsService } from 'src/use-cases/services/interfaces/accounts-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { SignUpModel } from '../models/accounts/sign-up-model';

@injectable()
export class AccountsService implements IAccountsService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService) private messagesService: IMessagesService,
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
  ) {}
  public validate = (model: SignInModel) => {
    const { email, password } = model;
    let hasError = false;
    this.messagesService.clear();
    if (!email) {
      this.messagesService.appendMessages(({ messages, resources }) => ({
        level: 'warning' as 'warning',
        text: messages.requiredError(resources.Email),
      }));
      hasError = true;
    }
    if (!password) {
      this.messagesService.appendMessages(({ messages, resources }) => ({
        level: 'warning' as 'warning',
        text: messages.requiredError(resources.Password),
      }));
      hasError = true;
    }
    return !hasError;
  };
  public signInAsync = async (model: SignInModel) => {
    const { errors, result } = await this.fetchService.fetchAsync<{
      result: SignInResult;
      errors: string[];
    }>({
      url: ApiUrl.accountsSignIn,
      methodName: 'POST',
      body: model,
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () => ({
          level: 'error' as 'error',
          text: error,
        })),
      );
      return { hasError: true };
    }
    this.accountsOperators.signIn({ result });
    if (result.claim) {
      const { name } = result.claim;
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info' as 'info',
        text: messages.signIn(name),
        showDuration: 5000,
      }));
    }
    return { hasError: false, workspaces: result.workspaces };
  };
  public signUpAsync = async (model: SignUpModel) => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.accountsSignIn,
      methodName: 'POST',
      body: model,
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () => ({
          level: 'error' as 'error',
          text: error,
        })),
      );
      return { hasError: true };
    }
    return { hasError: false };
  };
}
