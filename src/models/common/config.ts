export interface ExternalConfig {
  isMockMode: boolean;
  apiUrl: string;
}
export interface InternalConfig {
  version: string;
}
export interface Config extends ExternalConfig, InternalConfig {}
