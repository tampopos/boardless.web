import { Styles, WithStyleProps } from '../styles/types';

export interface IComponentHelper {
  createPropagationProps: <TStyles extends Styles, TProps = {}>(
    props: WithStyleProps<TStyles, TProps>,
    ...excludes: Array<keyof TProps>
  ) => {};
}
