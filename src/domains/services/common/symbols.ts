import { createRegisterSymbol } from 'src/infrastructures/services/inversify-helper';
import { Config } from 'src/domains/models/common/config';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IDispatchProvider } from 'src/use-cases/services/interfaces/dispatch-provider';
import { IGuidProvider } from 'src/use-cases/services/interfaces/guid-provider';
import { IValidateService } from 'src/use-cases/services/interfaces/validate-service';

export const serviceSymbols = {
  config: createRegisterSymbol<Config>(),
  fetchService: createRegisterSymbol<IFetchService>(),
  guidProvider: createRegisterSymbol<IGuidProvider>(),
  dispatchProvider: createRegisterSymbol<IDispatchProvider>(),
  validateService: createRegisterSymbol<IValidateService>(),
};
