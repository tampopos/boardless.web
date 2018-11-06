import { Culture } from 'src/domains/common/location/culture-infos';
export interface SignUpModel {
  name: string;
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
  cultureName: Culture;
}
export const createDefaultSignUpModel = (): SignUpModel => {
  return {
    name: '',
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
    cultureName: 'ja',
  };
};
