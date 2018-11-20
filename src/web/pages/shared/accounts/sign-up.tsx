import * as React from 'react';
import {
  createStyles,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
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
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import {
  Culture,
  cultureInfos,
} from 'src/domains/common/location/culture-infos';
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
import { EventMapper } from 'src/infrastructures/stores/types';
import { ThrottleAsync } from 'src/infrastructures/common/throttle';
import { symbols } from 'src/use-cases/common/di-symbols';
import { resolve } from 'src/use-cases/common/di-container';
import { Messages } from 'src/domains/common/location/messages';
import { Resources } from 'src/domains/common/location/resources';
import { Url } from 'src/infrastructures/routing/url';

const styles = createStyles({
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
  resources: Resources;
  messages: Messages;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history }) => {
  const { resources, messages } = new AccountsSelectors(accounts);
  return { resources, messages, history };
};
interface Events {
  openPopover: (popoverProps: Partial<PopoverProps>) => void;
  validateNickNameUniqueAsync: (nickName: string) => Promise<boolean>;
  validateNickNameFormat: (nickName: string) => boolean;
  validateEmailUniqueAsync: (email: string) => Promise<boolean>;
  validateEmailFormat: (email: string) => boolean;
  validatePasswordFormat: (password: string) => boolean;
  showSignUpErrorMessage: () => void;
  signUpAsync: (model: SignUpModel) => Promise<{ hasError: boolean }>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = () => {
  const {
    validateEmailFormat,
    validateEmailUniqueAsync,
    validateNickNameFormat,
    validateNickNameUniqueAsync,
    validatePasswordFormat,
    showSignUpErrorMessage,
    signUpAsync,
  } = resolve(symbols.accountsUseCase);
  return {
    validateEmailFormat,
    validateEmailUniqueAsync,
    validateNickNameFormat,
    validateNickNameUniqueAsync,
    validatePasswordFormat,
    showSignUpErrorMessage,
    signUpAsync,
  };
};
type contentState = 'valid' | 'inValid' | 'description';
interface PopupContent {
  text: string;
  validate?: () => contentState;
  validateAsync?: () => Promise<contentState>;
  validationTriggers?: string[];
  state?: contentState;
}
interface State {
  model: SignUpModel;
  anchor?: null | { key: keyof SignUpModel; el: HTMLInputElement };
  popupMessages: Record<keyof SignUpModel, PopupContent[]>;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  private validateThrottles: Record<keyof SignUpModel, ThrottleAsync>;
  private validateModel = (key: keyof SignUpModel) => async () => {
    const { popupMessages } = this.state;
    const newPopupMessages = { ...popupMessages };
    const valid = async (x: PopupContent) => {
      const { validate, validateAsync } = x;
      if (validate) {
        x.state = validate();
        return;
      }
      if (validateAsync) {
        x.state = await validateAsync();
        return;
      }
    };
    for (const x of newPopupMessages[key]) {
      await valid(x);
    }
    for (const [k, v] of Object.entries(newPopupMessages)) {
      if (k === key.toString()) {
        continue;
      }
      for (const x of v) {
        const { validationTriggers } = x;
        if (
          !validationTriggers ||
          validationTriggers.filter(t => t === key.toString()).length === 0
        ) {
          continue;
        }
        await valid(x);
      }
    }
    this.setState({ popupMessages: newPopupMessages });
  };
  constructor(props: any) {
    super(props);
    this.state = {
      model: createDefaultSignUpModel(),
      popupMessages: this.createPopupMessages(),
    };
    this.validateThrottles = Object.keys(this.state.model).reduce(
      (o, k) => {
        o[k] = new ThrottleAsync(
          this.validateModel(k as keyof SignUpModel),
          500,
        );
        return o;
      },
      {} as Record<keyof SignUpModel, ThrottleAsync>,
    );
  }
  private createPopupMessages = (): Record<
    keyof SignUpModel,
    PopupContent[]
  > => {
    const { messages, resources } = this.props;
    const { required, shouldUnique } = messages;
    return {
      name: [
        {
          text: required(resources.Name),
          validate: () => (this.state.model.name ? 'valid' : 'inValid'),
        },
      ],
      nickName: [
        {
          text: messages.nickNameDescription,
          state: 'description',
        },
        {
          text: required(resources.NickName),
          validate: () => (this.state.model.nickName ? 'valid' : 'inValid'),
        },
        {
          text: messages.nickNameFormat,
          validate: () =>
            this.props.validateNickNameFormat(this.state.model.nickName)
              ? 'valid'
              : 'inValid',
        },
        {
          text: shouldUnique(resources.NickName),
          validateAsync: async () =>
            (await this.props.validateNickNameUniqueAsync(
              this.state.model.nickName,
            ))
              ? 'valid'
              : 'inValid',
        },
      ],
      email: [
        {
          text: messages.emailDescription,
          state: 'description',
        },
        {
          text: required(resources.Email),
          validate: () => (this.state.model.email ? 'valid' : 'inValid'),
        },
        {
          text: messages.emailExample,
          validate: () =>
            this.props.validateEmailFormat(this.state.model.email)
              ? 'valid'
              : 'inValid',
        },
        {
          text: shouldUnique(resources.Email),
          validateAsync: async () =>
            (await this.props.validateEmailUniqueAsync(this.state.model.email))
              ? 'valid'
              : 'inValid',
        },
      ],
      password: [
        {
          text: messages.passwordDescription,
          state: 'description',
        },
        {
          text: messages.passwordLength,
          validate: () =>
            this.state.model.password && this.state.model.password.length >= 8
              ? 'valid'
              : 'inValid',
        },
        {
          text: messages.passwordFormat,
          validate: () =>
            this.props.validatePasswordFormat(this.state.model.password)
              ? 'valid'
              : 'inValid',
        },
      ],
      confirmPassword: [
        {
          text: messages.confirmPasswordDescription,
          validationTriggers: ['password'],
          validate: () =>
            this.hasError('password') ||
            this.state.model.password !== this.state.model.confirmPassword
              ? 'inValid'
              : 'valid',
        },
      ],
      cultureName: [],
    };
  };
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
  private hasError = (key: keyof SignUpModel) => {
    const popupMessage = this.state.popupMessages[key];
    return (
      popupMessage && popupMessage.filter(x => x.state === 'inValid').length > 0
    );
  };
  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ) {
    if (!prevState) {
      return;
    }
    const prevModel = prevState.model;
    const { model } = this.state;
    if (prevModel && model) {
      for (const key of Object.keys(model)) {
        const k = key as keyof SignUpModel;
        if (prevModel[k] !== model[k]) {
          this.validateThrottles[k].execute();
          break;
        }
      }
    }
  }
  private submit = async () => {
    const { showSignUpErrorMessage, signUpAsync, history } = this.props;
    const { popupMessages, model } = this.state;
    const newPopupMessages = { ...popupMessages };
    const errors: string[] = [];
    const valid = async (x: PopupContent) => {
      const { validate, validateAsync } = x;
      if (validate) {
        x.state = validate();
      }
      if (validateAsync) {
        x.state = await validateAsync();
      }
      if (x.state === 'inValid') {
        errors.push(x.text);
      }
    };
    for (const v of Object.values(newPopupMessages)) {
      for (const x of v) {
        const { validationTriggers } = x;
        if (validationTriggers && validationTriggers.length > 0) {
          continue;
        }
        await valid(x);
      }
    }
    for (const v of Object.values(newPopupMessages)) {
      for (const x of v) {
        const { validationTriggers } = x;
        if (validationTriggers && validationTriggers.length > 0) {
          await valid(x);
        }
      }
    }
    if (errors.length > 0) {
      showSignUpErrorMessage();
      this.setState({ popupMessages: newPopupMessages });
      return;
    }
    const { hasError } = await signUpAsync(model);
    if (!hasError) {
      history.push(Url.signUpCompletion);
    }
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
          <Form onSubmit={this.submit}>
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
                label={resources.Name}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                error={this.hasError('name')}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                value={nickName}
                name="nickName"
                label={resources.NickName}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                error={this.hasError('nickName')}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="email"
                value={email}
                name="email"
                label={resources.Email}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                error={this.hasError('email')}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="password"
                value={password}
                name="password"
                label={resources.Password}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                error={this.hasError('password')}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                label={resources.ConfirmPassword}
                onChange={this.handleChange}
                onFocus={this.openPopover}
                onBlur={this.closePopover}
                error={this.hasError('confirmPassword')}
              />
            </Row>
            <Row>
              <OutlinedButton type="submit" className={btn}>
                {resources.SignUp}
              </OutlinedButton>
            </Row>
          </Form>
        </Row>
        {popupContents && (
          <Popup
            anchorEl={anchor && anchor.el}
            popperProps={{ placement: 'top-end' }}
          >
            <PopupContainer popupContents={popupContents} />
          </Popup>
        )}
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const SignUp = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
const popupContainerStyles = createStyles({
  root: {
    padding: 10,
    marginBottom: 20,
  },
});
interface PopupContainerProps {
  popupContents: PopupContent[];
}
const PopupContainer = decorate(popupContainerStyles)<PopupContainerProps>(
  props => {
    const { classes, popupContents } = createPropagationProps(props);
    const { root } = classes;
    return (
      <Paper className={root}>
        {popupContents.map(({ text, state }, i) => {
          if (state === 'description') {
            return <Typography key={i}>{text}</Typography>;
          }
          return (
            <div key={i}>
              <FormControlLabel
                control={<Checkbox checked={state === 'valid'} />}
                label={text}
              />
            </div>
          );
        })}
      </Paper>
    );
  },
);
