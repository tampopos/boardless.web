import * as React from 'react';
import { DispatchMapper, StateMapper } from '../../stores/types';
import { connect } from 'react-redux';
import { decorate } from '../../common/styles/styles-helper';
import { StylesBase } from '../../common/styles/types';
import Friend from '../../models/friend';
import {
  createNewFriend,
  createEmptyFriend,
} from '../../services/friend-service';
import { Form } from '../../components/forms-controls/form';
import { Row } from '../../components/forms-controls/row';
import { Cell } from '../../components/forms-controls/cell';
import { Button } from '../../components/forms-controls/button';
import { Table } from '../../components/tables/table';
import { TableRow } from '../../components/tables/table-row';
import { TableCell } from '../../components/tables/table-cell';
import { Label } from '../../components/forms-controls/label';
import { TextBox } from '../../components/forms-controls/text-box';
import { OptionProps } from '../../components/types';
import { Select } from '../../components/forms-controls/select';
import { RadioBox } from '../../components/forms-controls/radio-box';
import { barListActionCreators } from '../../stores/bar/bar-list-reducer';
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
  add: (friend: Friend, friends: Friend[]) => Promise<any>;
  remove: (id: number) => any;
  changeFriend: <TKey extends keyof Friend>(
    name: TKey,
    value: Friend[TKey],
  ) => void;
}
interface Props {
  friend: Friend;
  friends: Friend[];
  isAddMode: boolean;
  isValid: boolean;
  title: string;
  buttonLabel: string;
  themeType: 'mono' | 'blue' | 'red';
}
const mapDispatchToProps: DispatchMapper<Events> = dispatch => {
  return {
    add: async (friend, friends) => {
      const newFriend = await createNewFriend(friends.length, friend);
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
const mapStateToProps: StateMapper<Props> = ({
  barFormState,
  barListState,
}) => {
  const friend = barFormState.friend;
  const friends = barListState.friends;
  const isAddMode = friend.id < 0;
  const isValid = Boolean(friend.name && friend.sex && friend.job);
  const title = isAddMode ? 'あたらしいなかま' : 'ステータス';
  const buttonLabel = isAddMode ? 'なかまにする' : 'くびにする';
  const themeType =
    friend.sex === 'male' ? 'blue' : friend.sex === 'female' ? 'red' : 'mono';
  return {
    friend,
    friends,
    isAddMode,
    title,
    isValid,
    buttonLabel,
    themeType,
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
].map(x => ({ key: x, value: x, children: x } as OptionProps));

const decoratedComponent = decorate(styles)<Props & Events>(props => {
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
    themeType,
    classes,
  } = props;
  const { header } = classes;
  return (
    <Form themeType={themeType}>
      <Row>
        <h3 className={header}>{title}</h3>
      </Row>
      <Row>
        <Cell size={2}>
          <Label htmlFor="name">なまえ</Label>
        </Cell>
        <Cell>
          <TextBox
            themeType={themeType}
            maxLength={4}
            readOnly={!isAddMode}
            value={friend.name}
            onChange={e => changeFriend('name', e.target.value)}
          />
        </Cell>
        <Cell size={2}>
          <Label htmlFor="job">しょくぎょう</Label>
        </Cell>
        <Cell>
          {isAddMode ? (
            <Select
              themeType={themeType}
              value={friend.job}
              onChange={e => changeFriend('job', e.target.value)}
              selectItems={jobs}
            />
          ) : (
            <TextBox
              readOnly={!isAddMode}
              value={friend.job}
              themeType={themeType}
            />
          )}
        </Cell>
      </Row>
      <Row>
        <Cell size={2}>
          <Label htmlFor="sex">せいべつ</Label>
        </Cell>
        <Cell size={2}>
          <RadioBox
            id="male"
            checked={friend.sex === 'male'}
            disabled={!isAddMode}
            onChange={e => e.target.checked && changeFriend('sex', 'male')}
          />
          <Label htmlFor="male">おとこ</Label>
        </Cell>
        <Cell size={2}>
          <RadioBox
            id="female"
            value="female"
            checked={friend.sex === 'female'}
            disabled={!isAddMode}
            onChange={e => e.target.checked && changeFriend('sex', 'female')}
          />
          <Label htmlFor="female">おんな</Label>
        </Cell>
        {!isAddMode && [
          <Cell key={0} size={2}>
            <Label htmlFor="personality">せいかく</Label>
          </Cell>,
          <Cell key={1}>
            <TextBox
              value={friend.personality}
              readOnly={true}
              themeType={themeType}
            />
          </Cell>,
        ]}
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
              <TableCell themeType={themeType}>{friend.attack}</TableCell>
              <TableCell themeType={themeType}>{friend.agility}</TableCell>
              <TableCell themeType={themeType}>{friend.physical}</TableCell>
              <TableCell themeType={themeType}>{friend.intelligence}</TableCell>
              <TableCell themeType={themeType}>{friend.luck}</TableCell>
              <TableCell themeType={themeType}>{friend.maxHp}</TableCell>
              <TableCell themeType={themeType}>{friend.maxMp}</TableCell>
            </TableRow>
          </Table>
        </Row>
      )}
      <Row>
        <Cell size={10} />
        <Cell size={2}>
          <Button
            themeType={themeType}
            disabled={!isValid}
            onClick={() =>
              isAddMode ? add(friend, friends) : remove(friend.id)
            }
          >
            {buttonLabel}
          </Button>
        </Cell>
      </Row>
    </Form>
  );
});

export const BarForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(decoratedComponent);
