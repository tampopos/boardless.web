import * as React from 'react';
import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles } from '@material-ui/core';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { Resources } from 'src/common/location/resources';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { History } from 'history';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { Theme } from 'src/common/styles/theme';
import { TextBox } from 'src/components/forms-controls/text-box';
import { OutlinedButton } from 'src/components/forms-controls/button';
import { Form } from 'src/components/forms-controls/form';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 50,
      width: 500,
      minWidth: 500,
      margin: 'auto',
      paddingBottom: 200,
      alignSelf: 'center',
    },
  });
interface Props {
  resources: Resources;
  history: History;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<Props, Param, OwnProps> = (
  { accountsState },
  { history },
) => {
  const { resources } = new AccountsGetters(accountsState);
  return { resources, history };
};
interface Events {}
const mapDispatchToProps: DispatchMapper<Events, OwnProps> = dispatch => {
  return {};
};
interface State {
  email: string;
  password: string;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  public emailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value });
  };
  public passwordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };
  public render() {
    const { resources } = this.props;
    const { root } = getInjectClasses(this.props);
    const { email, password } = this.state;
    return (
      <Container className={root}>
        <Form>
          <Row>
            <TextBox
              type="email"
              value={email}
              onChange={this.emailChanged}
              label={resources.Email}
            />
            <TextBox
              type="password"
              value={password}
              onChange={this.passwordChanged}
              label={resources.Password}
            />
            <OutlinedButton type="submit">{resources.SignUp}</OutlinedButton>
          </Row>
        </Form>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const SignUp = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
