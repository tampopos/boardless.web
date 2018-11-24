import * as React from 'react';
import { createStyles, Typography } from '@material-ui/core';
import { History } from 'history';
import {
  SignUpModel,
  createDefaultSignUpModel,
} from 'src/domains/models/accounts/sign-up-model';
import { PopoverProps } from '@material-ui/core/Popover';
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
import { symbols } from 'src/use-cases/common/di-symbols';
import { resolve } from 'src/use-cases/common/di-container';
import { Messages } from 'src/domains/common/location/messages';
import { Resources } from 'src/domains/common/location/resources';
import { Url } from 'src/infrastructures/routing/url';
import { ValidationPopup } from 'src/web/components/forms-controls/validation-popup';
import {
  ValidationState,
  Validator,
  ValidatorInitializer,
} from 'src/domains/models/validation/validator';

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
  showSignUpErrorMessage: () => void;
  signUpAsync: (model: SignUpModel) => Promise<{ hasError: boolean }>;
  validateNickNameUniqueAsync: (nickName: string) => Promise<boolean>;
  validateNickNameFormat: (nickName: string) => boolean;
  validateEmailUniqueAsync: (email: string) => Promise<boolean>;
  validateEmailFormat: (email: string) => boolean;
  validatePasswordFormat: (password: string) => boolean;
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
    showSignUpErrorMessage,
    signUpAsync,
    validateEmailFormat,
    validateEmailUniqueAsync,
    validateNickNameFormat,
    validateNickNameUniqueAsync,
    validatePasswordFormat,
  };
};
interface State {
  model: SignUpModel;
  anchor?: null | { key: keyof SignUpModel; el: HTMLInputElement };
  validationState: ValidationState<SignUpModel>;
}

class SignUpValidator extends Validator<SignUpModel> {
  constructor(
    private props: Events & Props,
    initializer: ValidatorInitializer<SignUpModel>,
  ) {
    super(initializer);
  }
  private get messages() {
    return this.props.messages;
  }
  private get resources() {
    return this.props.resources;
  }
  private get validateNickNameUniqueAsync() {
    return this.props.validateNickNameUniqueAsync;
  }
  private get validateNickNameFormat() {
    return this.props.validateNickNameFormat;
  }
  private get validateEmailUniqueAsync() {
    return this.props.validateEmailUniqueAsync;
  }
  private get validateEmailFormat() {
    return this.props.validateEmailFormat;
  }
  private get validatePasswordFormat() {
    return this.props.validatePasswordFormat;
  }
  protected defaultState: ValidationState<SignUpModel> = {
    name: [
      {
        text: this.messages.required(this.resources.Name),
        validate: model => (model.name ? 'valid' : 'inValid'),
      },
    ],
    nickName: [
      {
        text: this.messages.nickNameDescription,
        state: 'description',
      },
      {
        text: this.messages.required(this.resources.NickName),
        validate: model => (model.nickName ? 'valid' : 'inValid'),
      },
      {
        text: this.messages.nickNameFormat,
        validate: model =>
          this.validateNickNameFormat(model.nickName) ? 'valid' : 'inValid',
      },
      {
        text: this.messages.shouldUnique(this.resources.NickName),
        validateAsync: async model =>
          (await this.validateNickNameUniqueAsync(model.nickName))
            ? 'valid'
            : 'inValid',
      },
    ],
    email: [
      {
        text: this.messages.emailDescription,
        state: 'description',
      },
      {
        text: this.messages.required(this.resources.Email),
        validate: model => (model.email ? 'valid' : 'inValid'),
      },
      {
        text: this.messages.emailExample,
        validate: model =>
          this.validateEmailFormat(model.email) ? 'valid' : 'inValid',
      },
      {
        text: this.messages.shouldUnique(this.resources.Email),
        validateAsync: async model =>
          (await this.validateEmailUniqueAsync(model.email))
            ? 'valid'
            : 'inValid',
      },
    ],
    password: [
      {
        text: this.messages.passwordDescription,
        state: 'description',
      },
      {
        text: this.messages.passwordLength,
        validate: model =>
          model.password && model.password.length >= 8 ? 'valid' : 'inValid',
      },
      {
        text: this.messages.passwordFormat,
        validate: model =>
          this.validatePasswordFormat(model.password) ? 'valid' : 'inValid',
      },
    ],
    confirmPassword: [
      {
        text: this.messages.confirmPasswordDescription,
        validationTriggers: ['password'],
        validateAsync: async model =>
          (await this.hasErrorAsync('password', model)) ||
          model.password !== model.confirmPassword
            ? 'inValid'
            : 'valid',
      },
    ],
    cultureName: [],
  };
}

class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  private validator: SignUpValidator;
  constructor(props: any) {
    super(props);
    this.validator = new SignUpValidator(this.props, {
      getModel: () => this.state.model,
      setValidationState: validationState => this.setState({ validationState }),
      interval: 500,
    });
    this.state = {
      model: createDefaultSignUpModel(),
      validationState: this.validator.getDefaultState(),
    };
  }
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
  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ) {
    if (!prevState) {
      return;
    }
    const prevModel = prevState.model;
    const { model, anchor } = this.state;
    if (!anchor) {
      return;
    }
    const key = anchor.key as keyof SignUpModel;
    if (prevModel[key] !== model[key]) {
      this.validator.validateThrottle(key);
    }
  }
  private submit = async () => {
    const { showSignUpErrorMessage, signUpAsync, history } = this.props;
    const { model } = this.state;
    const validationState = await this.validator.validateAll(model);
    if (validationState) {
      showSignUpErrorMessage();
      this.setState({ validationState });
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
    const { model, anchor, validationState } = this.state;
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
    const validationMessages =
      anchor && validationState[anchor.key]
        ? validationState[anchor.key]
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
                error={this.validator.hasError('name', validationState)}
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
                error={this.validator.hasError('nickName', validationState)}
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
                error={this.validator.hasError('email', validationState)}
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
                error={this.validator.hasError('password', validationState)}
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
                error={this.validator.hasError(
                  'confirmPassword',
                  validationState,
                )}
              />
            </Row>
            <Row>
              <OutlinedButton type="submit" className={btn}>
                {resources.SignUp}
              </OutlinedButton>
            </Row>
          </Form>
        </Row>
        {validationMessages && (
          <ValidationPopup
            popupProps={{
              anchorEl: anchor && anchor.el,
              popperProps: { placement: 'top-end' },
            }}
            validationMessages={validationMessages}
          />
        )}
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const SignUp = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
