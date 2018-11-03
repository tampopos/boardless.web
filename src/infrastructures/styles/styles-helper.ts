import {
  Styles,
  StyledComponent,
  StyledComponentType,
  WithStyleProps,
} from './types';
import injectSheet from 'react-jss';
import { Omit } from '../common/types';

export const decorate = <TStyles extends Styles>(style: TStyles) => <
  TProps = {}
>(
  component: StyledComponent<TStyles, TProps>,
): StyledComponentType<TStyles, TProps> => injectSheet(style)(component);

export const mergeClasses = <TStyles>(
  ...classesList: Array<Partial<Record<keyof TStyles, string>>>
) => {
  const copy = {} as Record<keyof TStyles, string>;
  classesList.filter(c => c).forEach(c => {
    Object.keys(c)
      .filter(key => c[key])
      .forEach(key => {
        if (copy[key]) {
          copy[key] += ' ' + c[key];
        } else {
          copy[key] = c[key];
        }
      });
  });
  return copy;
};

export const appendClassName = (...classNames: Array<string | undefined>) =>
  classNames.filter(x => x).join(' ');
export const getInjectClasses = <TStyles extends Styles>(
  props: WithStyleProps<TStyles>,
) => {
  const { classes, injectClasses, className } = props;
  const classesList: Array<{}> = [classes];
  if (injectClasses) {
    classesList.push(injectClasses);
  }
  if (className) {
    classesList.push({
      root: className,
    });
  }
  return mergeClasses(...classesList) as typeof props.classes & {
    root: string;
  };
};
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
