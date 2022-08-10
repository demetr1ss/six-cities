import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'const/const';
import { fetchReviewsAction, sendReviewAction } from 'store/api-actions';
import { ReviewsDataType } from 'types/state';

const initialState: ReviewsDataType = {
  reviews: [],
  isReviewSending: false,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewSending = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isReviewSending = false;
      });
  }});
