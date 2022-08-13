import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { changeFavoriteStatusAction, fetchFavoriteOffersAction } from 'store/api-actions';
import { FavoriteOffersDataType } from 'types/state-type';

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
        state.offer = action.payload;
      });
  }});
