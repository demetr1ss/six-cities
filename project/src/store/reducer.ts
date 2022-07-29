import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { Cities } from 'const/const';
import { offers } from 'mock/offers';
import { Offer } from 'types/offer';

type InitialStateType = {
  city: string;
  offers: Offer[];
}

const initialState: InitialStateType = {
  city: Cities.Paris,
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});
