import { IConfig } from './interfaces/config';
import { IAsyncHelper } from './interfaces/async-helper';
import { FetchRequest } from 'src/models/fetch-request';
import { injectable } from 'inversify';
import { IFetchHelper } from './interfaces/fetch-helper';
import { inject } from './di/inject';

@injectable()
export class FetchHelper implements IFetchHelper {
  private token: string;
  constructor(
    @inject('config') private config: IConfig,
    @inject('asyncHelper') private asyncHelper: IAsyncHelper,
  ) {}
  public setCredential = (token: string) => (this.token = token);
  public fetchAsync = async <TResult>(request: FetchRequest) => {
    if (this.config.isMockMode) {
      return await this.fetchAsyncMock<TResult>(request);
    }
    const response = await fetch({
      credentials: this.token,
      url: this.config.apiUrl,
    } as Request);
    return (await response.json()) as TResult;
  };
  private fetchAsyncMock = async <TResult>(request: FetchRequest) => {
    await this.asyncHelper.delay(100);
    switch (request.relativeUrl) {
    }
    return {} as TResult;
  };
}
