import * as React from 'react';
import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { History } from 'history';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { Theme } from 'src/common/styles/theme';
import { OutlinedTextBox } from 'src/components/forms-controls/text-box';
import { OutlinedButton } from 'src/components/forms-controls/button';
import { Form } from 'src/components/forms-controls/form';
import { Culture, cultureInfos } from 'src/common/location/culture-infos';
import { RadioGroup } from 'src/components/forms-controls/radio-group';

const styles = (theme: Theme) =>
  createStyles({
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
  name: string;
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
  cultureName: Culture;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      nickName: '',
      email: '',
      password: '',
      confirmPassword: '',
      cultureName: 'ja',
    };
  }
  public handleChange = (key: keyof State) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ [key]: e.currentTarget.value } as Pick<State, typeof key>);
  };
  public handleChangeCulture = (e: {}, culture: Culture) => {
    this.setState({ cultureName: culture });
  };
  public render() {
    const { root, btn } = getInjectClasses(this.props);
    const {
      email,
      password,
      name,
      nickName,
      confirmPassword,
      cultureName,
    } = this.state;
    const { resources } = cultureInfos[cultureName];
    const radioItems = Object.entries(resources.CultureNames).map(x => ({
      value: x[0],
      label: x[1],
    }));
    return (
      <Container className={root}>
        <Row>
          <Typography variant="display1">
            {resources.RegisterNewUser}
          </Typography>
        </Row>
        <Row>
          <Form>
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
                onChange={this.handleChange('name')}
                required={true}
                label={resources.Name}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                value={nickName}
                onChange={this.handleChange('nickName')}
                required={true}
                label={resources.NickName}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="email"
                value={email}
                onChange={this.handleChange('email')}
                required={true}
                label={resources.Email}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="password"
                value={password}
                onChange={this.handleChange('password')}
                required={true}
                label={resources.Password}
              />
            </Row>
            <Row>
              <OutlinedTextBox
                type="password"
                value={confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                required={true}
                label={resources.ConfirmPassword}
              />
            </Row>
            <Row>
              <OutlinedButton type="submit" className={btn}>
                {resources.SignUp}
              </OutlinedButton>
            </Row>
          </Form>
        </Row>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const SignUp = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
