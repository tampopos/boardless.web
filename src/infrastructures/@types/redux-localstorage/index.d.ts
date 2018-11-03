declare module 'redux-localstorage' {
  namespace Ghost {
    interface Config<TState> {
      key?: string;
      serialize?: typeof JSON.stringify;
      deserialize?: typeof JSON.parse;
    }
  }
  export default function persistState<TState>(
    paths: Array<keyof TState>,
    config: Ghost.Config<TState>,
  ): any;
}
