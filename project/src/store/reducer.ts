import { createReducer } from '@reduxjs/toolkit';
import { Cities, SortingOptions, AuthorizationStatus } from 'const/const';
import { reviews } from 'mock/reviews';
import { Offer } from 'types/offer';
import { Review } from 'types/review';
import { changeCity, setActiveCardOnMap, sorting, loadOffers, requireAuthorization, setDataLoadedStatus } from './action';

type InitialStateType = {
  city: string;
  offers: Offer[];
  reviews: Review[];
  activeCardId: number;
  sortType: string;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isDataLoaded: boolean;
}

const initialState: InitialStateType = {
  city: Cities.Paris,
  offers: [],
  reviews: reviews,
  activeCardId: 0,
  sortType: SortingOptions.Default,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isDataLoaded: false,
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
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
