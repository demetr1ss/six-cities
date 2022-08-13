import { NameSpace } from 'const/const';
import { OfferType } from 'types/offer-type';
import { StateType } from 'types/state-type';

export const getOffersNearby = (state: StateType): OfferType[] =>
  state[NameSpace.OffersNearby].offersNearby;

