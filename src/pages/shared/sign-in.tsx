import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Button } from '@material-ui/core';
import * as React from 'react';
import { TextBox } from 'src/components/forms-controls/text-box';
import { connect } from 'react-redux';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { AuthenticateService } from 'src/services/authenticate-service';
import { authenticateActionCreators } from 'src/stores/authenticate/authenticate-reducer';
import { SignInModel } from 'src/models/sign-in-model';

const styles = createStyles({
  root: {},
});
interface Props {}
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
    const { signIn } = this.props;
    const { email, password } = this.state.model;
    return (
      <form>
        <TextBox
          value={email}
          type="email"
          onChange={this.onChange('email')}
          label="email"
        />
        <TextBox
          label="password"
          value={password}
          type="password"
          onChange={this.onChange('password')}
        />
        <Button onClick={e => signIn(this.state.model)}>Sign In</Button>
      </form>
    );
  }
}
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    signIn: async model => {
      const errors = AuthenticateService.validate(model);
      if (errors.length > 0) {
        return;
      }
      const token = await AuthenticateService.signInAsync(model);
      dispatch(authenticateActionCreators.add({ token }));
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({}) => {
  return {};
};
export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inner);
