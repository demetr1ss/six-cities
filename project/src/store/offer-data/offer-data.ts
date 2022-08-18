import { createSlice } from '@reduxjs/toolkit';
import { LoadingStatus, NameSpace } from 'const/const';
import { changeFavoriteStatusAction, fetchOfferAction } from 'store/api-actions';
import { OfferType } from 'types/offer-type';

export type OfferDataType = {
  offer: OfferType;
  offerLoadingStatus: LoadingStatus;
};

const initialState: OfferDataType = {
  offerLoadingStatus: LoadingStatus.Idle,
  offer: {} as OfferType
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.offerLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (state.offer.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      });
  }});
