import { FetchRequest } from 'src/models/fetch-request';

export interface IFetchHelper {
  setCredential: (token: string) => void;
  fetchAsync: <TResult extends {}>(request: FetchRequest) => Promise<TResult>;
}
