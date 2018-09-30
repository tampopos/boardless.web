import { IConfig } from './interfaces/config';
import { FetchRequest } from 'src/models/fetch-request';
import { injectable, inject } from 'inversify';
import { IFetchHelper } from './interfaces/fetch-helper';

@injectable()
export class FetchHelper implements IFetchHelper {
  private token: string;
  constructor(@inject('config') private config: IConfig) {}
  public setCredential = (token: string) => (this.token = token);
  public fetchAsync = async <TResult>(request: FetchRequest) => {
    const url = this.config.apiUrl + request.relativeUrl;
    const req = {
      body:
        request.body && !this.config.isMockMode
          ? JSON.stringify(request.body)
          : null,
      headers: new Headers(
        request.methodName !== 'GET'
          ? { Accept: 'application/json', 'Content-Type': 'application/json' }
          : {},
      ),
    } as Request;
    if (this.token) {
      // req.credentials.=this.token;
    }
    const response = await fetch(url, req);
    const json = await response.json();
    return json as TResult;
  };
}
