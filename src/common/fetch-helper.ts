import { IConfig } from './config';
import { IAsyncHelper } from './async-helper';
import { FetchRequest } from 'src/models/fetch-request';

export interface IFetchHelper {
  setCredential: (token: string) => void;
  fetchAsync: <TRequest extends {}, TResult extends {}>(
    request: FetchRequest<TRequest>,
  ) => Promise<TResult>;
}
export class FetchHelper implements IFetchHelper {
  private token: string;
  constructor(private config: IConfig) {}
  public setCredential = (token: string) => (this.token = token);
  public fetchAsync = async <TRequest, TResult>(
    request: FetchRequest<TRequest>,
  ) => {
    const response = await fetch({
      credentials: this.token,
      url: this.config.apiUrl,
    } as Request);
    return (await response.json()) as TResult;
  };
}
export class FetchHelperDummy implements IFetchHelper {
  constructor(private asyncHelper: IAsyncHelper) {}
  public setCredential = (token: string) => {
    console.info(token);
  };
  public fetchAsync = async <TRequest, TResult>(
    request: FetchRequest<TRequest>,
  ) => {
    await this.asyncHelper.delay(100);
    switch (request.relativeUrl) {
    }
    return {} as TResult;
  };
}
