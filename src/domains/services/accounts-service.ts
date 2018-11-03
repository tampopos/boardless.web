import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { injectable } from 'inversify';
import { SignInResult } from 'src/domains/models/accounts/sign-in-result';
import { Claim } from 'src/domains/models/accounts/claim';
import { History } from 'history';
import { IAccountsService } from 'src/use-cases/services/interfaces/accounts-service';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { IDispatchProvider } from 'src/use-cases/services/interfaces/dispatch-provider';
import { ApiUrl, Url } from 'src/infrastructures/routing/url';
import { signIn } from '../stores/accounts/action-creators';
import { inject } from 'src/infrastructures/services/inject';

@injectable()
export class AccountsService implements IAccountsService {
  constructor(
    @inject('fetchService') private fetchService: IFetchService,
    @inject('messagesService') private messagesService: IMessagesService,
    @inject('dispatchProvider') private dispatchProvider: IDispatchProvider,
  ) {}
  private get dispatch() {
    return this.dispatchProvider.dispatch;
  }
  public refreshTokenAsync = async (claim?: Claim) => {
    if (!claim) {
      return;
    }
    const result = await this.fetchService.fetchAsync<SignInResult>({
      url: ApiUrl.accountsRefresh,
      methodName: 'POST',
      body: claim,
    });
    this.dispatch(signIn({ result }));
  };
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
  public signInAsync = async (
    model: SignInModel,
    history: History,
    workspaceUrl?: string,
  ) => {
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
      return;
    }
    this.dispatch(signIn({ result }));
    if (result.claim) {
      const { name } = result.claim;
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info' as 'info',
        text: messages.signIn(name),
        showDuration: 5000,
      }));
    }
    if (workspaceUrl) {
      history.push(Url.workspaceRoot(workspaceUrl));
      return;
    } else if (result.workspaces && result.workspaces.length > 0) {
      history.push(Url.workspaceRoot(result.workspaces[0].workspaceUrl));
      return;
    }
    history.push(Url.root);
  };
}
