import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { Cities } from 'const/const';
import { offers } from 'mock/offers';
import { reviews } from 'mock/reviews';
import { Offer } from 'types/offer';
import { Review } from 'types/review';

type InitialStateType = {
  city: string;
  offers: Offer[];
  reviews: Review[];
}

const initialState: InitialStateType = {
  city: Cities.Paris,
  offers: offers,
  reviews: reviews
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});
