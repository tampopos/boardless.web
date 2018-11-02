export const mapObject = <K extends string, T, U>(
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
