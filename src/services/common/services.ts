import { IAuthenticateService } from 'src/services/interfaces/authenticate-service';
import { IFetchService } from '../interfaces/fetch-service';
import { Config } from 'src/models/common/config';

export interface Services {
  config: Config;
  fetchService: IFetchService;
  authenticateService: IAuthenticateService;
}
export type ServiceKeys = keyof Services;
