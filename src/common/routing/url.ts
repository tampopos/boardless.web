export namespace Url {
  export const root = '/';
  export const workSpaceRootTemplate = '/:workSpaceId';
  export const workSpaceRoot = (workSpaceId: string) => `/${workSpaceId}`;
  export const authenticateRefresh = '/authenticate/refresh';
  export const authenticateSignIn = '/authenticate/sign-in';
}
