import { FetchRequest } from 'src/models/common/fetch-request';

export interface IFetchService {
  setCredential: (token: string) => void;
  fetchAsync: <TResult extends {}>(request: FetchRequest) => Promise<TResult>;
}
