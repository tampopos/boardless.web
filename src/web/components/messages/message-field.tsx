import * as React from 'react';
import { Theme } from 'src/infrastructures/styles/theme';
import { Message } from 'src/domains/models/common/message';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createStyles, Typography } from '@material-ui/core';
import { Info, Warning, Error } from '@material-ui/icons';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    text: {
      wordWrap: 'break-word',
      overflow: 'hidden',
    },
    infoIcon: { color: theme.shared.messages.info.color },
    warningIcon: { color: theme.shared.messages.warning.color },
    errorIcon: { color: theme.shared.messages.error.color },
  });
export interface MessageFieldProps {
  message: Message;
}
export const MessageField = decorate(styles)<MessageFieldProps>(props => {
  const { message, classes } = createPropagationProps(props);
  const { root, text } = classes;
  return (
    <div className={root}>
      <Typography className={classes[message.level + 'Icon']}>
        {(() => {
          switch (message.level) {
            case 'info':
              return <Info />;
            case 'warning':
              return <Warning />;
            case 'error':
              return <Error />;
          }
          return '';
        })()}
      </Typography>
      <Typography variant="caption" className={text}>
        {message.text}
      </Typography>
    </div>
  );
});
