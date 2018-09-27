import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Bar } from '../bar';

export namespace Url {
  export const root = '/';
  export const help = '/help';
}
export const AppRouter: React.SFC = props => {
  return (
    <Switch>
      <Route exact={true} path={Url.root} component={Bar} />
      <Redirect to={Url.root} />
    </Switch>
  );
};
