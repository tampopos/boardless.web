import { Container } from 'inversify';
import { Services, ServiceKeys } from './services';
import { FetchService } from '../fetch-service';
import { AuthenticateService } from '../authenticate-service';
import { config } from 'src/common/config';
import { GuidProvider } from '../guid-provider';
import { MessagesService } from '../messages-service';
import { DispatchProvider } from '../dispatch-provider';
import { ValidateService } from '../validate-service';

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
register('authenticateService')
  .to(AuthenticateService)
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
