import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, LoadingStatus } from 'const/const';
import { changeFavoriteStatusAction, fetchPropertyAction } from 'store/api-actions';
import { OfferDataType } from 'types/state-type';

const initialState: OfferDataType = {
  offerLoadingStatus: LoadingStatus.Idle,
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
        state.offer = action.payload;
      });
  }});
