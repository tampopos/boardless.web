import * as React from 'react';
import { StyledComponentBase } from 'src/common/styles/types';
import { createStyles, CircularProgress } from '@material-ui/core';
import { decorate, getInjectClasses } from 'src/common/styles/styles-helper';
import { Row } from 'src/components/layout/row';
import { ThrottleAsync } from 'src/common/throttle';

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
  anchorElm?: HTMLElement;
}
interface State {}
class Inner extends StyledComponentBase<typeof styles, Props, State> {
  private rootNode: HTMLDivElement | null;
  private get anchor() {
    const { anchorElm } = this.props;
    if (anchorElm) {
      return anchorElm;
    }
    return this.rootNode;
  }
  constructor(props: any) {
    super(props);
    this.state = {};
    const { loadingInterval } = this.props;
    this.nextThrottle = new ThrottleAsync(
      () => this.next(false),
      loadingInterval ? loadingInterval : 100,
    );
  }
  public async componentDidMount() {
    await this.init();
  }
  private init = async () => {
    await this.next(true);
    let val = true;
    while (val) {
      val = await this.next(false);
    }
  };
  private next = async (init: boolean) => {
    if (!this.anchor) {
      return false;
    }
    const { next } = this.props;
    const { scrollHeight, scrollTop, offsetHeight } = this.anchor;
    const { loadCompleted } = this.props;
    const maxScroll = scrollHeight - offsetHeight;
    if (!loadCompleted && scrollTop >= maxScroll) {
      await next(init);
      return true;
    }
    return false;
  };
  private nextThrottle: ThrottleAsync<boolean>;
  public scrollContainer() {
    this.nextThrottle.execute();
  }
  public async componentDidUpdate?(prevProps: Readonly<Props>) {
    const { loadCompleted } = this.props;
    if (!prevProps || (prevProps.loadCompleted && !loadCompleted)) {
      await this.init();
    }
  }
  public render() {
    const { children, loadCompleted, height } = this.props;
    const { root, progress, progressRow } = getInjectClasses(this.props);
    return (
      <div
        className={root}
        onScroll={e => this.scrollContainer()}
        style={{ height }}
        ref={e => (this.rootNode = e)}
      >
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
