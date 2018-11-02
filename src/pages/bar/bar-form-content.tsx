import * as React from 'react';
import { DispatchMapper, StateMapperWithRouter } from '../../stores/types';
import Friend, { createEmptyFriend } from '../../models/bar/friend';
import { createNewFriend } from '../../services/friend-service';
import { BarForm } from './bar-form';
import { Row } from '../../components/layout/row';
import { Cell } from '../../components/layout/cell';
import { OutlinedButton } from '../../components/forms-controls/button';
import { Table } from '../../components/tables/table';
import { TableRow } from '../../components/tables/table-row';
import { TableCell } from '../../components/tables/table-cell';
import { TextBox } from '../../components/forms-controls/text-box';
import { Select } from '../../components/forms-controls/select';
import { barListActionCreators } from '../../stores/bar/bar-list-reducer';
import { barFormActionCreators } from '../../stores/bar/bar-form-reducer';
import { Colors } from '../../common/styles/theme';
import { Typography, createStyles } from '@material-ui/core';
import { MenuItemProps } from '@material-ui/core/MenuItem';
import { Container } from 'src/components/layout/container';
import { RadioGroup } from 'src/components/forms-controls/radio-group';
import { decorate } from 'src/common/styles/styles-helper';
import { withConnectedRouter } from 'src/common/routing/routing-helper';
import { RoutingProps } from 'src/common/routing/types';

const styles = createStyles({
  root: {},
  cell: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
interface Events {
  add: (friend: Friend, friends: Friend[]) => Promise<any>;
  remove: (id: number) => any;
  changeFriend: <TKey extends keyof Friend>(
    name: TKey,
    value: Friend[TKey],
  ) => void;
}
interface BarFormContentProps {
  friend: Friend;
  friends: Friend[];
  isAddMode: boolean;
  isValid: boolean;
  title: string;
  buttonLabel: string;
  color?: keyof Colors;
}
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    add: async (friend, friends) => {
      const newFriend = await createNewFriend(friends, friend);
      dispatch(barListActionCreators.add({ friend: newFriend }));
      return dispatch(barFormActionCreators.setFriend({ friend: newFriend }));
    },
    remove: id => {
      dispatch(barListActionCreators.remove({ id }));
      return dispatch(
        barFormActionCreators.setFriend({ friend: createEmptyFriend() }),
      );
    },
    changeFriend: (key, value) => {
      dispatch(barFormActionCreators.setValue({ friend: { [key]: value } }));
    },
  };
};
const mapStateToProps: StateMapperWithRouter<BarFormContentProps> = ({
  barFormState,
  barListState,
}) => {
  const friend = barFormState.friend;
  const friends = barListState.friends;
  const isAddMode = friend.id < 0;
  const isValid = Boolean(friend.name && friend.sex && friend.job);
  const title = isAddMode ? 'あたらしいなかま' : 'ステータス';
  const buttonLabel = isAddMode ? 'なかまにする' : 'くびにする';
  const color =
    friend.sex === 'male'
      ? 'indigo'
      : friend.sex === 'female'
        ? 'pink'
        : undefined;

  return {
    friend,
    friends,
    isAddMode,
    title,
    isValid,
    buttonLabel,
    color,
  };
};
const jobs = [
  '',
  'せんし',
  'ぶとうか',
  'まほうつかい',
  'そうりょ',
  'しょうにん',
  'あそびにん',
].map(x => ({ key: x, value: x, children: x } as MenuItemProps));

const decoratedComponent = decorate(styles)<
  RoutingProps<BarFormContentProps & Events>
>(props => {
  const {
    remove,
    add,
    friend,
    friends,
    title,
    isAddMode,
    changeFriend,
    isValid,
    buttonLabel,
    color,
    classes,
  } = props;
  const { cell } = classes;
  return (
    <Container>
      <BarForm themeColor={color}>
        <Row>
          <Typography variant="headline">{title}</Typography>
        </Row>
        <Row>
          <Cell xs={6} className={cell}>
            <TextBox
              themeColor={color}
              maxLength={4}
              InputProps={{ readOnly: !isAddMode }}
              value={friend.name}
              label="なまえ"
              onChange={e => changeFriend('name', e.target.value)}
            />
          </Cell>
          <Cell xs={6} className={cell}>
            {isAddMode ? (
              <Select
                label="しょくぎょう"
                themeColor={color}
                value={friend.job}
                onChange={e => changeFriend('job', e.target.value)}
                items={jobs}
              />
            ) : (
              <TextBox
                label="しょくぎょう"
                InputProps={{ readOnly: !isAddMode }}
                value={friend.job}
                themeColor={color}
              />
            )}
          </Cell>
        </Row>
        <Row>
          <Cell xs={6} className={cell}>
            <RadioGroup
              label="せいべつ"
              readOnly={!isAddMode}
              value={friend.sex}
              themeColor={color}
              onChange={({}, v) => changeFriend('sex', v)}
              items={[
                { value: 'male', label: 'おとこ' },
                { value: 'female', label: 'おんな' },
              ]}
            />
          </Cell>
          {!isAddMode && (
            <Cell xs={6} className={cell}>
              <TextBox
                value={friend.personality}
                InputProps={{ readOnly: !isAddMode }}
                themeColor={color}
                label="せいかく"
              />
            </Cell>
          )}
        </Row>
        {!isAddMode && (
          <Row>
            <Table>
              <TableRow>
                <TableCell isHeader={true}>ちから</TableCell>
                <TableCell isHeader={true}>すばやさ</TableCell>
                <TableCell isHeader={true}>たいりょく</TableCell>
                <TableCell isHeader={true}>かしこさ</TableCell>
                <TableCell isHeader={true}>うんのよさ</TableCell>
                <TableCell isHeader={true}>さいだいHP</TableCell>
                <TableCell isHeader={true}>さいだいMP</TableCell>
              </TableRow>
              <TableRow>
                <TableCell themeColor={color}>{friend.attack}</TableCell>
                <TableCell themeColor={color}>{friend.agility}</TableCell>
                <TableCell themeColor={color}>{friend.physical}</TableCell>
                <TableCell themeColor={color}>{friend.intelligence}</TableCell>
                <TableCell themeColor={color}>{friend.luck}</TableCell>
                <TableCell themeColor={color}>{friend.maxHp}</TableCell>
                <TableCell themeColor={color}>{friend.maxMp}</TableCell>
              </TableRow>
            </Table>
          </Row>
        )}
        <Row>
          <Cell xs={10} />
          <Cell xs={2} className={cell}>
            <OutlinedButton
              themeColor={color}
              disabled={!isValid}
              onClick={() =>
                isAddMode ? add(friend, friends) : remove(friend.id)
              }
            >
              {buttonLabel}
            </OutlinedButton>
          </Cell>
        </Row>
      </BarForm>
    </Container>
  );
});

export const BarFormContent = withConnectedRouter(
  mapStateToProps,
  mapDispatchToProps,
)(decoratedComponent);
