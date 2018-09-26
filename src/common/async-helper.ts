export interface IAsyncHelper {
  delay: (ms: number) => Promise<{}>;
}
export class AsyncHelper implements IAsyncHelper {
  public delay = (ms: number) => new Promise(r => setTimeout(() => r(), ms));
}
