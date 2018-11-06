import * as React from 'react';
import { createStyles, Typography, Paper } from '@material-ui/core';
import { History } from 'history';
import {
  SignUpModel,
  createDefaultSignUpModel,
} from 'src/domains/models/accounts/sign-up-model';
import { PopoverProps } from '@material-ui/core/Popover';
import { Popup } from 'src/web/components/layout/popup';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { DispatchMapper } from 'src/infrastructures/stores/types';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import {
  Culture,
  cultureInfos,
} from 'src/domains/common/location/culture-infos';
import { Theme } from 'src/infrastructures/styles/theme';
import {
  createPropagationProps,
  decorate,
} from 'src/infrastructures/styles/styles-helper';
import { Row } from 'src/web/components/layout/row';
import { Form } from 'src/web/components/forms-controls/form';
import { RadioGroup } from 'src/web/components/forms-controls/radio-group';
import { OutlinedTextBox } from 'src/web/components/forms-controls/text-box';
import { Container } from 'src/web/components/layout/container';
import { OutlinedButton } from 'src/web/components/forms-controls/button';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 960,
      padding: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    btn: {
      width: 200,
      marginLeft: 'auto',
    },
  });
interface Props {
  history: History;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history }) => {
  const { resources } = new AccountsSelectors(accounts);
  return { resources, history };
};
interface Events {
  openPopover: (popoverProps: Partial<PopoverProps>) => void;
}
const mapDispatchToProps: DispatchMapper<Events, OwnProps> = dispatch => {
  return {};
};
interface PopupContent {
  text: string;
  state: 'description' | 'valid' | 'inValid';
}
interface State {
  model: SignUpModel;
  anchor?: null | { key: keyof SignUpModel; el: HTMLInputElement };
  popupMessages: Partial<Record<keyof SignUpModel, PopupContent[]>>;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      model: createDefaultSignUpModel(),
      popupMessages: this.createPopupMessages(),
    };
  }
  private createPopupMessages = (): Partial<
    Record<keyof SignUpModel, PopupContent[]>
  > => ({
    nickName: [
      {
        text: 'メンション機能に使用する名前です。',
        state: 'description',
      },
      {
        text: 'ニックネームは誰にも使用されてない必要があります。',
        state: 'description',
      },
    ],
    password: [
      {
        text: '8文字以上入力してください。',
        state: 'description',
      },
      {
        text: 'アルファベットおよび数字、記号のうち、2種類以上使用してください',
        state: 'description',
      },
    ],
    confirmPassword: [
      {
        text: '確認のため再度同じパスワードを入力してください。',
        state: 'description',
      },
    ],
  });
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { model } = this.state;
    const { name, value } = e.currentTarget;
    this.setState({ model: { ...model, [name]: value } });
  };
  private handleChangeCulture = (e: {}, culture: Culture) => {
    const { model } = this.state;
    this.setState({ model: { ...model, cultureName: culture } });
  };
  private openPopover = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      anchor: {
        key: e.currentTarget.name as keyof SignUpModel,
        el: e.currentTarget,
      },
    });
  };
  private closePopover = () => {
    this.setState({ anchor: null });
  };
  public render() {
    const { classes } = createPropagationProps(this.props);
    const { root, btn } = classes;
    const { model, anchor, popupMessages } = this.state;
    const {
      email,
      password,
      name,
      nickName,
      confirmPassword,
      cultureName,
    } = model;
    const { resources } = cultureInfos[cultureName];
    const radioItems = Object.entries(resources.CultureNames).map(x => ({
      value: x[0],
      label: x[1],
    }));
    const popupContents =
      anchor && popupMessages[anchor.key]
        ? popupMessages[anchor.key]
        : undefined;
    return (
      <Container className={root}>
        <Row>
          <Typography variant="h4">{resources.RegisterNewUser}</Typography>
        </Row>
        <Row>
          <Form>
            <Row>
              <RadioGroup
                label={resources.Language}
                value={cultureName}
                onChange={this.handleChangeCulture}
                items={radioItems}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                value={name}
                name="name"
                required={true}
                label={resources.Name}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                value={nickName}
                required={true}
                name="nickName"
                label={resources.NickName}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="email"
                value={email}
                name="email"
                required={true}
                label={resources.Email}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="password"
                value={password}
                name="password"
                required={true}
                label={resources.Password}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                required={true}
                label={resources.ConfirmPassword}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
              />
            </Row>
            <Row>
              <OutlinedButton type="submit" className={btn}>
                {resources.SignUp}
              </OutlinedButton>
            </Row>
          </Form>
        </Row>
        {
          <Popup anchorEl={anchor && anchor.el}>
            <Paper>
              {popupContents &&
                popupContents.map(({ text, state }) => {
                  return (
                    <div key={text}>
                      {text}
                      {state}
                    </div>
                  );
                })}
            </Paper>
          </Popup>
        }
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const SignUp = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
