export class Messages {
  public signIn = (name: string) => `${name}がサインインしました。`;
  public requiredError = (name: string) => `${name}が入力されていません。`;
  public emailFormatError = 'Eメールが不正な形式で入力されています。';
  public passwordMinLengthError = 'パスワードは8文字以上入力してください。';
  public passwordMaxLengthError = 'パスワードは100文字以内で入力してください。';
  public passwordFormatError =
    'パスワードは半角英数字をそれぞれ1種類以上入力してください。';
}
export class MessagesEn extends Messages {}
