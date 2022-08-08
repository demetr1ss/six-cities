import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, Cities, SortingOptions } from 'const/const';
import { Offer } from 'types/offer';
import { Review } from 'types/review';
import {
  changeCity, loadOffers, loadOffersNearby, loadProperty,
  loadReviews, requireAuthorization, setActiveCardOnMap, setOfferLoadedStatus, setOffersLoadedStatus, sorting
} from './action';

type InitialStateType = {
  city: string;
  offer?: Offer;
  offers: Offer[];
  nearOffers: Offer[];
  reviews: Review[];
  activeCardId: number;
  sortType: string;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersLoaded: boolean;
  isOfferLoaded: boolean;
}

const initialState: InitialStateType = {
  city: Cities.Paris,
  offers: [],
  nearOffers: [],
  reviews: [],
  activeCardId: 0,
  sortType: SortingOptions.Default,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersLoaded: false,
  isOfferLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sortType = SortingOptions.Default;
    })
    .addCase(setActiveCardOnMap, (state, action) => {
      state.activeCardId = action.payload;
    })
    .addCase(sorting, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadProperty, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setOffersLoadedStatus, (state, action) => {
      state.isOffersLoaded = action.payload;
    })
    .addCase(setOfferLoadedStatus, (state, action) => {
      state.isOfferLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
