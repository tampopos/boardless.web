export interface IValidateService {
  isRequired: (value: any) => boolean;
  validateNickNameFormat: (nickName: string) => boolean;
  validateEmailFormat: (email: string) => boolean;
  validatePasswordFormat: (password: string) => boolean;
}
