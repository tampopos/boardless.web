import Friend from '../models/friend';
import { AsyncHelper } from '../common/async-helper';

const malePersonalities = [
  'ごうけつ',
  'ちからじまん',
  'らんぼうもの',
  'おおぐらい',
  'ねっけつかん',
  'タフガイ',
  'てつじん',
  'がんこもの',
  'くろうにん',
  'がんばりや',
  'まけずぎらい',
  'いのちしらず',
  'むっつりスケベ',
  'でんこうせっか',
  'すばしっこい',
  'おっちょこちょい',
  'ぬけめがない',
  'うっかりもの',
  'いっぴきおおかみ',
  'わがまま',
  'みえっぱり',
  'きれもの',
  'ずのうめいせき',
  'あたまでっかち',
  'ロマンチスト',
  'おせっかい',
  'さびしがりや',
  'いくじなし',
  'あまえんぼう',
  'おちょうしもの',
  'なきむし',
  'なまけもの',
  'ひねくれもの',
  'ひっこみじあん',
  'しょうじきもの',
  'せけんしらず',
  'のんきもの',
  'やさしいひと',
  'しあわせもの',
  'ラッキーマン',
  'ふつう',
];
const femalePersonalities = [
  'ごうけつ',
  'ちからじまん',
  'らんぼうもの',
  'おおぐらい',
  'おとこまさり',
  'おてんば',
  'ねっけつかん',
  'タフガイ',
  'てつじん',
  'がんこもの',
  'くろうにん',
  'がんばりや',
  'まけずぎらい',
  'いのちしらず',
  'でんこうせっか',
  'すばしっこい',
  'おっちょこちょい',
  'ぬけめがない',
  'うっかりもの',
  'いっぴきおおかみ',
  'わがまま',
  'みえっぱり',
  'きれもの',
  'ずのうめいせき',
  'あたまでっかち',
  'ロマンチスト',
  'おせっかい',
  'さびしがりや',
  'いくじなし',
  'あまえんぼう',
  'おちょうしもの',
  'なきむし',
  'なまけもの',
  'ひねくれもの',
  'ひっこみじあん',
  'しょうじきもの',
  'せけんしらず',
  'のんきもの',
  'やさしいひと',
  'しあわせもの',
  'おじょうさま',
  'セクシーギャル',
  'ふつう',
];
const getRandomParameter = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
const getRandomPersonality = (sex: string) => {
  const personalities =
    sex === 'male' ? malePersonalities : femalePersonalities;
  const max = personalities.length - 1;
  const i = getRandomParameter(0, max);
  return personalities[i];
};
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
export const createNewFriend = async (
  id: number,
  p: {
    name: string;
    job: string;
    sex: string;
  },
) => {
  await AsyncHelper.delay(100);
  return Object.assign({}, p, {
    id,
    attack: getRandomParameter(1, 20),
    agility: getRandomParameter(1, 20),
    physical: getRandomParameter(1, 20),
    intelligence: getRandomParameter(2, 20),
    luck: getRandomParameter(2, 20),
    maxHp: getRandomParameter(10, 30),
    maxMp: getRandomParameter(0, 30),
    personality: getRandomPersonality(p.sex),
  }) as Friend;
};
export const getSexName = (sex: string) =>
  sex === 'male' ? 'おとこ' : 'おんな';
