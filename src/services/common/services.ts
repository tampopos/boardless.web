import { IAuthenticateService } from 'src/services/interfaces/authenticate-service';
import { IFetchService } from '../interfaces/fetch-service';
import { Config } from 'src/common/config';

export interface Services {
  configurationProvider: Config;
  fetchService: IFetchService;
  authenticateService: IAuthenticateService;
}
export type ServiceKeys = keyof Services;
