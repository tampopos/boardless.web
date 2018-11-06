import { Culture } from './culture-infos';

export class Resources {
  public Email = 'Eメール';
  public Password = 'パスワード';
  public SignIn = 'サインイン';
  public SignUp = 'サインアップ';
  public RegisterNewUser = '新しいユーザーを作成する';
  public SignInAsAnotherUser = '別のユーザーとしてサインインする';
  public Profile = 'プロフィール';
  public SignOut = 'サインアウト';
  public AddWorkspace = 'ワークスペースを追加する';
  public AddingWorkspace = 'ワークスペースの追加';
  public AddNewWorkspace = '新規ワークスペースを追加する';
  public JoinWorkspace = '既存のワークスペースに参加する';
  public CloseWorkspace = 'ワークスペースを閉じる';
  public JoinedWorkspace = '参加済みのワークスペース';
  public InvitedWorkspace = '招待されたワークスペース';
  public JoinableWorkspace = '参加可能なワークスペース';
  public Join = '参加する';
  public JoinAs = (name: string) => `${name}として参加する`;
  public ConfirmPassword = '確認用パスワード';
  public Name = '名前';
  public NickName = 'ニックネーム';
  public Language = '言語';
  public CultureNames: Record<Culture, string> = {
    ja: '日本語',
    en: '英語',
  };
}
export class ResourcesEn extends Resources {
  public Email = 'Email';
  public Password = 'Password';
  public SignIn = 'Sign In';
  public Profile = 'Profile';
  public SignOut = 'Sign Out';
  public AddWorkspace = 'Add Workspace';
  public CultureNames: Record<Culture, string> = {
    ja: 'Japanese',
    en: 'English',
  };
}
