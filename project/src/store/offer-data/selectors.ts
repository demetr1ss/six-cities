import { LoadingStatus, NameSpace } from 'const/const';
import { OfferType } from 'types/offer-type';
import { StateType } from 'types/state-type';

export const getOffer = (state: StateType): OfferType =>
  state[NameSpace.Offer].offer;

export const getOfferLoadingStatus = (state: StateType): LoadingStatus =>
  state[NameSpace.Offer].offerLoadingStatus;
