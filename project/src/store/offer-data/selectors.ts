import { NameSpace } from 'const/const';
import { StateType } from 'types/state';
import { OfferType } from 'types/offer';

export const getOffer = (state: StateType): OfferType | undefined =>
  state[NameSpace.Offer].offer;

export const getOfferLoadedStatus = (state: StateType): boolean =>
  state[NameSpace.Offer].isOfferLoaded;
