import * as React from 'react';
import { DispatchMapper, StateMapper } from '../../stores/types';
import { connect } from 'react-redux';
import { decorate } from '../../common/styles/styles-helper';
import { StylesBase } from '../../common/styles/types';
import Friend from '../../models/friend';
import { getSexName, createEmptyFriend } from '../../services/friend-service';
import { Table } from '../../components/tables/table';
import { TableRow } from '../../components/tables/table-row';
import { TableCell } from '../../components/tables/table-cell';
import { Row } from '../../components/forms-controls/row';
import { Cell } from '../../components/forms-controls/cell';
import { Button } from '../../components/forms-controls/button';
import { barFormActionCreators } from '../../stores/bar/bar-form-reducer';

interface Styles extends StylesBase {
  header: any;
}
const styles = (): Styles => ({
  root: {},
  header: {
    margin: 0,
  },
});
interface Events {
  toAddMode: () => void;
  selectRow: (friend: Friend) => void;
}
interface Props {
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
const mapStateToProps: StateMapper<Props> = ({
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
const decoratedComponent = decorate(styles)<Props & Events>(props => {
  const { friends, toAddMode, selectRow, friend, classes } = props;
  const getThemeType = (frnd: Friend) =>
    frnd.sex === 'male' ? 'blue' : frnd.sex === 'female' ? 'red' : 'mono';
  const { header } = classes;
  return (
    <div className="list">
      <Row>
        <h3 className={header}>めいぼ</h3>
      </Row>
      <Row>
        <Cell size={2}>
          <Button onClick={() => toAddMode()}>なかまをくわえる</Button>
        </Cell>
      </Row>
      <Row>
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
              <TableCell themeType={getThemeType(f)}>{f.name}</TableCell>
              <TableCell themeType={getThemeType(f)}>{f.job}</TableCell>
              <TableCell themeType={getThemeType(f)}>
                {getSexName(f.sex)}
              </TableCell>
              <TableCell themeType={getThemeType(f)}>{f.personality}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Row>
    </div>
  );
});

export const BarList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(decoratedComponent);
