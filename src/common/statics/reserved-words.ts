export namespace ReservedWords {
  export namespace WorkspaceUrl {
    export const system = 'system';
    export const all = [system];
    export const isReserved = (workspaceUrl: string) =>
      all.filter(x => x === workspaceUrl).length > 0;
  }
}
