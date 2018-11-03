import { createMuiTheme } from '@material-ui/core';
import { ThemeState } from './state';
import { Theme } from 'src/common/styles/theme';

export class ThemeSelectors {
  constructor(private state: ThemeState) {}
  public createTheme = () => {
    return createMuiTheme(this.state as Theme) as Theme;
  };
}
