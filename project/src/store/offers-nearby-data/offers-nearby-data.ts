import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { changeFavoriteStatusAction, fetchOffersNearbyAction } from 'store/api-actions';
import { OfferType } from 'types/offer-type';

export type OffersNearbyDataType = {
  offersNearby: OfferType[];
};

const initialState: OffersNearbyDataType = {
  offersNearby: [],
};

export const offersNearbyData = createSlice({
  name: NameSpace.OffersNearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state) => {
        state.offersNearby = [];
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.offersNearby.map((offer) => {
          if (offer.id === action.payload.id) {
            offer.isFavorite = action.payload.isFavorite;
          }

          return state.offersNearby;
        });
      });
  }});
