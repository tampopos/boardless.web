import {
  WithStyleProps,
  Styles,
  StyledComponent,
  StyledComponentType,
  Classes,
} from './types';
import injectSheet from 'react-jss';

export const decorate = <TStyles extends Styles>(style: TStyles) => <
  TProps = {}
>(
  component: StyledComponent<TStyles, TProps>,
): StyledComponentType<TStyles, TProps> => injectSheet(style)(component);

export const getInjectClasses = <TStyles extends Styles>(
  props: WithStyleProps<TStyles>,
  appendClasses: Classes<TStyles> = {},
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
  classesList.push(appendClasses);
  return mergeClasses(...classesList) as typeof props.classes & {
    root: string;
  };
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
