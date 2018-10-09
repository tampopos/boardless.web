import { injectable } from 'inversify';
import { IAsyncHelper } from './interfaces/async-helper';

@injectable()
export class AsyncHelper implements IAsyncHelper {
  public delay = (ms: number) => new Promise(r => setTimeout(() => r(), ms));
}
