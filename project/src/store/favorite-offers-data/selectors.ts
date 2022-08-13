import { NameSpace } from 'const/const';
import { OfferType } from 'types/offer-type';
import { StateType } from 'types/state-type';

export const getFavoriteOffers = (state: StateType): OfferType[] =>
  state[NameSpace.FavoriteOffers].favoriteOffers;

export const getUpdatedOffer = (state: StateType): OfferType | undefined =>
  state[NameSpace.FavoriteOffers].offer;
