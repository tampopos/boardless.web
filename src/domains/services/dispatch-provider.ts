import { Dispatch } from 'redux';
import { injectable } from 'inversify';
import { IDispatchProvider } from 'src/use-cases/services/interfaces/dispatch-provider';

@injectable()
export class DispatchProvider implements IDispatchProvider {
  public dispatch: Dispatch;
}
