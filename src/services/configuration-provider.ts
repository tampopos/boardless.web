import { injectable } from 'inversify';
import { config, Config } from 'src/common/config';

@injectable()
export class ConfigurationProvider implements Config {
  public isMockMode: boolean;
  public apiUrl: string;
  constructor() {
    Object.assign(this, config);
  }
}
