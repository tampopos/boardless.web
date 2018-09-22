import injectSheet from 'react-jss';
import {
  StyleFactory,
  StyledComponentType,
  StyledProps,
  StylesBase,
  InjectableStyledProps,
} from './types';

export const decorate = <T extends object>(style: T | StyleFactory<T>) => <
  Props = {}
>(
  component: StyledComponentType<T, Props>,
): React.ComponentType<Props> => injectSheet(style)(component);

export const getInjectClasses = <TStyles extends StylesBase>(
  props: InjectableStyledProps<TStyles> & StyledProps<TStyles>,
) => {
  const { classes, injectClasses, className } = props;
  const classesList: Array<Partial<Record<keyof TStyles, string>>> = [classes];
  if (injectClasses) {
    classesList.push(injectClasses);
  }
  if (className) {
    classesList.push({
      root: className,
    } as Partial<Record<keyof TStyles, string>>);
  }
  return mergeClasses(...classesList);
};

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
