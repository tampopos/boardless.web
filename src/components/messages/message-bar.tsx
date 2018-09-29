import * as React from 'react';
import { MessageField } from './message-field';
import { createStyles, Snackbar, IconButton } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Theme } from 'src/common/styles/theme';
import { Message } from 'src/models/message';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { Close } from '@material-ui/icons';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        marginBottom: 5,
      },
    },
    content: {
      color: theme.palette.text.primary,
      background: theme.palette.background.paper,
      display: 'flex',
      flexWrap: 'nowrap',
    },
    contentMessage: {
      overflow: 'hidden',
    },
    contentAction: { paddingLeft: 0 },
    contentButton: {
      height: 'inherit',
    },
    closeIcon: {
      fontSize: theme.typography.title.fontSize,
    },
  });
export interface MessageBarProps {
  onClose?: () => void;
  message: Message;
  anchorOrigin?: SnackbarOrigin;
}
export const MessageBar = decorate(styles)<MessageBarProps>(props => {
  const { onClose, message, anchorOrigin } = props;
  const {
    root,
    content,
    contentMessage,
    contentAction,
    contentButton,
    closeIcon,
  } = getInjectClasses(props);
  return (
    <Snackbar
      className={root}
      ContentProps={{
        className: content,
        classes: {
          message: contentMessage,
          action: contentAction,
        },
      }}
      anchorOrigin={anchorOrigin}
      open={true}
      onClose={(event, reason) => {
        if (reason !== 'clickaway' && onClose) {
          onClose();
        }
      }}
      message={<MessageField message={message} />}
      action={[
        <IconButton
          key="close"
          color="inherit"
          disableRipple={true}
          className={contentButton}
          onClick={onClose}
        >
          <Close className={closeIcon} />
        </IconButton>,
      ]}
    />
  );
});
