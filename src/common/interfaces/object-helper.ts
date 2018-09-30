export interface IObjectHelper {
  pick: <TProps>(props: TProps, filter: (key: keyof TProps) => boolean) => {};
  pickInclude: <TProps>(props: TProps, ...includes: Array<keyof TProps>) => {};
  pickExclude: <TProps>(props: TProps, ...excludes: Array<keyof TProps>) => {};
  mapObject: <K extends string, T, U>(
    obj: Record<K, T>,
    func: (x: T) => U,
  ) => Record<K, U>;
}
