export class Messages {
  public signIn = (name: string) => `${name}がサインインしました。`;
  public requiredError = (name: string) => `${name}が入力されていません。`;
  public emailFormatError = 'Eメールが不正な形式で入力されています。';
  public passwordMinLengthError = 'パスワードは8文字以上入力してください。';
  public passwordMaxLengthError = 'パスワードは100文字以内で入力してください。';
  public passwordFormatError =
    'パスワードは半角英数字をそれぞれ1種類以上入力してください。';
  public required = (name: string) => `${name}は必須入力です。`;
  public validationError =
    'エラーが存在します。入力項目を再度確認してください。';
  public sendWelcomeMail = 'ログイン用のメールを送信しました。';
  public toCompleteSignUp = 'サインアップ処理を完了させてください。';
  public nickNameDescription = 'メンション機能に使用する名前です。';
  public nickNameFormat = 'ニックネームは半角英数記号で入力してください。';
  public shouldUnique = (name: string) =>
    `${name}は誰にも使用されてない必要があります。`;
  public emailDescription = 'ログインに使用するEメールです。';
  public emailExample = '`xxx@example.com`のような形式で入力してください。';
  public passwordDescription = 'ログインに使用するパスワードです。';
  public passwordLength = 'パスワードは8文字以上入力してください。';
  public passwordFormat =
    'パスワードには、半角英小文字、大文字、数字をそれぞれ1種類以上使用してください';
  public confirmPasswordDescription =
    '確認のため再度同じパスワードを入力してください。';
}
export class MessagesEn extends Messages {}
