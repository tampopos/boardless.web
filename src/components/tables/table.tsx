import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import { ComponentHelper } from '../../common/component-helper';
import * as React from 'react';
import { createStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
  root: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
  },
});
interface TableProps {}
type Props = WithStyleProps<typeof styles, TableProps & DivProps>;
export const Table = withStyles(styles)((props: Props) => {
  const { root } = getInjectClasses(props);
  const pProps = ComponentHelper.createPropagationProps(props);
  return <div className={root} {...pProps} />;
});
Table.defaultProps = {};
