import { serviceSymbols } from 'src/domains/services/common/symbols';
import { useCaseSymbols } from './use-case-symbols';

export const symbols = { ...serviceSymbols, ...useCaseSymbols };
