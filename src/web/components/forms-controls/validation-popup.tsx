import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  Checkbox,
  Paper,
  Typography,
  FormControlLabel,
  createStyles,
} from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { ValidationMessageContent } from 'src/domains/models/validation/validation-message';
import { Popup, PopupProps } from '../layout/popup';

const styles = createStyles({
  root: {
    padding: 10,
    marginBottom: 20,
  },
});
interface Props {
  popupProps: PopupProps;
  validationMessages: ValidationMessageContent[];
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { classes, validationMessages, popupProps } = createPropagationProps(
    props,
  );
  const { root } = classes;
  return (
    <Popup {...popupProps}>
      <Paper className={root}>
        {validationMessages.map(({ text, state }, i) => {
          if (state === 'description') {
            return <Typography key={i}>{text}</Typography>;
          }
          return (
            <div key={i}>
              <FormControlLabel
                control={<Checkbox checked={state === 'valid'} />}
                label={text}
              />
            </div>
          );
        })}
      </Paper>
    </Popup>
  );
};
export const ValidationPopup = decorate(styles)(Inner);
