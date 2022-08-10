import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { fetchOffersNearby } from 'store/api-actions';
import { OffersNearbyDataType } from 'types/state';

const initialState: OffersNearbyDataType = {
  offersNearby: [],
};

export const offersNearbyData = createSlice({
  name: NameSpace.OffersNearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNearby.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.offersNearby = [];
      });
  }});
