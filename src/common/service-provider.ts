import { ObjectHelper } from './object-helper';
import { AsyncHelper } from './async-helper';
import { ComponentHelper } from './component-helper';
import { AuthenticateService } from 'src/services/authenticate-service';
import { Config } from './config';
import { FetchHelper } from './fetch-helper';
import { Container } from 'inversify';
import { IObjectHelper } from './interfaces/object-helper';
import { IConfig } from './interfaces/config';
import { IAsyncHelper } from './interfaces/async-helper';
import { IFetchHelper } from './interfaces/fetch-helper';
import { IComponentHelper } from './interfaces/component-helper';
import { IAuthenticateService } from 'src/services/interfaces/authenticate-service';

interface Services {
  config: IConfig;
  objectHelper: IObjectHelper;
  asyncHelper: IAsyncHelper;
  fetchHelper: IFetchHelper;
  componentHelper: IComponentHelper;
  authenticateService: IAuthenticateService;
}

const container = new Container({ autoBindInjectable: true });
const register = <TKey extends keyof Services>(key: TKey) =>
  container.bind<Services[TKey]>(key.toString());
export const resolve = <TKey extends keyof Services>(
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
