import { stringify } from 'query-string';

export namespace Url {
  export const root = '/';
  export const system = `${root}system`;
  export const signIn = `${system}/sign-in`;
  export const signUp = `${system}/sign-up`;
  export const searchWorkspaces = (searchKeyword?: string) => {
    if (!searchKeyword) {
      return `${system}/workspaces/search`;
    }
    const query = stringify({ searchKeyword });
    return `${system}/workspaces/search?${query}`;
  };
  export const workspaceRootTemplate = `${root}:workspaceUrl`;
  export const workspaceRoot = (workspaceUrl: string) =>
    `${root}${workspaceUrl}`;
}
export namespace ApiUrl {
  const root = '/';
  const accounts = `${root}accounts`;
  export const accountsRefresh = `${accounts}/refresh`;
  export const accountsSignIn = `${accounts}/sign-in`;
  const workspaces = `${root}workspaces`;
  export const workspacesInvited = `${workspaces}/invited`;
  export const workspacesIcon = `${workspaces}/icon`;
  export const workspacesJoin = `${workspaces}/join`;
  export const workspacesPublic = (count: number) =>
    `${workspaces}/public/${count}`;
}
