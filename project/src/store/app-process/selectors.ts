import { NameSpace } from 'const/const';
import { StateType } from 'types/state-type';

export const getCity = (state: StateType): string =>
  state[NameSpace.App].city;

export const getSortType = (state: StateType): string =>
  state[NameSpace.App].sortType;
