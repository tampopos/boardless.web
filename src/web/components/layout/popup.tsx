import * as React from 'react';
import { createStyles, Popper } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import {
  decorate,
  createPropagationProps,
  appendClassName,
} from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { EventMapper } from 'src/infrastructures/stores/types';

const styles = createStyles({
  root: {},
  popper: {},
});
interface Props {
  anchorEl?: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
  popperProps: Partial<PopperProps>;
}
interface Param {}
export interface PopupProps {
  anchorEl?: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
  popperProps?: Partial<PopperProps>;
}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  PopupProps
> = ({}, { anchorEl, popperProps }) => {
  return { anchorEl, popperProps: popperProps ? popperProps : {} };
};
interface Events {}
const mapEventToProps: EventMapper<Events, PopupProps> = () => {
  return {};
};
interface State {
  anchorEl1?: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
  anchorEl2?: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public componentDidMount() {
    const { anchorEl } = this.props;
    this.setState({ anchorEl1: anchorEl });
  }
  public componentDidUpdate(prevProps: Readonly<Props>) {
    const { anchorEl } = this.props;
    if (!anchorEl && prevProps && prevProps.anchorEl) {
      this.handleClose();
      return;
    }
    if (
      anchorEl &&
      prevProps &&
      (!prevProps.anchorEl || prevProps.anchorEl !== anchorEl)
    ) {
      const { anchorEl1 } = this.state;
      this.setState({
        anchorEl1: anchorEl1 ? null : anchorEl,
        anchorEl2: anchorEl1 ? anchorEl : null,
      });
      return;
    }
  }
  private handleClose = () => {
    this.setState({ anchorEl1: null, anchorEl2: null });
  };
  public render() {
    const { popperProps, children, classes } = createPropagationProps(
      this.props,
    );
    const { anchorEl1, anchorEl2 } = this.state;
    const { root, popper } = classes;
    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);
    const appendedPopper = appendClassName(popper, popperProps.className);
    return (
      <div className={root}>
        <Popper
          {...popperProps}
          open={open1}
          className={appendedPopper}
          anchorEl={anchorEl1}
          transition={true}
        >
          {open1 && children}
        </Popper>
        <Popper
          {...popperProps}
          open={open2}
          className={appendedPopper}
          anchorEl={anchorEl2}
        >
          {open2 && children}
        </Popper>
      </div>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const Popup = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
