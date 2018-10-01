import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { OutlinedTextBox } from 'src/components/forms-controls/text-box';
import { connect } from 'react-redux';
import { DispatchMapper, StateMapper } from 'src/stores/types';
import { authenticateActionCreators } from 'src/stores/authenticate/authenticate-reducer';
import { SignInModel } from 'src/models/authenticate/sign-in-model';
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
import { WorkSpace } from 'src/models/authenticate/work-space';
import { Claim } from 'src/models/authenticate/claim';
import { SideMenuContainer } from './side-menu-container';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { Cell } from 'src/components/layout/cell';
import { OutlinedButton } from 'src/components/forms-controls/button';

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
  workSpaces: { [index: string]: WorkSpace };
  claims: { [index: string]: Claim };
}
interface Events {
  signIn: (state: SignInModel, history: History, workSpaceId?: string) => void;
}
interface State {
  model: SignInModel;
}
class Inner extends StyledComponentBase<
  typeof styles,
  Props & Events & RouteComponentProps<{ workSpaceId: string }>,
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      model: { email: this.getDefaultEmail(), password: '' },
    };
  }
  private getDefaultEmail = () => {
    const { match, workSpaces, claims, history } = this.props;
    const { workSpaceId } = match.params;
    if (!workSpaceId) {
      return '';
    }
    const workSpace = workSpaces[workSpaceId];
    if (!workSpace) {
      history.push(Url.root);
      return '';
    }
    const claim = claims[workSpace.userId];
    if (!claim) {
      history.push(Url.root);
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
    const { signIn, resources, history, match, classes } = this.props;
    const { workSpaceId } = match.params;
    const { email, password } = this.state.model;
    const { form, row, container, root } = classes;
    return (
      <SideMenuContainer>
        <div className={root}>
          <Typography variant="display1">{resources.SignIn}</Typography>
          <Form
            onSubmit={() => signIn(this.state.model, history, workSpaceId)}
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
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    signIn: async (model, history, workSpaceId) => {
      const authenticateService = resolve('authenticateService');
      const errors = authenticateService.validate(model);
      const writeMessages = (e: string[]) => {
        if (!e || e.length === 0) {
          return false;
        }
        e.forEach(error => {
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
      dispatch(authenticateActionCreators.signIn({ result: res.result }));
      if (workSpaceId) {
        history.push(Url.workSpaceRoot(workSpaceId));
        return;
      }
      history.push(Url.root);
    },
  };
};
const mapStateToProps: StateMapper<Props> = ({
  locationState,
  authenticateState,
}) => {
  const { workSpaces, claims } = authenticateState;
  const { resources } = getCultureInfo(locationState.cultureName);
  return {
    resources,
    workSpaces,
    claims,
  };
};
const StyledInner = decorate(styles)(Inner);
const RoutingInner = withRouter(StyledInner);
export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutingInner);
