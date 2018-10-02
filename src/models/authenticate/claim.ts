import { Culture } from 'src/common/location/culture-infos';

export interface Claim {
  token: string;
  userId: string;
  email: string;
  isInitialized: boolean;
  cultureName: Culture;
}
