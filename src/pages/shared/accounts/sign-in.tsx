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
import { Workspace } from 'src/models/accounts/workspace';
import { Claim } from 'src/models/accounts/claim';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { Cell } from 'src/components/layout/cell';
import { OutlinedButton } from 'src/components/forms-controls/button';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { SideMenuContainer } from '../side-menu/side-menu-container';

const styles = createStyles({
  root: {
    padding: 50,
    width: 500,
    minWidth: 500,
    margin: 'auto',
    paddingBottom: 200,
    alignSelf: 'center',
  },
  form: {
    paddingTop: 20,
  },
  container: {},
  row: {
    paddingBottom: 10,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});
interface Props {
  resources: Resources;
  workspaces: { [index: string]: Workspace };
  claims: { [index: string]: Claim };
  workspaceId: string;
  pathname: string;
  history: History;
}
interface Events {
  signIn: (state: SignInModel, history: History, workspaceId?: string) => void;
}
interface State {
  model: SignInModel;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      model: { email: this.getDefaultEmail(), password: '' },
    };
  }
  private getDefaultEmail = () => {
    const { workspaceId, workspaces, claims } = this.props;
    if (!workspaceId) {
      return '';
    }
    const workspace = workspaces[workspaceId];
    if (!workspace) {
      return '';
    }
    const claim = claims[workspace.userId];
    if (!claim) {
      return '';
    }
    return claim.email;
  };
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
    const {
      signIn,
      resources,
      history,
      workspaceId,
      classes,
      workspaces,
      claims,
      pathname,
    } = this.props;
    const workspace = workspaces[workspaceId];
    const existsClaim = workspace && claims[workspace.id];
    if (!existsClaim && pathname !== Url.root) {
      history.push(Url.root);
    }
    const { email, password } = this.state.model;
    const { form, row, container, root } = classes;
    return (
      <SideMenuContainer>
        <div className={root}>
          <Typography variant="display1">{resources.SignIn}</Typography>
          <Form
            onSubmit={() => signIn(this.state.model, history, workspaceId)}
            className={form}
          >
            <Container className={container}>
              <Row className={row}>
                <OutlinedTextBox
                  value={email}
                  type="email"
                  onChange={this.onChange('email')}
                  label={resources.Email}
                />
              </Row>
              <Row className={row}>
                <OutlinedTextBox
                  label={resources.Password}
                  value={password}
                  type="password"
                  onChange={this.onChange('password')}
                />
              </Row>
              <Row className={row}>
                <Cell xs={8} />
                <Cell xs={4}>
                  <OutlinedButton type="submit">
                    {resources.SignIn}
                  </OutlinedButton>
                </Cell>
              </Row>
            </Container>
          </Form>
        </div>
      </SideMenuContainer>
    );
  }
}
const mapDispatchToProps: DispatchMapper<Events> = () => {
  return {
    signIn: async (model, history, workspaceId) => {
      const accountsService = resolve('accountsService');
      if (!(await accountsService.validate(model))) {
        return;
      }
      await accountsService.signInAsync(model, history, workspaceId);
    },
  };
};
const mapStateToProps: StateMapperWithRouter<Props, { workspaceId: string }> = (
  { accountsState },
  { match, history, location },
) => {
  const { workspaces, claims } = accountsState;
  const { workspaceId } = match.params;
  const { resources } = new AccountsGetters(accountsState);
  const { pathname } = location;
  return { workspaces, claims, resources, workspaceId, history, pathname };
};
const StyledInner = decorate(styles)(Inner);
export const SignIn = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
