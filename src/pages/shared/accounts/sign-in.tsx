import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { OutlinedTextBox } from 'src/components/forms-controls/text-box';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { SignInModel } from 'src/models/accounts/sign-in-model';
import { resolve } from 'src/services/common/service-provider';
import { Resources } from 'src/common/location/resources';
import { Form } from 'src/components/forms-controls/form';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { History } from 'history';
import { Url } from 'src/common/routing/url';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { Cell } from 'src/components/layout/cell';
import { OutlinedButton } from 'src/components/forms-controls/button';
import { AccountsSelectors } from 'src/stores/accounts/selectors';
import { SideMenuContainer } from '../side-menu/side-menu-container';

const styles = createStyles({
  root: {
    padding: 20,
    maxWidth: 500,
    margin: 'auto',
    paddingBottom: 200,
  },
  form: {
    paddingTop: 20,
  },
});
interface Props {
  resources: Resources;
  workspaceUrl: string;
  history: History;
  getDefaultEmail: () => string;
  redirectRoot: boolean;
}
interface Events {
  signIn: (state: SignInModel, history: History, workspaceUrl?: string) => void;
}
interface State {
  model: SignInModel;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    const { getDefaultEmail } = this.props;
    this.state = {
      model: { email: getDefaultEmail(), password: '' },
    };
  }
  public componentDidMount() {
    const { redirectRoot, history } = this.props;
    if (redirectRoot) {
      history.push(Url.root);
    }
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
    const { signIn, resources, history, workspaceUrl, classes } = this.props;
    const { email, password } = this.state.model;
    const { form, root } = classes;
    return (
      <SideMenuContainer>
        <Container className={root}>
          <Row>
            <Typography variant="h4">{resources.SignIn}</Typography>
          </Row>
          <Row>
            <Form
              onSubmit={() => signIn(this.state.model, history, workspaceUrl)}
              className={form}
            >
              <Row>
                <OutlinedTextBox
                  value={email}
                  type="email"
                  onChange={this.onChange('email')}
                  label={resources.Email}
                />
              </Row>
              <Row>
                <OutlinedTextBox
                  label={resources.Password}
                  value={password}
                  type="password"
                  onChange={this.onChange('password')}
                />
              </Row>
              <Row>
                <Cell xs={8} />
                <Cell xs={4}>
                  <OutlinedButton type="submit">
                    {resources.SignIn}
                  </OutlinedButton>
                </Cell>
              </Row>
            </Form>
          </Row>
        </Container>
      </SideMenuContainer>
    );
  }
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  return {
    signIn: async (model, history, workspaceUrl) => {
      const accountsService = resolve('accountsService');
      if (!(await accountsService.validate(model))) {
        return;
      }
      await accountsService.signInAsync(model, history, workspaceUrl);
    },
  };
};
interface Params {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<Props, Params> = (
  { accounts },
  { match, history },
) => {
  const { claim } = accounts;
  const { resources, validateWorkspaceUrl } = new AccountsSelectors(accounts);
  const { workspaceUrl } = match.params;
  const redirectRoot = !validateWorkspaceUrl(workspaceUrl);
  const getDefaultEmail = () => {
    if (!redirectRoot && claim) {
      return claim.email;
    }
    return '';
  };
  return { resources, getDefaultEmail, history, redirectRoot };
};
const StyledInner = decorate(styles)(Inner);
export const SignIn = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
