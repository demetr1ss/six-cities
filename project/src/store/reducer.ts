import { createReducer } from '@reduxjs/toolkit';
import { Cities, SortingOptions } from 'const/const';
import { offers } from 'mock/offers';
import { reviews } from 'mock/reviews';
import { Offer } from 'types/offer';
import { Review } from 'types/review';
import { changeCity, setActiveCardOnMap, sorting } from './action';

type InitialStateType = {
  city: string;
  offers: Offer[];
  reviews: Review[];
  activeCardId: number;
  sortType: string;
}

const initialState: InitialStateType = {
  city: Cities.Paris,
  offers: offers,
  reviews: reviews,
  activeCardId: 0,
  sortType: SortingOptions.Default
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
    });
});
