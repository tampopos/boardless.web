import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import { Resources } from 'src/common/location/resources';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { History } from 'history';
import { Workspace } from 'src/models/accounts/workspace';
import { Claim } from 'src/models/accounts/claim';
import { AccountsGetters } from 'src/stores/accounts/accounts-state';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { resolve } from 'src/services/common/service-provider';
import { parse } from 'query-string';
import { Theme } from 'src/common/styles/theme';
import { TextBox } from '../../components/forms-controls/text-box';
import { OutlinedButton } from 'src/components/forms-controls/button';
import { NewWorkspaceModel } from 'src/models/workspaces/new-workspace-model';
import { Form } from '../../components/forms-controls/form';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
      overflowX: 'auto',
    },
    container: {},
    actionButtonRow: {
      justifyContent: 'center',
      marginTop: 25,
      marginBottom: 25,
    },
    form: {
      paddingTop: 20,
    },
  });

interface Props {
  claims: { [index: string]: Claim };
  resources: Resources;
  history: History;
  joinableWorkspaces: { [index: string]: Workspace };
  searchKeyword?: string;
  fetchCount: number;
}

interface Params {
  workspaceUrl: string;
}

const mapStateToProps: StateMapperWithRouter<Props, Params> = (
  { accountsState, workspacesState },
  { history, location },
) => {
  const { claims } = accountsState;
  const { joinableWorkspaces } = workspacesState;
  const { resources } = new AccountsGetters(accountsState);
  const { searchKeyword } = parse(location.search);

  return {
    claims,
    resources,
    history,
    joinableWorkspaces,
    searchKeyword: searchKeyword ? searchKeyword.toString() : undefined,
    fetchCount: 50,
  };
};

interface Events {
  addWorkspace: (state: NewWorkspaceModel, history: History) => void;
}

const mapDispatchToProps: DispatchMapper<Events> = () => {
  const { addWorkspace } = resolve('workspaceService');
  return { addWorkspace };
};

interface State {
  model: NewWorkspaceModel;
}

class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      model: { name: 'aaaaa' },
    };
  }

  private add = (history: History) => {
    const { addWorkspace } = this.props;
    addWorkspace(this.state.model, history);
  };

  public render() {
    const { classes, resources, history } = this.props;
    const { form, root, container } = classes;
    const { name } = this.state.model;

    return (
      <div className={root} ref={e => e}>
        <Container className={container}>
          <Row>
            <Typography variant="display1">
              {resources.AddNewWorkspace}
            </Typography>
          </Row>
          <Form className={form} onSubmit={() => this.add(history)}>
            <Row>
              <TextBox value={name} />
            </Row>
            <Row>
              <OutlinedButton type="submit">{resources.Add}</OutlinedButton>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

const StyledInner = decorate(styles)(Inner);

export const WorkspaceNew = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(StyledInner);
