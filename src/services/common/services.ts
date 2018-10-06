import { IAccountsService } from 'src/services/interfaces/accounts-service';
import { IFetchService } from '../interfaces/fetch-service';
import { Config } from 'src/models/common/config';
import { IGuidProvider } from '../interfaces/guid-provider';
import { IMessagesService } from '../interfaces/messages-service';
import { IDispatchProvider } from '../interfaces/dispatch-provider';
import { IValidateService } from '../interfaces/validate-service';

export interface Services {
  config: Config;
  fetchService: IFetchService;
  accountsService: IAccountsService;
  dispatchProvider: IDispatchProvider;
  guidProvider: IGuidProvider;
  messagesService: IMessagesService;
  validateService: IValidateService;
}
export type ServiceKeys = keyof Services;
