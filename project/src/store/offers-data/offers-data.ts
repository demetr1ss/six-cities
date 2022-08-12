import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, LoadingStatus } from 'const/const';
import { fetchOffersAction } from 'store/api-actions';
import { OffersDataType } from 'types/state';

const initialState: OffersDataType = {
  offers: [],
  offersLoadingStatus: LoadingStatus.Idle,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.offersLoadingStatus = LoadingStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = LoadingStatus.Fulfilled;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        state.offersLoadingStatus = LoadingStatus.Rejected;
      });
  }});
