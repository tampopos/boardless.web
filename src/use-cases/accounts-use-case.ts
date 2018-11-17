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

@injectable()
export class AccountsUseCase implements IAccountsUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
    @inject(symbols.accountsService)
    private accountsService: IAccountsService,
  ) {}
  public signOut = () => this.accountsOperators.signIn({ result: {} });
  public init = () => this.accountsOperators.init({});
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
    return this.accountsService.signInAsync(model);
  };
}
