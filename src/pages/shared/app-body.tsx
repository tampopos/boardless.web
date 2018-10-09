import * as React from 'react';
import { AppRouter } from './app-router';
import { AppMessages } from './app-message';

export const AppBody: React.SFC = () => {
  return (
    <React.Fragment>
      <AppMessages />
      <AppRouter />
    </React.Fragment>
  );
};
