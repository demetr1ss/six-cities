import { NameSpace } from 'const/const';
import { StateType } from 'types/state';
import { OfferType } from 'types/offer';

export const getOffers = (state: StateType): OfferType[] =>
  state[NameSpace.Offers].offers;

export const getOffersDataLoadedStatus = (state: StateType): boolean =>
  state[NameSpace.Offers].isOffersLoaded;
