export namespace Url {
  export const root = '/';
  export const system = `${root}system`;
  export const signIn = `${system}/sign-in`;
  export const workspaceRootTemplate = `${root}:workspaceId`;
  export const workspaceRoot = (workspaceId: string) => `${root}${workspaceId}`;
}
export namespace ApiUrl {
  export const accountsRefresh = '/accounts/refresh';
  export const accountsSignIn = '/accounts/sign-in';
  export const workspacesInvited = '/workspaces/invited';
}
