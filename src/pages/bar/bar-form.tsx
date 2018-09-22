import * as React from 'react';
import { StylesBase, InjectableStyledProps } from '../../common/styles/types';
import { Theme, Colors, colors } from '../../common/styles/theme';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from '../../common/styles/styles-helper';
import { ComponentHelper } from '../../common/component-helper';
import { ObjectHelper } from 'src/common/object-helper';
import { Container, ContainerProps } from 'src/components/layout/container';

interface Styles extends StylesBase, Record<keyof Colors, {}> {}
const styles = (theme: Theme): Styles => ({
  root: {
    padding: [10, 20],
    borderWidth: theme.shared.borderWidth.thick,
    borderStyle: 'solid',
    borderRadius: 15,
  },
  ...ObjectHelper.mapObject(colors, color => ({
    color: color['500'],
    borderColor: color['500'],
  })),
});
interface FormProps extends InjectableStyledProps<Styles> {
  themeColor?: keyof Colors;
}
export const BarForm = decorate(styles)<FormProps & ContainerProps>(props => {
  const { themeColor } = props;
  const classes = getInjectClasses(props);
  const { root } = classes;
  const pProps = ComponentHelper.createPropagationProps(props, 'themeColor');
  return (
    <Container
      container={true}
      {...pProps}
      className={appendClassName(root, themeColor ? classes[themeColor] : '')}
    />
  );
});
