import { LoadingStatus, NameSpace } from 'const/const';
import { createSelector } from 'reselect';
import { getCity, getSortType } from 'store/app-process/selectors';
import { OfferType } from 'types/offer-type';
import { StateType } from 'types/state-type';
import { sortOffers } from 'utils/utils';

export const getOffers = (state: StateType): OfferType[] =>
  state[NameSpace.Offers].offers;

export const getOffersDataLoadedStatus = (state: StateType): LoadingStatus =>
  state[NameSpace.Offers].offersLoadingStatus;

export const selectFilteredOffers = createSelector(
  getOffers,
  getCity,
  (offers, city) => offers.filter((offer) => offer.city.name === city));

export const selectSortedOffers = createSelector(
  selectFilteredOffers,
  getSortType,
  (offers, sortType) => sortOffers(offers, sortType)
);
