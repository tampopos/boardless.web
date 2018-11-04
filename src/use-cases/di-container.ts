import { createContainer } from 'src/infrastructures/services/inversify-helper';
import { serviceSymbols } from 'src/domains/services/common/symbols';
import { registerServices } from 'src/domains/services/common/register-module';

const container = createContainer({ autoBindInjectable: true });
export const symbols = serviceSymbols;
registerServices(container);
export const { resolve } = container;
