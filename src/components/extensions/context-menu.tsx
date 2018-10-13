import * as React from 'react';
import { StyledSFC } from 'src/common/styles/types';
import { createStyles, Popover } from '@material-ui/core';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';
import { PopoverProps } from '@material-ui/core/Popover';

const styles = createStyles({
  root: {},
});
interface Props {}
interface Events {}
const Inner: StyledSFC<
  typeof styles,
  Props & PopoverProps & Events
> = props => {
  const { anchorEl } = props;
  const { root } = getInjectClasses(props);
  const pProps = createPropagationProps(props);
  const open = Boolean(anchorEl);
  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      {...pProps}
      className={root}
    />
  );
};
export const ContextMenu = decorate(styles)(Inner);
