import * as React from 'react';
import { DispatchMapper, StateMapper } from '../../stores/types';
import Friend, { createEmptyFriend } from '../../models/bar/friend';
import { getSexName } from '../../services/friend-service';
import { Table } from '../../components/tables/table';
import { TableRow } from '../../components/tables/table-row';
import { TableCell } from '../../components/tables/table-cell';
import { Row } from '../../components/layout/row';
import { Cell } from '../../components/layout/cell';
import { OutlinedButton } from '../../components/forms-controls/button';
import { barFormActionCreators } from '../../stores/bar/bar-form-reducer';
import { Container } from 'src/components/layout/container';
import { Typography, createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';

const styles = createStyles({
  root: {},
  row: {
    paddingBottom: 10,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});
interface Events {
  toAddMode: () => void;
  selectRow: (friend: Friend) => void;
}
interface BarListProps {
  friend: Friend;
  friends: Friend[];
}
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    toAddMode: () => {
      return dispatch(
        barFormActionCreators.setFriend({ friend: createEmptyFriend() }),
      );
    },
    selectRow: friend => {
      return dispatch(barFormActionCreators.setFriend({ friend }));
    },
  };
};
const mapStateToProps: StateMapper<BarListProps> = ({
  barListState,
  barFormState,
}) => {
  const friends = barListState.friends;
  const friend = barFormState.friend;
  return {
    friends,
    friend,
  };
};
const decoratedComponent = decorate(styles)<BarListProps & Events>(props => {
  const { friends, toAddMode, selectRow, friend, classes } = props;
  const getThemeColor = ({ sex }: Friend) =>
    sex === 'male' ? 'indigo' : sex === 'female' ? 'pink' : undefined;
  const { root, row } = classes;
  return (
    <Container className={root}>
      <Row className={row}>
        <Typography variant="headline">めいぼ</Typography>
      </Row>
      <Row className={row}>
        <Cell xs={2}>
          <OutlinedButton onClick={() => toAddMode()}>
            なかまをくわえる
          </OutlinedButton>
        </Cell>
      </Row>
      <Row className={row}>
        <Table>
          <TableRow>
            <TableCell isHeader={true}>なまえ</TableCell>
            <TableCell isHeader={true}>しょくぎょう</TableCell>
            <TableCell isHeader={true}>せいべつ</TableCell>
            <TableCell isHeader={true}>せいかく</TableCell>
          </TableRow>
          {friends.map(f => (
            <TableRow
              key={f.id}
              onClick={() => selectRow(f)}
              selectable={true}
              selected={f.id === friend.id}
            >
              <TableCell themeColor={getThemeColor(f)}>{f.name}</TableCell>
              <TableCell themeColor={getThemeColor(f)}>{f.job}</TableCell>
              <TableCell themeColor={getThemeColor(f)}>
                {getSexName(f.sex)}
              </TableCell>
              <TableCell themeColor={getThemeColor(f)}>
                {f.personality}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Row>
    </Container>
  );
});

export const BarList = withConnectedRouter(mapStateToProps, mapDispatchToProps)(
  decoratedComponent,
);
