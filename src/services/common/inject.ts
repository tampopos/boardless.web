import { inject as injectBase } from 'inversify';
import { ServiceKeys } from './services';

export function inject<TKey extends ServiceKeys>(key: TKey) {
  return injectBase(key);
}
