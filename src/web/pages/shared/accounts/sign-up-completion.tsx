import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Messages } from 'src/domains/common/location/messages';

const styles = createStyles({
  root: {
    padding: 20,
    maxWidth: 650,
    margin: 'auto',
    paddingBottom: 200,
  },
  text: {
    width: '100%',
  },
});
interface Props {
  messages: Messages;
  history: History;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history }) => {
  const { messages } = new AccountsSelectors(accounts);
  return { messages, history };
};
interface Events {}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { messages, classes } = createPropagationProps(props);
  const { root, text } = classes;
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h4" align="center" className={text}>
          {messages.sendWelcomeMail}
        </Typography>
      </Row>
      <Row>
        <Typography align="center" className={text}>
          {messages.toCompleteSignUp}
        </Typography>
      </Row>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const SignUpCompletion = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
