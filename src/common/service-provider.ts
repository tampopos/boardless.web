import { IObjectHelper, ObjectHelper } from './object-helper';
import { IAsyncHelper, AsyncHelper } from './async-helper';
import { IComponentHelper, ComponentHelper } from './component-helper';
import {
  IAuthenticateService,
  AuthenticateService,
} from 'src/services/authenticate-service';
import { config, IConfig } from './config';
import { IFetchHelper, FetchHelperDummy, FetchHelper } from './fetch-helper';

interface Services {
  config: IConfig;
  objectHelper: IObjectHelper;
  asyncHelper: IAsyncHelper;
  fetchHelper: IFetchHelper;
  componentHelper: IComponentHelper;
  authenticateService: IAuthenticateService;
}
const services = {} as Services;
services.config = config;
services.objectHelper = new ObjectHelper();
services.asyncHelper = new AsyncHelper();
services.fetchHelper = config.isMockMode
  ? new FetchHelperDummy(services.asyncHelper)
  : new FetchHelper(services.config);
services.componentHelper = new ComponentHelper(services.objectHelper);
services.authenticateService = new AuthenticateService(services.asyncHelper);

export const resolve = <TKey extends keyof Services>(key: TKey) =>
  services[key];
export const register = <TKey extends keyof Services>(
  key: TKey,
  obj: Services[TKey],
) => (services[key] = obj);
