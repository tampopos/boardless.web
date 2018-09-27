import { MethodName } from './types';

export interface FetchRequest<T extends {} = {}> {
  body: T;
  relativeUrl: string;
  methodName: MethodName;
}
