import { Container } from 'inversify';
import { Services, ServiceKeys } from './services';
import { ConfigurationProvider } from '../configuration-provider';
import { FetchService } from '../fetch-service';
import { AuthenticateService } from '../authenticate-service';

const container = new Container({ autoBindInjectable: true });
export const register = <TKey extends ServiceKeys>(key: TKey) =>
  container.bind<Services[TKey]>(key.toString());
export const resolve = <TKey extends ServiceKeys>(
  key: TKey,
): Services[TKey] => {
  return container.get<Services[TKey]>(key.toString());
};
register('configurationProvider').to(ConfigurationProvider);
register('fetchService').to(FetchService);
register('authenticateService').to(AuthenticateService);
