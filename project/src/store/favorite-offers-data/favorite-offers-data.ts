/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { changeFavoriteStatusAction, fetchFavoriteOffersAction } from 'store/api-actions';
import { OfferType } from 'types/offer-type';

type FavoriteOffersDataType = {
  favoriteOffers: OfferType[];
}

const initialState: FavoriteOffersDataType = {
  favoriteOffers: [],
};

export const favoriteOffersData = createSlice({
  name: NameSpace.FavoriteOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        action.payload.isFavorite
          ? state.favoriteOffers.push(action.payload)
          : state.favoriteOffers = state.favoriteOffers.filter((offer) =>
            offer.id !== action.payload.id
          );
      });
  }});
