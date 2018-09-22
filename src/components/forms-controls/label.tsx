import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { decorate, getInjectClasses } from '../../common/styles/styles-helper';
import { BaseLabelProps } from '../types';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { Theme } from '../../common/styles/theme';

interface Styles extends StylesBase {}
const styles = (theme: Theme): Styles => ({
  root: {
    padding: [0, 20],
    width: '100%',
    fontWeight: theme.shared.fontWeight.bold,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
});
interface LabelProps extends InjectableStyledProps<Styles> {}
export const Label = decorate(styles)<LabelProps & BaseLabelProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props);
  return <label className={root} {...pProps} />;
});
Label.defaultProps = {};
