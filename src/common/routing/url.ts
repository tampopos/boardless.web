import { stringify } from 'query-string';
import { format, parse } from 'url';
import * as urljoin from 'url-join';
import { config } from '../config';

export namespace Url {
  export const root = '/';
  export const system = `${root}system`;
  export const signIn = `${system}/sign-in`;
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
  const resolveHostname = (rootUrl: string) => {
    const { hostname, port } = parse(rootUrl);
    if (hostname === 'localhost' && window && window.location) {
      return format({
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port,
      });
    }
    return rootUrl;
  };
  export const mockRoot = resolveHostname('http://localhost:3001');
  export const root = resolveHostname(config.apiUrl);
  const accounts = 'accounts';
  export const accountsRefresh = urljoin(mockRoot, accounts, 'refresh');
  export const accountsSignIn = urljoin(mockRoot, accounts, 'sign-in');
  const workspaces = 'workspaces';
  export const workspacesInvited = urljoin(mockRoot, workspaces, 'invited');
  export const workspacesIcon = urljoin(mockRoot, workspaces, 'icon');
  export const workspacesJoin = urljoin(mockRoot, workspaces, 'join');
  const workspacesPublicTemplate = urljoin(mockRoot, workspaces, 'public');
  export const workspacesPublic = (count: number) =>
    urljoin(workspacesPublicTemplate, count.toString());
}
