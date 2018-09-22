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
