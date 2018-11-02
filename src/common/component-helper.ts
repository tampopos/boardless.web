import { Styles, WithStyleProps } from './styles/types';
import { getInjectClasses } from './styles/styles-helper';
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const createPropagationProps = <
  TStyles extends Styles,
  TProps extends {}
>(
  props: WithStyleProps<TStyles, TProps>,
): Omit<typeof newObj, 'theme' | 'className'> => {
  const classes = getInjectClasses(props);
  const append = { classes } as any;
  if (props.theme) {
    append.theme = undefined;
  }
  if (props.className) {
    append.className = undefined;
  }
  if (props.injectClasses) {
    append.injectClasses = undefined;
  }
  const newObj = Object.assign({}, props, append as {});
  return newObj;
};
