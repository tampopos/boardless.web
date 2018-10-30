import * as React from 'react';
import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, Popper } from '@material-ui/core';
import { DispatchMapper, StateMapperWithRouter } from 'src/stores/types';
import {
  decorate,
  getInjectClasses,
  appendClassName,
} from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { Theme } from 'src/common/styles/theme';
import { PopperProps } from '@material-ui/core/Popper';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    popper: {},
  });
interface Props {
  anchorEl?: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
  popperProps: Partial<PopperProps>;
}
interface Param {}
interface OwnProps {
  anchorEl?: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
  popperProps?: Partial<PopperProps>;
}
const mapStateToProps: StateMapperWithRouter<Props, Param, OwnProps> = (
  {},
  { anchorEl, popperProps },
) => {
  return { anchorEl, popperProps: popperProps ? popperProps : {} };
};
interface Events {}
const mapDispatchToProps: DispatchMapper<Events, OwnProps> = dispatch => {
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
    const { popperProps, children } = this.props;
    const { anchorEl1, anchorEl2 } = this.state;
    const { root, popper } = getInjectClasses(this.props);
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
export const Popup = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  StyledInner,
);
