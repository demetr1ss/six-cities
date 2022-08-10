import { NameSpace } from 'const/const';
import { StateType } from 'types/state';
import { OfferType } from 'types/offer';

export const getOffersNearby = (state: StateType): OfferType[] =>
  state[NameSpace.OffersNearby].offersNearby;

