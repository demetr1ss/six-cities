import { NameSpace } from 'const/const';
import { OfferType } from 'types/offer-type';
import { StateType } from 'types/state-type';

type GroupedCitiesType = {
  [key: string]: OfferType[]
};

export const getFavoriteOffers = (state: StateType): OfferType[] =>
  state[NameSpace.FavoriteOffers].favoriteOffers;

export const getGropedCities = (state: StateType) => (
  getFavoriteOffers(state).reduce<GroupedCitiesType>((prev, curr) => {
    if (!prev[curr.city.name]) {
      prev[curr.city.name] = [];
    }

    prev[curr.city.name].push(curr);

    return prev;
  }, {})
);
