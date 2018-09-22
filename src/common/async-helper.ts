export namespace AsyncHelper {
  export const delay = (ms: number) =>
    new Promise(r => setTimeout(() => r(), ms));
}
