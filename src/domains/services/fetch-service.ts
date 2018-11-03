import { injectable } from 'inversify';
import { FetchRequest } from 'src/domains/models/common/fetch-request';
import { Config } from 'src/domains/models/common/config';
import { inject } from 'src/infrastructures/services/inject';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';

@injectable()
export class FetchService implements IFetchService {
  private token: string;
  constructor(@inject('config') private config: Config) {}
  public setCredential = (token: string) => (this.token = token);
  public fetchAsync = async <TResult>(
    request: FetchRequest,
    token?: string,
  ) => {
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
    const response = await fetch(request.url, req);
    const json = await response.json();
    return json as TResult;
  };
}
