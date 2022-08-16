import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, LoadingStatus } from 'const/const';
import { changeFavoriteStatusAction, fetchPropertyAction } from 'store/api-actions';
import { OfferType } from 'types/offer-type';

type OfferDataType = {
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
      .addCase(fetchPropertyAction.pending, (state) => {
        state.offerLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchPropertyAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.offerLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchPropertyAction.rejected, (state) => {
        state.offerLoadingStatus = LoadingStatus.Rejected;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (state.offer.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      });
  }});
