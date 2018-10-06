export namespace Url {
  export const root = '/';
  export const workSpaceRootTemplate = '/:workSpaceId';
  export const workSpaceRoot = (workSpaceId: string) => `/${workSpaceId}`;
  export const accountsRefresh = '/accounts/refresh';
  export const accountsSignIn = '/accounts/sign-in';
}
