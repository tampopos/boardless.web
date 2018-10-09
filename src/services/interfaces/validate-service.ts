export interface IValidateService {
  isRequired: (value: any) => boolean;
  validEmail: (
    email: string,
  ) => 'requiredError' | 'emailFormatError' | undefined;
  validPassword: (
    password: string,
  ) =>
    | 'requiredError'
    | 'passwordMinLengthError'
    | 'passwordMaxLengthError'
    | 'passwordFormatError'
    | undefined;
}
