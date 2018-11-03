import { Container } from 'inversify';
import { Services, ServiceKeys } from './services';
import { FetchService } from '../fetch-service';
import { AccountsService } from '../accounts-service';
import { GuidProvider } from '../guid-provider';
import { MessagesService } from '../messages-service';
import { DispatchProvider } from '../dispatch-provider';
import { ValidateService } from '../validate-service';
import { WorkspaceService } from '../workspace-service';
import { config } from 'src/domains/common/config';

const container = new Container({ autoBindInjectable: true });
export const register = <TKey extends ServiceKeys>(key: TKey) =>
  container.bind<Services[TKey]>(key.toString());
export const resolve = <TKey extends ServiceKeys>(
  key: TKey,
): Services[TKey] => {
  return container.get<Services[TKey]>(key.toString());
};
register('config').toConstantValue(config);
register('fetchService')
  .to(FetchService)
  .inSingletonScope();
register('guidProvider')
  .to(GuidProvider)
  .inSingletonScope();
register('accountsService')
  .to(AccountsService)
  .inSingletonScope();
register('messagesService')
  .to(MessagesService)
  .inSingletonScope();
register('dispatchProvider')
  .to(DispatchProvider)
  .inSingletonScope();
register('validateService')
  .to(ValidateService)
  .inSingletonScope();
register('workspaceService')
  .to(WorkspaceService)
  .inSingletonScope();
