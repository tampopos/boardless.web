import { injectable, inject } from 'inversify';
import { IFetchService } from './interfaces/fetch-service';
import { FetchRequest } from 'src/models/common/fetch-request';
import { ConfigurationProvider } from './configuration-provider';

@injectable()
export class FetchService implements IFetchService {
  private token: string;
  constructor(
    @inject('configurationProvider')
    private configurationProvider: ConfigurationProvider,
  ) {}
  public setCredential = (token: string) => (this.token = token);
  public fetchAsync = async <TResult>(request: FetchRequest) => {
    const url = this.configurationProvider.apiUrl + request.relativeUrl;
    const req = {
      body:
        request.body && !this.configurationProvider.isMockMode
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
