import { Container as InversifyContainer, interfaces } from 'inversify';
import { inject as injectBase } from 'inversify';

export interface RegisterSymbol<T> {
  symbol: symbol;
}
export const createRegisterSymbol = <T>(): RegisterSymbol<T> => ({
  symbol: Symbol(),
});
export const createContainer = (
  containerOption: interfaces.ContainerOptions,
) => {
  const tmp = new InversifyContainer(containerOption);
  const extensions = {
    register: <T>(
      symbol: RegisterSymbol<T>,
      option: (binder: interfaces.BindingToSyntax<T>) => void,
    ) => {
      option(tmp.bind<T>(symbol.symbol));
    },
    resolveService: <T>(symbol: RegisterSymbol<T>): T =>
      tmp.get<T>(symbol.symbol),
  };
  return Object.assign(tmp, extensions);
};
export type Container = ReturnType<typeof createContainer>;
export function inject<T>(symbol: RegisterSymbol<T>) {
  return injectBase(symbol.symbol);
}
