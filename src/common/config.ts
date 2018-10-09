import { injectable } from 'inversify';
import { IConfig } from './interfaces/config';

@injectable()
export class Config implements IConfig {
  public isMockMode: boolean;
  public apiUrl: string;
  constructor() {
    Object.assign(this, this.getConfig());
    this.changeApiUrl();
  }
  private getConfig = (): IConfig => {
    switch (process.env.NODE_ENV) {
      case 'test':
        return {
          isMockMode: Boolean(process.env.REACT_APP_TEST_MOCK_MODE),
          apiUrl: String(process.env.REACT_APP_TEST_API_URL),
        };
      case 'production':
        return {
          isMockMode: Boolean(process.env.REACT_APP_PROD_MOCK_MODE),
          apiUrl: String(process.env.REACT_APP_PROD_API_URL),
        };
    }
    return {
      isMockMode: Boolean(process.env.REACT_APP_DEV_MOCK_MODE),
      apiUrl: String(process.env.REACT_APP_DEV_API_URL),
    };
  };
  private changeApiUrl(): any {
    if (!this.isMockMode || !window || !window.location) {
      return;
    }
    this.apiUrl = `${window.location.protocol}//${
      window.location.hostname
    }:3001`;
  }
}
