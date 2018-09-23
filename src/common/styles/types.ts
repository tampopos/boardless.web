import * as React from 'react';
import { StyleRules, WithStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export type StyledComponentClass<
  TStyles extends Styles,
  TProps = {}
> = React.Component<WithStyleProps<TStyles, TProps>>;
export type StyledSFC<TStyles extends Styles, TProps = {}> = React.SFC<
  WithStyleProps<TStyles, TProps>
>;
export type StyledComponent<TStyles extends Styles, TProps = {}> =
  | StyledComponentClass<TStyles, TProps>
  | StyledSFC<TStyles, TProps>;

export type Styles = string | StyleRules | StyleRulesCallback;
export interface InjectableStylesProps<T extends Styles> {
  className?: string;
  injectClasses?: ClassNameMap<
    T extends string
      ? T
      : T extends StyleRulesCallback<infer K>
        ? K
        : T extends StyleRules<infer L> ? L : never
  >;
}
export type WithStyleProps<TStyles extends Styles, TProps = {}> = WithStyles<
  TStyles
> &
  InjectableStylesProps<TStyles> &
  TProps &
  React.Props<{}>;
