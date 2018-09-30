import { MethodName } from './types';

export interface FetchRequest {
  body: object;
  relativeUrl: string;
  methodName: MethodName;
}
