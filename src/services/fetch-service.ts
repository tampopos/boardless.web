import { injectable, inject } from 'inversify';
import { IFetchService } from './interfaces/fetch-service';
import { FetchRequest } from 'src/models/common/fetch-request';
import { Config } from 'src/models/common/config';

@injectable()
export class FetchService implements IFetchService {
  private token: string;
  constructor(@inject('config') private config: Config) {}
  public setCredential = (token: string) => (this.token = token);
  public fetchAsync = async <TResult>(
    request: FetchRequest,
    token?: string,
  ) => {
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
    if (token) {
      // req.credentials.=token;
    } else if (this.token) {
      // req.credentials.=this.token;
    }
    const response = await fetch(url, req);
    const json = await response.json();
    return json as TResult;
  };
}
