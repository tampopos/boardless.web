import { createContainer } from 'src/infrastructures/services/inversify-helper';
import { registerServices } from 'src/domains/services/common/register-module';
import { registerUseCases } from './register-module';
import { registerServices as registerStoreServices } from 'src/infrastructures/stores/services/register-module';

const container = createContainer({ autoBindInjectable: true });
registerServices(container);
registerStoreServices(container);
registerUseCases(container);
const { resolveService } = container;
export const resolve = resolveService;
