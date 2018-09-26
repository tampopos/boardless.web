export default interface Friend {
  id: number;
  name: string;
  job: string;
  sex: string;
  attack: number;
  agility: number;
  physical: number;
  intelligence: number;
  luck: number;
  maxHp: number;
  maxMp: number;
  personality: string;
}
export const createEmptyFriend = () =>
  ({
    id: -1,
    name: '',
    sex: '',
    job: '',
    attack: 0,
    agility: 0,
    physical: 0,
    intelligence: 0,
    luck: 0,
    maxHp: 0,
    maxMp: 0,
    personality: '',
  } as Friend);
