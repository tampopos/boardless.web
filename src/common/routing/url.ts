export namespace Url {
  export const root = '/';
  export const workspaceRootTemplate = '/:workspaceId';
  export const workspaceRoot = (workspaceId: string) => `/${workspaceId}`;
  export const accountsRefresh = '/accounts/refresh';
  export const accountsSignIn = '/accounts/sign-in';
}
