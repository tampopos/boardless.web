import { Config } from 'src/domains/models/common/config';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IAccountsService } from 'src/use-cases/services/interfaces/accounts-service';
import { IDispatchProvider } from 'src/use-cases/services/interfaces/dispatch-provider';
import { IGuidProvider } from 'src/use-cases/services/interfaces/guid-provider';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { IValidateService } from 'src/use-cases/services/interfaces/validate-service';
import { IWorkspaceService } from 'src/use-cases/services/interfaces/workspace-service';

export interface Services {
  config: Config;
  fetchService: IFetchService;
  accountsService: IAccountsService;
  dispatchProvider: IDispatchProvider;
  guidProvider: IGuidProvider;
  messagesService: IMessagesService;
  validateService: IValidateService;
  workspaceService: IWorkspaceService;
}
export type ServiceKeys = keyof Services;
