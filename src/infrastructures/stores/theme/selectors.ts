import { createMuiTheme } from '@material-ui/core';
import { ThemeState } from './state';
import { Theme } from 'src/infrastructures/styles/theme';

export class ThemeSelectors {
  constructor(private state: ThemeState) {}
  public createTheme = () => {
    return createMuiTheme(this.state as Theme) as Theme;
  };
}
