import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Button } from '@material-ui/core';
import * as React from 'react';
import { TextBox } from 'src/components/forms-controls/text-box';
import { connect } from 'react-redux';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { authenticateActionCreators } from 'src/stores/authenticate/authenticate-reducer';
import { SignInModel } from 'src/models/sign-in-model';
import { resolve } from 'src/common/di/service-provider';
import { Resources } from 'src/common/location/resources';
import { getCultureInfo } from 'src/common/location/localize-provider';
import { messagesActionCreators } from 'src/stores/messages/messages-reducer';

const styles = createStyles({
  root: {},
});
interface Props {
  resources: Resources;
}
interface Events {
  signIn: (state: SignInModel) => void;
}
interface State {
  model: SignInModel;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = { model: { email: '', password: '' } };
  }
  public onChange = (name: keyof SignInModel) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      model: Object.assign({}, this.state.model, {
        [name]: e.currentTarget.value,
      }),
    });
  };
  public render() {
    const { signIn, resources } = this.props;
    const { email, password } = this.state.model;
    return (
      <form>
        <TextBox
          value={email}
          type="email"
          onChange={this.onChange('email')}
          label={resources.Email}
        />
        <TextBox
          label={resources.Password}
          value={password}
          type="password"
          onChange={this.onChange('password')}
        />
        <Button onClick={e => signIn(this.state.model)}>
          {resources.SignIn}
        </Button>
      </form>
    );
  }
}
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    signIn: async model => {
      const authenticateService = resolve('authenticateService');
      const errors = authenticateService.validate(model);
      if (errors.length > 0) {
        errors.forEach(error => {
          dispatch(
            messagesActionCreators.showMessage({
              message: { level: 'error', text: error },
            }),
          );
        });
        return;
      }
      const token = await authenticateService.signInAsync(model);
      dispatch(authenticateActionCreators.add({ token }));
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({ locationState }) => {
  const { resources } = getCultureInfo(locationState.cultureName);
  return {
    resources,
  };
};
export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
