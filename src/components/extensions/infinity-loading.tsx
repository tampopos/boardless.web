import * as React from 'react';
import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, CircularProgress } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { Row } from 'src/components/layout/row';
import { ThrottleAsync } from 'src/common/throttle';
import { createPropagationProps } from 'src/common/component-helper';

const styles = createStyles({
  root: {
    overflowX: 'auto',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  progressRow: { marginBottom: 30 },
  progress: {},
});
interface Props {
  loadCompleted: boolean;
  loadingInterval?: number;
  height?: number | string;
  next: (init: boolean) => Promise<void>;
  anchorElm: HTMLElement | null;
  getExternalTrigger: (trigger: (init: boolean) => Promise<void>) => void;
}
interface State {
  shouldNext: boolean;
}
class Inner extends StyledComponentBase<typeof styles, Props, State> {
  private nextThrottle: ThrottleAsync<void>;
  constructor(props: any) {
    super(props);
    this.state = { shouldNext: false };
    const { loadingInterval } = this.props;
    this.nextThrottle = new ThrottleAsync(
      () => this.next(false),
      loadingInterval ? loadingInterval : 100,
    );
  }
  public componentDidMount() {
    const { getExternalTrigger } = this.props;
    getExternalTrigger(this.next);
    window.addEventListener('scroll', this.handleOnScroll);
  }
  private handleOnScroll = () => this.nextThrottle.execute();
  private next = async (init: boolean) => {
    const { next } = this.props;
    if (init || this.isShouldNext()) {
      await next(init);
      while (this.isShouldNext()) {
        await next(false);
      }
    }
  };
  private isShouldNext = () => {
    const { anchorElm } = this.props;
    if (!anchorElm) {
      return false;
    }
    const { scrollHeight, scrollTop, offsetHeight } = anchorElm;
    const { loadCompleted } = this.props;
    const maxScroll = scrollHeight - offsetHeight;
    return !loadCompleted && scrollTop >= maxScroll - 50;
  };
  public async componentDidUpdate?(prevProps: Readonly<Props>) {
    if (prevProps && prevProps.anchorElm) {
      return;
    }
    const { anchorElm } = this.props;
    if (!anchorElm) {
      return;
    }
    anchorElm.addEventListener('scroll', this.scrollContainer);
    await this.next(true);
  }
  private scrollContainer = () => {
    this.nextThrottle.execute();
  };
  public componentWillUnmount() {
    const { anchorElm } = this.props;
    if (!anchorElm) {
      return;
    }
    anchorElm.removeEventListener('scroll', this.scrollContainer);
  }
  public render() {
    const { children, loadCompleted, height, classes } = createPropagationProps(
      this.props,
    );
    const { root, progress, progressRow } = classes;
    return (
      <div className={root} style={{ height }}>
        {children}
        {!loadCompleted && (
          <Row className={progressRow}>
            <CircularProgress className={progress} />
          </Row>
        )}
      </div>
    );
  }
}
export const InfinityLoading = decorate(styles)(Inner);
