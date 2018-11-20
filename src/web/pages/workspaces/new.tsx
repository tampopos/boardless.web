import { createStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { History } from 'history';
import { parse } from 'query-string';
import { TextBox } from '../../components/forms-controls/text-box';
import { NewWorkspaceModel } from 'src/domains/models/workspaces/new-workspace-model';
import { Form } from '../../components/forms-controls/form';
import { Claim } from 'src/domains/models/accounts/claim';
import { Resources } from 'src/domains/common/location/resources';
import { Workspace } from 'src/domains/models/accounts/workspace';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { EventMapper } from 'src/infrastructures/stores/types';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { Row } from 'src/web/components/layout/row';
import { OutlinedButton } from 'src/web/components/forms-controls/button';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { Theme } from 'src/infrastructures/styles/theme';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { resolve } from 'src/use-cases/common/di-container';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { symbols } from 'src/use-cases/common/di-symbols';
import { Container } from 'src/web/components/layout/container';
import { Url } from 'src/infrastructures/routing/url';

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

const mapStateToProps: StateMapperWithRouter<StoredState, Props, Params> = (
  { accounts, workspaces },
  { history, location },
) => {
  const { claims } = accounts;
  const { joinableWorkspaces } = workspaces;
  const { resources } = new AccountsSelectors(accounts);
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

const mapEventToProps: EventMapper<Events> = () => {
  const { addWorkspaceAsync } = resolve(symbols.workspaceUseCase);
  return {
    addWorkspace: async (state, history) => {
      const workspace = await addWorkspaceAsync(state);
      history.push(Url.workspaceRoot(workspace.workspaceUrl));
    },
  };
};

interface State {
  model: NewWorkspaceModel;
}

class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      model: { name: '', url: '' },
    };
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { model } = this.state;
    const { name, value } = e.currentTarget;
    this.setState({ model: { ...model, [name]: value } });
  };

  public render() {
    const { classes, resources, history, addWorkspace } = this.props;
    const { form, root, container } = classes;
    const { name, url } = this.state.model;

    return (
      <div className={root} ref={e => e}>
        <Container className={container}>
          <Row>
            <Typography variant="h4">{resources.AddNewWorkspace}</Typography>
          </Row>
          <Form
            className={form}
            onSubmit={() => addWorkspace(this.state.model, history)}
          >
            <Row>
              <TextBox
                name="name"
                label={resources.WorkspaceName}
                value={name}
                onChange={this.handleChange}
              />
            </Row>
            <Row>
              <TextBox
                name="url"
                label={resources.WorkspaceUrl}
                value={url}
                onChange={this.handleChange}
              />
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
  mapEventToProps,
)(StyledInner);
