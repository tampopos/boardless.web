import { Container } from 'src/infrastructures/services/inversify-helper';
import { serviceSymbols } from './symbols';
import { FetchService } from '../fetch-service';
import { GuidProvider } from '../../../infrastructures/common/services/guid-provider';
import { ValidateService } from '../validate-service';
import { config } from 'src/domains/common/config';
import { AccountsService } from '../accounts-service';

export const registerServices = (container: Container) => {
  container.register(serviceSymbols.config, binder =>
    binder.toConstantValue(config),
  );
  container.register(serviceSymbols.fetchService, binder =>
    binder.to(FetchService).inSingletonScope(),
  );
  container.register(serviceSymbols.guidProvider, binder =>
    binder.to(GuidProvider).inSingletonScope(),
  );
  container.register(serviceSymbols.validateService, binder =>
    binder.to(ValidateService).inSingletonScope(),
  );
  container.register(serviceSymbols.accountsService, binder =>
    binder.to(AccountsService).inSingletonScope(),
  );
};
