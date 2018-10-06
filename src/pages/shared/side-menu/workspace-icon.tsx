import { createStyles, ButtonBase, CircularProgress } from '@material-ui/core';
import { StyledComponentBase } from 'src/common/styles/types';
import { decorate } from 'src/common/styles/styles-helper';
import * as React from 'react';
import { Workspace } from 'src/models/accounts/workspace';

interface Props {
  workspace: Workspace;
}
interface Events {
  onClick: (workspace: Workspace) => void;
  getSrc: (workspace: Workspace) => Promise<string>;
}
interface State {
  src?: string;
}
const styles = createStyles({
  root: {},
  btn: {},
  image: {},
});
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public async componentWillMount() {
    const { getSrc, workspace } = this.props;
    const src = await getSrc(workspace);
    this.setState({ src });
  }
  public render() {
    const { workspace, onClick, classes } = this.props;
    const { name } = workspace;
    const { src } = this.state;
    const { root, btn, image } = classes;
    return (
      <div className={root}>
        <ButtonBase
          className={btn}
          focusRipple={true}
          title={name}
          onClick={() => onClick(workspace)}
        >
          {src ? (
            <img src={src} className={image} />
          ) : (
            <CircularProgress className={image} />
          )}
        </ButtonBase>
      </div>
    );
  }
}
export const WorkspaceIcon = decorate(styles)(Inner);
