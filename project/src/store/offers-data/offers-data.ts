import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { fetchOffersAction } from 'store/api-actions';
import { OffersDataType } from 'types/state';

const initialState: OffersDataType = {
  offers: [],
  isOffersLoaded: false,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoaded = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.offers = [];
        state.isOffersLoaded = false;
      });
  }});
