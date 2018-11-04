import { Box } from './types';

const mapObject1 = <K extends string, T, U>(
  obj: Record<K, T>,
  func: (x: T) => U,
): Record<K, U> => {
  return Object.entries<T>(obj).reduce(
    (o, [k, v]) => {
      o[k] = func(v);
      return o;
    },
    {} as Record<K, U>,
  );
};
const mapObject2 = <
  T extends {},
  TFuncs extends { [P in keyof T]: (state: T[P]) => Box<T[P]> }
>(
  obj: T,
  funcs: TFuncs,
): { [P in keyof T]: ReturnType<typeof funcs[P]> } => {
  return Object.entries(obj).reduce(
    (o, [k, v]) => {
      o[k] = funcs[k](v);
      return o;
    },
    {} as { [P in keyof T]: ReturnType<typeof funcs[P]> },
  );
};
export const { mapObject } = Object.assign(
  { mapObject: mapObject1 },
  { mapObject: mapObject2 },
);
