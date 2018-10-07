import { withRouter, RouteComponentProps } from 'react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoredState } from 'src/stores/stored-state';

const Inner = ({
  match,
  location,
  x,
}: RouteComponentProps<{ workspaceId: string }> & { x: string }) => {
  const { workspaceId } = match.params;
  return <div>{workspaceId + location.pathname + x}</div>;
};
const ConnectedInner = connect(
  (
    { themeState }: StoredState,
    { match, location }: RouteComponentProps<{ workspaceId: string }>,
  ) => ({ match, location, x: themeState.shared.messages.error.color }),
)(Inner);
export const Xxx = withRouter(ConnectedInner);
