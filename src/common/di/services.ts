import { IConfig } from '../interfaces/config';
import { IObjectHelper } from '../interfaces/object-helper';
import { IAsyncHelper } from '../interfaces/async-helper';
import { IFetchHelper } from '../interfaces/fetch-helper';
import { IComponentHelper } from '../interfaces/component-helper';
import { IAuthenticateService } from 'src/services/interfaces/authenticate-service';

export interface Services {
  config: IConfig;
  objectHelper: IObjectHelper;
  asyncHelper: IAsyncHelper;
  fetchHelper: IFetchHelper;
  componentHelper: IComponentHelper;
  authenticateService: IAuthenticateService;
}
export type ServiceKeys = keyof Services;
