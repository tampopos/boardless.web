import * as React from 'react';
import { Theme, Colors, colors } from '../../common/styles/theme';
import { appendClassName } from '../../common/styles/styles-helper';
import { Container, ContainerProps } from 'src/components/layout/container';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { createPropagationProps } from 'src/common/component-helper';
import { mapObject } from 'src/common/object-helper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderWidth: theme.shared.borderWidth.thick,
      borderStyle: 'solid',
      borderRadius: 15,
    },
    ...mapObject(colors, color => ({
      color: theme.palette.type === 'light' ? color['600'] : color['400'],
      borderColor: theme.palette.type === 'light' ? color['400'] : color['600'],
    })),
  });
interface BarFormProps {
  themeColor?: keyof Colors;
}
export const BarForm = decorate(styles)<BarFormProps & ContainerProps>(
  props => {
    const { themeColor, classes, ...others } = createPropagationProps(props);
    const { root } = classes;
    return (
      <Container
        container={true}
        {...others}
        className={appendClassName(root, themeColor ? classes[themeColor] : '')}
      />
    );
  },
);
