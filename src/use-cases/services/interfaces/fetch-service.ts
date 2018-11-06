import { FetchRequest } from 'src/domains/models/common/fetch-request';

export interface IFetchService {
  setCredential: (token: string) => void;
  fetchAsync: <TResult extends {}>(
    request: FetchRequest,
    token?: string,
  ) => Promise<TResult>;
}
