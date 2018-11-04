import persistState from 'redux-localstorage';
import { StoredState } from './stored-state';
import { config } from 'src/domains/common/config';

const version = config.version;
export const createLocalstorageSetting = (...key: Array<keyof StoredState>) =>
  persistState(key, { key: version });
