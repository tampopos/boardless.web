import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { OutlinedTextBox } from 'src/web/components/forms-controls/text-box';
import { EventMapper } from 'src/infrastructures/stores/types';
import { SignInModel } from 'src/domains/models/accounts/sign-in-model';
import { resolve } from 'src/use-cases/common/di-container';
import { Resources } from 'src/domains/common/location/resources';
import { Form } from 'src/web/components/forms-controls/form';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { Url } from 'src/infrastructures/routing/url';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { Cell } from 'src/web/components/layout/cell';
import { OutlinedButton } from 'src/web/components/forms-controls/button';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { SideMenuContainer } from '../side-menu/side-menu-container';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { symbols } from 'src/use-cases/common/di-symbols';

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
const mapEventToProps: EventMapper<Events> = () => {
  const { signInAsync } = resolve(symbols.accountsUseCase);
  return {
    signIn: async (model, history, workspaceUrl) => {
      const { workspaces, hasError } = await signInAsync(model);
      if (hasError) {
        return;
      }
      if (workspaceUrl) {
        history.push(Url.workspaceRoot(workspaceUrl));
        return;
      } else if (workspaces && workspaces.length > 0) {
        history.push(Url.workspaceRoot(workspaces[0].workspaceUrl));
        return;
      }
      history.push(Url.root);
    },
  };
};
interface Params {
  workspaceUrl: string;
}
const mapStateToProps: StateMapperWithRouter<StoredState, Props, Params> = (
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
export const SignIn = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
