import { WithStyleProps } from '../../common/styles/types';
import { getInjectClasses } from '../../common/styles/styles-helper';
import { DivProps } from '../types';
import * as React from 'react';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { resolve } from 'src/common/service-provider';

const styles = createStyles({
  root: {
    width: '100%',
    borderCollapse: 'collapse',
    display: 'table',
  },
});
interface TableProps {}
type Props = WithStyleProps<typeof styles, TableProps & DivProps>;
export const Table = decorate(styles)((props: Props) => {
  const { root } = getInjectClasses(props);
  const pProps = resolve('componentHelper').createPropagationProps(props);
  return <div className={root} {...pProps} />;
});
Table.defaultProps = {};
