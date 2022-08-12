import { NameSpace, LoadingStatus } from 'const/const';
import { OfferType } from 'types/offer';
import { StateType } from 'types/state';

export const getOffer = (state: StateType): OfferType | undefined =>
  state[NameSpace.Offer].offer;

export const getOfferLoadingStatus = (state: StateType): LoadingStatus =>
  state[NameSpace.Offer].offerLoadingStatus;
