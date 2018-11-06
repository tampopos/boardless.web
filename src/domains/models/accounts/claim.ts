import { Culture } from 'src/domains/common/location/culture-infos';
export interface Claim {
  token: string;
  userId: string;
  email: string;
  name: string;
  isInitialized: boolean;
  cultureName: Culture;
}
