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
import { Form } from 'src/components/forms-controls/form';
import { RouteComponentProps } from 'react-router';
import { decorate } from 'src/common/styles/styles-helper';
import { withRouter } from 'src/common/routing/routing-helper';
import { History } from 'history';
import { Url } from 'src/common/routing/url';

const styles = createStyles({
  root: {},
});
interface Props {
  resources: Resources;
}
interface Events {
  signIn: (state: SignInModel, history: History) => void;
}
interface State {
  model: SignInModel;
}
class Inner extends StyledComponentBase<
  typeof styles,
  Props & Events & RouteComponentProps<{}>,
  State
> {
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
    const { signIn, resources, history } = this.props;
    const { email, password } = this.state.model;
    return (
      <Form onSubmit={e => signIn(this.state.model, history)}>
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
        <Button type="submit">{resources.SignIn}</Button>
      </Form>
    );
  }
}
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    signIn: async (model, history) => {
      const authenticateService = resolve('authenticateService');
      const errors = authenticateService.validate(model);
      const writeMessages = (e: string[]) => {
        if (!errors || errors.length === 0) {
          return false;
        }
        errors.forEach(error => {
          dispatch(
            messagesActionCreators.showMessage({
              message: { level: 'error', text: error },
            }),
          );
        });
        return true;
      };
      if (writeMessages(errors)) {
        return;
      }
      const res = await authenticateService.signInAsync(model);
      if (writeMessages(res.errors)) {
        return;
      }
      dispatch(authenticateActionCreators.add({ token: res.token }));
      history.push(Url.root);
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({ locationState }) => {
  const { resources } = getCultureInfo(locationState.cultureName);
  return {
    resources,
  };
};
const StyledInner = decorate(styles)(Inner);
const RoutingInner = withRouter(StyledInner);
export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutingInner);
