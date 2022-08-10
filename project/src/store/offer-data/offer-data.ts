import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { fetchPropertyAction } from 'store/api-actions';
import { OfferDataType } from 'types/state';

const initialState: OfferDataType = {
  isOfferLoaded: false,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPropertyAction.pending, (state) => {
        state.isOfferLoaded = true;
      })
      .addCase(fetchPropertyAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoaded = false;
      })
      .addCase(fetchPropertyAction.rejected, (state) => {
        state.isOfferLoaded = false;
      });
  }});
