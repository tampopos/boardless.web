import { serviceSymbols } from 'src/domains/services/common/symbols';
import { useCaseSymbols } from './use-case-symbols';
import { serviceSymbols as storeSymbols } from 'src/infrastructures/stores/services/symbols';

export const symbols = {
  ...serviceSymbols,
  ...storeSymbols,
  ...useCaseSymbols,
};
