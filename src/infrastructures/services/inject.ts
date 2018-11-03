import { inject as injectBase } from 'inversify';

export function inject<TServices extends {}>(key: keyof TServices & string) {
  return injectBase(key);
}
