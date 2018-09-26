export interface IObjectHelper {
  pick: <TProps>(props: TProps, filter: (key: keyof TProps) => boolean) => {};
  pickInclude: <TProps>(props: TProps, ...includes: Array<keyof TProps>) => {};
  pickExclude: <TProps>(props: TProps, ...excludes: Array<keyof TProps>) => {};
  mapObject: <K extends string, T, U>(
    obj: Record<K, T>,
    func: (x: T) => U,
  ) => Record<K, U>;
}
export class ObjectHelper implements IObjectHelper {
  public pick = <TProps>(
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
  public pickInclude = <TProps>(
    props: TProps,
    ...includes: Array<keyof TProps>
  ) => {
    return this.pick(props, key => includes.indexOf(key) >= 0);
  };
  public pickExclude = <TProps>(
    props: TProps,
    ...excludes: Array<keyof TProps>
  ) => {
    return this.pick(props, key => excludes.indexOf(key) < 0);
  };
  public mapObject = <K extends string, T, U>(
    obj: Record<K, T>,
    func: (x: T) => U,
  ): Record<K, U> => {
    const newObj: any = Object.assign({}, obj);
    Object.keys(obj).forEach(key => (newObj[key] = func(newObj[key])));
    return newObj;
  };
}
