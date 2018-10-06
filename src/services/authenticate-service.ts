import { SignInModel } from 'src/models/authenticate/sign-in-model';
import { injectable } from 'inversify';
import { IAuthenticateService } from './interfaces/authenticate-service';
import { Url } from 'src/common/routing/url';
import { inject } from 'src/services/common/inject';
import { SignInResult } from 'src/models/authenticate/sign-in-result';
import { Claim } from 'src/models/authenticate/claim';
import { IFetchService } from './interfaces/fetch-service';
import { IMessagesService } from './interfaces/messages-service';
import { authenticateActionCreators } from 'src/stores/authenticate/authenticate-reducer';
import { History } from 'history';
import { IDispatchProvider } from './interfaces/dispatch-provider';

@injectable()
export class AuthenticateService implements IAuthenticateService {
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
      relativeUrl: Url.authenticateRefresh,
      methodName: 'POST',
      body: claim,
    });
    this.dispatch(authenticateActionCreators.signIn({ result }));
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
    workSpaceId?: string,
  ) => {
    const { errors, result } = await this.fetchService.fetchAsync<{
      result: SignInResult;
      errors: string[];
    }>({
      relativeUrl: Url.authenticateSignIn,
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
    this.dispatch(authenticateActionCreators.signIn({ result }));
    if (result.claim) {
      const { name } = result.claim;
      this.messagesService.appendMessages(({ messages }) => ({
        level: 'info' as 'info',
        text: messages.signIn(name),
        showDuration: 5000,
      }));
    }
    if (workSpaceId) {
      history.push(Url.workSpaceRoot(workSpaceId));
      return;
    }
    history.push(Url.root);
  };
}
