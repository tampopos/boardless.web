import { Container } from 'src/infrastructures/services/inversify-helper';
import { serviceSymbols } from './symbols';
import { FetchService } from '../fetch-service';
import { AccountsService } from '../accounts-service';
import { GuidProvider } from '../guid-provider';
import { MessagesService } from '../messages-service';
import { DispatchProvider } from '../dispatch-provider';
import { ValidateService } from '../validate-service';
import { WorkspaceService } from '../workspace-service';
import { config } from 'src/domains/common/config';

export const registerServices = (container: Container) => ({
  config: container.register(serviceSymbols.config, binder =>
    binder.toConstantValue(config),
  ),
  fetchService: container.register(serviceSymbols.fetchService, binder =>
    binder.to(FetchService).inSingletonScope(),
  ),
  guidProvider: container.register(serviceSymbols.guidProvider, binder =>
    binder.to(GuidProvider).inSingletonScope(),
  ),
  accountsService: container.register(serviceSymbols.accountsService, binder =>
    binder.to(AccountsService).inSingletonScope(),
  ),
  messagesService: container.register(serviceSymbols.messagesService, binder =>
    binder.to(MessagesService).inSingletonScope(),
  ),
  dispatchProvider: container.register(
    serviceSymbols.dispatchProvider,
    binder => binder.to(DispatchProvider).inSingletonScope(),
  ),
  validateService: container.register(serviceSymbols.validateService, binder =>
    binder.to(ValidateService).inSingletonScope(),
  ),
  workspaceService: container.register(
    serviceSymbols.workspaceService,
    binder => binder.to(WorkspaceService).inSingletonScope(),
  ),
});
