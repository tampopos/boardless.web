export const pick = <TProps>(
  props: TProps,
  filter: (key: keyof TProps) => boolean,
) => {
  if (!props) {
    return {};
  }
  const obj = {};
  Object.keys(props)
    .filter(key => filter(key as keyof TProps))
    .forEach(key => (obj[key] = props[key]));
  return obj;
};
export const pickInclude = <TProps>(
  props: TProps,
  ...includes: Array<keyof TProps>
) => {
  return pick(props, key => includes.indexOf(key) >= 0);
};
export const pickExclude = <TProps>(
  props: TProps,
  ...excludes: Array<keyof TProps>
) => {
  return pick(props, key => excludes.indexOf(key) < 0);
};
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
