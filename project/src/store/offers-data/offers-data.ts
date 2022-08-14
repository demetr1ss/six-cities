import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, LoadingStatus } from 'const/const';
import { changeFavoriteStatusAction, fetchOffersAction } from 'store/api-actions';
import { OfferType } from 'types/offer-type';

type OffersDataType = {
  offers: OfferType[];
  offersLoadingStatus: LoadingStatus;
};

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
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            offer.isFavorite = action.payload.isFavorite;
          }

          return state.offers;
        });
      });
  }});
