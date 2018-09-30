import { ObjectHelper } from '../object-helper';
import { AsyncHelper } from '../async-helper';
import { ComponentHelper } from '../component-helper';
import { AuthenticateService } from 'src/services/authenticate-service';
import { Config } from '../config';
import { FetchHelper } from '../fetch-helper';
import { Container } from 'inversify';
import { Services, ServiceKeys } from './services';

const container = new Container({ autoBindInjectable: true });
const register = <TKey extends ServiceKeys>(key: TKey) =>
  container.bind<Services[TKey]>(key.toString());
export const resolve = <TKey extends ServiceKeys>(
  key: TKey,
): Services[TKey] => {
  return container.get<Services[TKey]>(key.toString());
};
register('config')
  .to(Config)
  .inSingletonScope();
register('objectHelper')
  .to(ObjectHelper)
  .inSingletonScope();
register('asyncHelper')
  .to(AsyncHelper)
  .inSingletonScope();
register('fetchHelper')
  .to(FetchHelper)
  .inSingletonScope();
register('componentHelper')
  .to(ComponentHelper)
  .inSingletonScope();
register('authenticateService')
  .to(AuthenticateService)
  .inSingletonScope();
