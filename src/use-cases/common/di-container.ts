import { createContainer } from 'src/infrastructures/services/inversify-helper';
import { registerServices } from 'src/domains/services/common/register-module';
import { registerUseCases } from './register-module';

const container = createContainer({ autoBindInjectable: true });
registerServices(container);
registerUseCases(container);
const { resolveService } = container;
export const resolve = resolveService;
