import { getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import * as React from 'react';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { Theme } from 'src/common/styles/theme';
import { createPropagationProps } from 'src/common/component-helper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      borderCollapse: 'collapse',
      display: 'table',
      boxShadow: theme.shadows[0],
    },
  });
interface TableProps {}
export const Table = decorate(styles)<TableProps & DivProps>(props => {
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  return <div className={root} {...pProps} />;
});
Table.defaultProps = {};
