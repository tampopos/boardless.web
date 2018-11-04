import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { Config } from 'src/domains/models/common/config';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IAccountsService } from 'src/use-cases/services/interfaces/accounts-service';
import { IDispatchProvider } from 'src/use-cases/services/interfaces/dispatch-provider';
import { IGuidProvider } from 'src/use-cases/services/interfaces/guid-provider';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { IValidateService } from 'src/use-cases/services/interfaces/validate-service';
import { IWorkspaceService } from 'src/use-cases/services/interfaces/workspace-service';

export const serviceSymbols = {
  config: createRegisterSymbol<Config>(),
  fetchService: createRegisterSymbol<IFetchService>(),
  guidProvider: createRegisterSymbol<IGuidProvider>(),
  accountsService: createRegisterSymbol<IAccountsService>(),
  messagesService: createRegisterSymbol<IMessagesService>(),
  dispatchProvider: createRegisterSymbol<IDispatchProvider>(),
  validateService: createRegisterSymbol<IValidateService>(),
  workspaceService: createRegisterSymbol<IWorkspaceService>(),
};
